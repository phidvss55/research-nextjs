export interface OptionType {
  label: string
  value: string
}

export interface AutocompleteProps<T> {
  /**
   * Is show label or not
   * @default true
   */
  showLabel?: boolean
  /**
   * Label above the input
   */
  label: string
  /**
   * Options for selecting
   */
  options: T[]
  /**
   * Allow to select multiple
   */
  multiple?: boolean
  /**
   *
   * @param option
   * @returns
   */
  getOptionLabel?: (option: any) => string
  /**
   * Get label to show option
   * @param option
   * @returns
   */
  getSelectedOptionLabel?: (option: any) => string
  /**
   * Get label when option was selected
   * @param option
   * @returns
   */
  onSelect: (option: any) => void
}
