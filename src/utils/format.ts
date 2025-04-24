export function formatDate (input: any) {
  const date = new Date(input)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

export const getYears = (start = 1900, end = 2100) => {
  const years = []
  for (let i = start; i < end; i++) {
    years.push(i)
  }
  return years
}

export const pluck = (array: any[], field: string) => {
  if (!array) {
    return []
  }
  return array.map((item) => item[field])
}
