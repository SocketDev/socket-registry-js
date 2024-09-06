declare const {
  x: AggregateErrorCtor
}: {
  x: typeof AggregateError & {
    getPolyfill(): typeof AggregateError
    shim(): () => typeof AggregateError
  }
}
export = AggregateErrorCtor
