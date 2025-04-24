import React, { type ReactNode } from 'react'
import Sidebar from './Sidebar'

interface PageProps {
  children?: ReactNode | undefined
}

const MainLayout = ({ children }: PageProps) => {
  return (
		<>
			<header className="h-16 text-center border border-spacing-1 border-gray-300"></header>
			<main className="flex">
				<Sidebar />
				{children}
			</main>
		</>
  )
}

export default MainLayout
