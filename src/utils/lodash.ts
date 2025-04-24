export function getValue<DataType, PathType extends string, DefaultType> (data: DataType, path: PathType, defaultValue?: DefaultType) {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    .reduce<any>((value, key) => (value)?.[key], data)

  return value !== undefined ? value : (defaultValue as DefaultType)
}
