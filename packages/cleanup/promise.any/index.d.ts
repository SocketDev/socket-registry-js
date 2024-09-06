declare const {
  x: PromiseAny
}: {
  x: typeof Promise.any & {
    getPolyfill(): typeof Promise.any
    shim(): () => typeof Promise.any
  }
}
export = PromiseAny
