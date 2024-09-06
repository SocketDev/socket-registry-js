declare const {
  x: StringProtoTrimRight
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['trimRight']>
  ) => ReturnType<String['trimRight']>) & {
    getPolyfill(): String['trimRight']
    shim(): () => String['trimRight']
  }
}
export = StringProtoTrimRight
