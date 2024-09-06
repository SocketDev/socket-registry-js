declare const {
  x: TypedArrayProtoSlice
}: {
  x: ((
    thisArg: TypedArray,
    ...args: Parameters<TypedArray['slice']>
  ) => ReturnType<TypedArray['slice']>) & {
    getPolyfill(): TypedArray['slice']
    shim(): () => TypedArray['slice']
  }
}
export = TypedArrayProtoSlice
