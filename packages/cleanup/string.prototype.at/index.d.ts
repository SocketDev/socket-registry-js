declare const {
  x: StringProtoAt
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['at']>
  ) => ReturnType<String['at']>) & {
    getPolyfill(): String['at']
    shim(): () => String['at']
  }
}
export = StringProtoAt
