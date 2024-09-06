declare const {
  x: StringProtoIncludes
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['includes']>
  ) => ReturnType<String['includes']>) & {
    getPolyfill(): String['includes']
    shim(): () => String['includes']
  }
}
export = StringProtoIncludes
