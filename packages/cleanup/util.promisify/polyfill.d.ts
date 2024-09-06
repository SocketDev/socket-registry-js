import { promisify as builtinPromisify } from 'node:util'

declare function promisify(): typeof Array.of
export = getPolyfill
