declare const {
  x: DateParse
}: {
  x: typeof Date.parse & {
    getPolyfill(): typeof Date.parse
    shim(): () => typeof Date.parse
  }
}
export = DateParse
