import { WebSocket } from 'ws'
import { Command, IntoMessage, Message, SetProperties } from './common'



class ElementBuilder<E extends Element = Element> implements IntoMessage {
    private selector?: string
    private setMessage?: SetProperties<HTMLElement>

    constructor(private readonly remote: Remote) {}

    public querySelector(selectors: string): ElementBuilder<E> {
        this.selector = selectors
        return this
    }

    set innerText(text: string) {
        this.ensureSetMessage() 
        this.setMessage!.innerText = text
        this.remote.send(this)
    }

    intoMessage(): Message {
        if (this.setMessage !== null) {
            return this.setMessage!
        } else {
            throw new Error('No message created')
        }
    }

    private ensureSetMessage() {
        if (this.setMessage === undefined) {
            this.setMessage = {
                command: Command.SetProperties,
                selector: this.selector ?? ''
            } as SetProperties<E>
        }
    }
}

export class Remote {
    public document: ElementBuilder = new ElementBuilder(this)

    constructor(private readonly socket: WebSocket) { }

    public sendMessage<M extends Message>(message: M) {
        const json = JSON.stringify(message)
        this.socket.send(json)
    }

    public send<M extends IntoMessage>(message: M) {
        const json = JSON.stringify(message.intoMessage())
        this.socket.send(json)
    }
}