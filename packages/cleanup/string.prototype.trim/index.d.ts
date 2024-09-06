declare const {
  x: StringProtoTrim
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['trim']>
  ) => ReturnType<String['trim']>) & {
    getPolyfill(): String['trim']
    shim(): () => String['trim']
  }
}
export = StringProtoTrim
