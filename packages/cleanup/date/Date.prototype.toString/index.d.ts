declare const {
  x: DateProtoToString
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['toString']>
  ) => ReturnType<Date['toString']>) & {
    getPolyfill(): Date['toString']
    shim(): () => Date['toString']
  }
}
export = DateProtoToString
