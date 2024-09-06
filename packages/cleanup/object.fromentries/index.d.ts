declare const {
  x: ObjectFromEntries
}: {
  x: typeof Object.fromEntries & {
    getPolyfill(): typeof Object.fromEntries
    shim(): () => typeof Object.fromEntries
  }
}
export = ObjectFromEntries
