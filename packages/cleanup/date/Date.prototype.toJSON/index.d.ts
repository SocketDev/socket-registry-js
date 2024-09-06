declare const {
  x: DateProtoToJSON
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['toJSON']>
  ) => ReturnType<Date['toJSON']>) & {
    getPolyfill(): Date['toJSON']
    shim(): () => Date['toJSON']
  }
}
export = DateProtoToJSON
