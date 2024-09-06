type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
declare function typedArrayByteOffset(ta: TypedArray): number
declare function typedArrayByteOffset(ta: unknown): false
export = typedArrayByteOffset
