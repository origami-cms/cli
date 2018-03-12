export namespace Init {
    export interface Answers {
        theme?: {
            type: string
        },
        store?: {
            type: string
        },
        server?: {
            secret: string
            port: string|number
        },

    }
}
