declare const {
  x: ArrayFrom
}: {
  x: typeof Array.from & {
    getPolyfill(): typeof Array.from
    shim(): () => typeof Array.from
  }
}
export = ArrayFrom
