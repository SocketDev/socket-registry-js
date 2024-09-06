declare const {
  x: ObjectIs
}: {
  x: typeof Object.is & {
    getPolyfill(): typeof Object.is
    shim(): () => typeof Object.is
  }
}
export = ObjectIs
