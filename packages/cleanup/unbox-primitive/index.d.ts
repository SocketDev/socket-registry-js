declare function unboxPrimitive(value: BigInt): bigint
declare function unboxPrimitive(value: Boolean): boolean
declare function unboxPrimitive(value: Number): number
declare function unboxPrimitive(value: String): string
declare function unboxPrimitive(value: Symbol): symbol
declare function unboxPrimitive(
  value:
    | bigint
    | boolean
    | Function
    | null
    | number
    | string
    | symbol
    | undefined
    | unknown
): never
export = unboxPrimitive
