declare const {
  x: ObjectEntries
}: {
  x: typeof Object.entries & {
    getPolyfill(): typeof Object.entries
    shim(): () => typeof Object.entries
  }
}
export = ObjectEntries
