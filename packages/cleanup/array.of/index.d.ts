import Impl from './implementation'
declare const {
  x: ArrayOf
}: {
  x: typeof Impl & {
    getPolyfill(): typeof Impl
    shim(): typeof Impl
  }
}
export = ArrayOf
