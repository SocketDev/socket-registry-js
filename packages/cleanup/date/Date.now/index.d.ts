declare const {
  x: DateNow
}: {
  x: typeof Date.now & {
    getPolyfill(): typeof Date.now
    shim(): () => typeof Date.now
  }
}
export = DateNow
