declare const {
  x: ReflectOwnKeys
}: {
  x: typeof Reflect.ownKeys & {
    getPolyfill(): typeof Reflect.ownKeys
    shim(): () => typeof Reflect.ownKeys
  }
}
export = ReflectOwnKeys
