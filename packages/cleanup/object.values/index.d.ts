declare const {
  x: ObjectValues
}: {
  x: typeof Object.values & {
    getPolyfill(): typeof Object.values
    shim(): () => typeof Object.values
  }
}
export = ObjectValues
