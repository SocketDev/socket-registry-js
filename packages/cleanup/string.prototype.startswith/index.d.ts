declare const {
  x: StringProtoStartsWith
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['startsWith']>
  ) => ReturnType<String['startsWith']>) & {
    getPolyfill(): String['startsWith']
    shim(): () => String['startsWith']
  }
}
export = StringProtoStartsWith
