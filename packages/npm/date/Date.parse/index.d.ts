import Impl from './implementation'
declare const {
  x: DateParse
}: {
  x: typeof Impl & {
    getPolyfill(): typeof Impl
    shim(): typeof Impl
  }
}
export = DateParse