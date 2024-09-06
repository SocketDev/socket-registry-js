declare const {
  x: ArrayBufferProtoSlice
}: {
  x: ((
    thisArg: ArrayBuffer,
    ...args: Parameters<ArrayBuffer['slice']>
  ) => ReturnType<ArrayBuffer['slice']>) & {
    getPolyfill(): ArrayBuffer['slice']
    shim(): () => ArrayBuffer['slice']
  }
}
export = ArrayBufferProtoSlice
