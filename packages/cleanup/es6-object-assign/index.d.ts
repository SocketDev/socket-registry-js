declare interface ObjectAssignPolyFill {
  assign: typeof Object.assign
  polyfill: () => void
}
export = ObjectAssignPolyFill
