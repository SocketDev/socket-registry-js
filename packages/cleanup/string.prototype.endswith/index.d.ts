declare const {
  x: StringProtoEndsWith
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['endsWith']>
  ) => ReturnType<String['endsWith']>) & {
    getPolyfill(): String['endsWith']
    shim(): () => String['endsWith']
  }
}
export = StringProtoEndsWith
