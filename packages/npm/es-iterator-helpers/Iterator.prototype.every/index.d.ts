import Impl from './implementation'
declare const {
  x: EsIteratorProtoEvery
}: {
  x: typeof Impl & {
    getPolyfill(): typeof Impl
    shim(): typeof Impl
  }
}
export = EsIteratorProtoEvery