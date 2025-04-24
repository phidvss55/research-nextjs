import { render, screen } from '@testing-library/react'
import Button from '../Button'

// Unit testing
describe('Button component', () => {
  test('renders button with correct text', () => {
    const buttonText = 'Click me'
    render(<Button>{buttonText}</Button>)

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent(buttonText)
  })

  test('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>Click me</Button>)

    const buttonElement = screen.getByRole('button')
    buttonElement.click()

    expect(onClickMock).toHaveBeenCalled()
  })
})
