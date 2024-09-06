declare const {
  x: ObjectGetOwnPropertyDescriptors
}: {
  x: typeof Object.getOwnPropertyDescriptors & {
    getPolyfill(): typeof Object.getOwnPropertyDescriptors
    shim(): () => typeof Object.getOwnPropertyDescriptors
  }
}
export = ObjectGetOwnPropertyDescriptors
