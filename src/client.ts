import { Command, SetProperties, Message } from './common'

interface Options {
    url: string | URL
}

export class Remote {
    private socket: WebSocket

    constructor(options: Options = { url: 'ws://localhost' }) {
        this.socket = new WebSocket(options.url)
        const _this = this

        this.socket.onmessage = function (message: MessageEvent<string>) {
            _this.handleMessage({ ...message, data: JSON.parse(message.data) })
        }
    }

    handleMessage(messageEvent: MessageEvent<Message>) {
        const blacklist = ['id', 'command', 'selector'] as const
        function setProps(obj: any, key: any, value: any) {
            if (typeof obj[key] === 'object') {
                for (const prop in value) {
                    if ((blacklist as unknown as string[]).includes(prop)) continue

                    setProps(obj[key], prop as any, value[prop])
                }
            } else {
                obj[key] = value
            }
        }

        switch (messageEvent.data.command) {
            case Command.SetProperties:

                let values = messageEvent.data as SetProperties<Element>
                let elements = document.querySelectorAll(values.selector)

                elements.forEach(e => {
                    setProps([e], 0, values)
                })

                break
            default:
                console.error(`Unsupported command: '${messageEvent.data.command}'`)
                break
        }
    }
}