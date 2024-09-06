declare const {
  x: ObjectGetPrototypeOf
}: {
  x: typeof Object.getPrototypeOf & {
    getPolyfill(): typeof Object.getPrototypeOf
    shim(): () => typeof Object.getPrototypeOf
  }
}
export = ObjectGetPrototypeOf
