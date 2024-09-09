import Impl from './implementation'
declare function getPolyfill(): () => Impl<any>
export = getPolyfill
