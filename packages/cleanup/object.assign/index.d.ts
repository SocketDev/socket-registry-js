declare const {
  x: ObjectAssign
}: {
  x: typeof Object.assign & {
    getPolyfill(): typeof Object.assign
    shim(): () => typeof Object.assign
  }
}
export = ObjectAssign
