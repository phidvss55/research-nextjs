import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Testing Schedule Search Component', () => {
  it('should be select option', async () => {
    render(
      <select multiple>
        <option value={'1'}>A</option>
        <option value={'2'}>B</option>
        <option value={'3'}>C</option>
      </select>
    )

    await userEvent.selectOptions(
      screen.getByRole('listbox'),
      screen.getByRole('option', { name: 'A' })
    )

    expect((screen.getByRole('option', { name: 'A' })).selected).toBe(true)
    expect((screen.getByRole('option', { name: 'B' })).selected).toBe(false)
    expect((screen.getByRole('option', { name: 'C' })).selected).toBe(false)
  })
})
