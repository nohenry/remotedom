export enum Command {
    SetProperties = "set-value",
}

export interface Message {
    command: string
}

export interface IntoMessage {
    intoMessage(): Message
}

type OptionalFields<T> = {
    [K in keyof T]?: OptionalFields<T[K]>
}

type AnyFn = ((...args: any[]) => any)

type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B

type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P]
    }, {
            -readonly [Q in P]: T[P]
        }, P>
}[keyof T]

type PropsOnly<T> = {
    [K in keyof T as (T[K] extends AnyFn ? never : (AnyFn extends T[K] ? never : K))]: T[K]
}

export type SetProperties<T extends Element = HTMLElement> = Message & Pick<OptionalFields<PropsOnly<T>>, WritableKeys<PropsOnly<T>>> & {
    command: Command.SetProperties
    selector: string
    style?: OptionalFields<HTMLElement['style']>
}