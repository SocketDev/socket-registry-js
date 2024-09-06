declare const {
  x: ObjectHasOwn
}: {
  x: typeof Object.hasOwn & {
    getPolyfill(): typeof Object.hasOwn
    shim(): () => typeof Object.hasOwn
  }
}
export = ObjectHasOwn
