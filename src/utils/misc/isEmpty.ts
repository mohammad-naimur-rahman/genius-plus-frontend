export const isObjEmpty = (obj: object) => {
  return Object.keys(obj).length === 0
}

export const isArrEmpty = (arr: unknown[]) => {
  return arr.length === 0
}
