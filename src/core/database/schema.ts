interface TKeyValue {
    key: string
    value: string
}

interface MochiSchema {
    KV: TKeyValue
}

export {
    type MochiSchema
}