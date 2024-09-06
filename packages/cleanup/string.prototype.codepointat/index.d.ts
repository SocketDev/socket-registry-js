declare const {
  x: StringProtoCodePointAt
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['codePointAt']>
  ) => ReturnType<String['codePointAt']>) & {
    getPolyfill(): String['codePointAt']
    shim(): () => String['codePointAt']
  }
}
export = StringProtoCodePointAt
