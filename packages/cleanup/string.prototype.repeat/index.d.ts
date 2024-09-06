declare const {
  x: StringProtoRepeat
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['repeat']>
  ) => ReturnType<String['repeat']>) & {
    getPolyfill(): String['repeat']
    shim(): () => String['repeat']
  }
}
export = StringProtoRepeat
