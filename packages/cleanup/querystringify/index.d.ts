declare function parse(query: string): { [key: string]: string }
declare function stringify(obj: object, prefix?: boolean | string): string
export = { parse, stringify }
