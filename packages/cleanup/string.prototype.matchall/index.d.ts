declare const {
  x: StringProtoMatchAll
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['matchAll']>
  ) => ReturnType<String['matchAll']>) & {
    getPolyfill(): String['matchAll']
    shim(): () => String['matchAll']
  }
}
export = StringProtoMatchAll
