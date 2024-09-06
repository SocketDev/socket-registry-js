declare const {
  x: DateCtor
}: {
  x: typeof Date & {
    getPolyfill(): typeof Date
    shim(): () => typeof Date
  }
}
export = DateCtor
