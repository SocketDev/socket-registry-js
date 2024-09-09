declare interface QueryStringify {
  parse(query: string): { [key: string]: string }
  stringify(obj: object, prefix?: boolean | string): string
}
export = QueryStringify
