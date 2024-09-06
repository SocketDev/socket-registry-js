declare const {
  x: PromiseAllSettled
}: {
  x: typeof Promise.allSettled & {
    getPolyfill(): typeof Promise.allSettled
    shim(): () => typeof Promise.allSettled
  }
}
export = PromiseAllSettled
