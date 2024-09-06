declare const {
  x: StringProtoPadEnd
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['padEnd']>
  ) => ReturnType<String['padEnd']>) & {
    getPolyfill(): String['padEnd']
    shim(): () => String['padEnd']
  }
}
export = StringProtoPadEnd
