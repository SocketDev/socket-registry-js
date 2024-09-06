declare const {
  x: FunctionProtoName
}: {
  x: ((
    thisArg: Function,
    ...args: Parameters<Function['name']>
  ) => ReturnType<Function['name']>) & {
    getPolyfill(): Function['name']
    shim(): () => Function['name']
  }
}
export = FunctionProtoName
