declare const {
  x: StringProtoReplaceAll
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['replaceAll']>
  ) => ReturnType<String['replaceAll']>) & {
    getPolyfill(): String['replaceAll']
    shim(): () => String['replaceAll']
  }
}
export = StringProtoReplaceAll
