declare const {
  x: StringProtoTrimLeft
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['trimLeft']>
  ) => ReturnType<String['trimLeft']>) & {
    getPolyfill(): String['trimLeft']
    shim(): () => String['trimLeft']
  }
}
export = StringProtoTrimLeft
