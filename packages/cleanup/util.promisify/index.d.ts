/// <reference types="node" />
import { promisify } from 'node:util'
declare const {
  x: UtilPromisify
}: {
  x: typeof promisify & {
    custom: symbol
    customPromisifyArgs: symbol
    getPolyfill(): typeof promisify
    shim(): () => typeof promisify
  }
}
export = UtilPromisify
