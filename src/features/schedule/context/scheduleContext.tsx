import React from 'react'

interface ThemeContextType {
  showMngColumn: boolean
  setShowMngColumn: (show: boolean) => void
}

export const ManageColumnContext = React.createContext<ThemeContextType>({
  showMngColumn: false,
  setShowMngColumn: () => { }
})
