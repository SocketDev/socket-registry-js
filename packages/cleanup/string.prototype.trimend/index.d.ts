declare const {
  x: StringProtoTrimEnd
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['trimEnd']>
  ) => ReturnType<String['trimEnd']>) & {
    getPolyfill(): String['trimEnd']
    shim(): () => String['trimEnd']
  }
}
export = StringProtoTrimEnd
