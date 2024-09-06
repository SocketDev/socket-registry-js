declare const {
  x: ReflectGetPrototypeOf
}: {
  x: typeof Reflect.getPrototypeOf & {
    getPolyfill(): typeof Reflect.getPrototypeOf
    shim(): () => typeof Reflect.getPrototypeOf
  }
}
export = ReflectGetPrototypeOf
