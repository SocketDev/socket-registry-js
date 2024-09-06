declare const {
  x: StringProtoPadStart
}: {
  x: ((
    thisArg: string,
    ...args: Parameters<String['padStart']>
  ) => ReturnType<String['padStart']>) & {
    getPolyfill(): String['padStart']
    shim(): () => String['padStart']
  }
}
export = StringProtoPadStart
