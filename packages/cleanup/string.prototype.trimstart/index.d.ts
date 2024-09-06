declare const {
  x: StringProtoTrimStart
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['trimStart']>
  ) => ReturnType<String['trimStart']>) & {
    getPolyfill(): String['trimStart']
    shim(): () => String['trimStart']
  }
}
export = StringProtoTrimStart
