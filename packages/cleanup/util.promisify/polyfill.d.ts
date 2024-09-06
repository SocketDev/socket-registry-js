import { promisify as builtinPromisify } from 'node:util'

declare promisify(): typeof Array.of
export = getPolyfill
