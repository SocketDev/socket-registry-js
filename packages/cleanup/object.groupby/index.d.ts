declare const {
  x: ObjectGroupBy
}: {
  x: typeof Object.groupBy & {
    getPolyfill(): typeof Object.groupBy
    shim(): () => typeof Object.groupBy
  }
}
export = ObjectGroupBy
