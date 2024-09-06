declare const {
  x: GlobalThis
}: {
  x: (() => typeof globalThis) & {
    getPolyfill(): typeof globalThis
    shim(): () => typeof globalThis
  }
}
export = GlobalThis
