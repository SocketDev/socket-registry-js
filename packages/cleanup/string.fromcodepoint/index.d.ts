declare const {
  x: StringFromCodePoint
}: {
  x: typeof String.fromCodePoint & {
    getPolyfill(): typeof String.fromCodePoint
    shim(): () => typeof String.fromCodePoint
  }
}
export = StringFromCodePoint
