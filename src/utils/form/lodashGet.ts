export function lodashGet(obj: Record<string, unknown>, path: string | string[], defaultValue: unknown = undefined) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res: unknown, key: string) => {
        if (res !== null && res !== undefined && typeof res === 'object') {
          return (res as Record<string, unknown>)[key] ?? res
        }
        return res
      }, obj)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}
