declare const {
  x: RegExpProtoFlags
}: {
  x: ((
    thisArg: RegExp,
    ...args: Parameters<RegExp['flags']>
  ) => ReturnType<RegExp['flags']>) & {
    getPolyfill(): RegExp['flags']
    shim(): () => RegExp['flags']
  }
}
export = RegExpProtoFlags
