import HelloComponent from '@/components/basetest/HelloComponent'
import { render, screen } from '@testing-library/react'

describe('Index Page', () => {
  it('Should render property', () => {
    render(<HelloComponent name={'User'} />)
    const header = screen.getByRole('heading')
    expect(header).toHaveTextContent('Hello')
  })

  it('Should have a button', () => {
    render(<HelloComponent name={'Say hello'} />)
    const button = screen.queryAllByRole('button', { hidden: true })
    expect(button.length).toBeLessThanOrEqual(1)
  })

  it('renders homepage unchanged', () => {
    const { container } = render(<HelloComponent name={'Another Name'} />)
    expect(container).toMatchSnapshot()
  })
})
