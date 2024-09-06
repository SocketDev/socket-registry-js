declare const {
  x: StringProtoSplit
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['split']>
  ) => ReturnType<String['split']>) & {
    getPolyfill(): String['split']
    shim(): () => String['split']
  }
}
export = StringProtoSplit
