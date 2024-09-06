declare const {
  x: ArrayOf
}: {
  x: typeof Array.of & {
    getPolyfill(): typeof Array.of
    shim(): () => typeof Array.of
  }
}
export = ArrayOf
