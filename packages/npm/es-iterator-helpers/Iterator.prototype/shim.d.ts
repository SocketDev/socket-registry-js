import Impl from './implementation'
declare function shim(): () => Impl<any>
export = shim
