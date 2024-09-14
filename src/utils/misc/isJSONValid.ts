export const isJSONValid = (string: string): boolean => {
  try {
    JSON.parse(string)
    return true
  } catch {
    return false
  }
}
