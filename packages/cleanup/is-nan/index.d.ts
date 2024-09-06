declare const {
  x: NumberIsNaN
}: {
  x: typeof Number.isNaN & {
    getPolyfill(): typeof Number.isNaN
    shim(): () => typeof Number.isNaN
  }
}
export = NumberIsNaN
