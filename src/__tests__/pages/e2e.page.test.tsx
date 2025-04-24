import ManageColumns from '@/components/form/FormTable/ManageColumns'
import ScheduleTable from '@/features/schedule/components/ScheduleTable'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Testing Schedule Search Component', () => {
  test('render Schedule table', () => {
    render(<ScheduleTable />)
    const buttons = screen.queryByRole('button', {
      name: 'Excel Hi'
    })
    expect(buttons).not.toBeInTheDocument()
  })

  test('handler caller oneTime', async () => {
    userEvent.setup()
    const handleSelect = jest.fn()
    render(
      <ManageColumns columns={[]} onChangeCheck={handleSelect} />
    )

    const _button = screen.getByRole('button', { name: 'Hide All' })
    await userEvent.click(_button)
    expect(handleSelect).toHaveBeenCalled()
  })

  test('renders a list of rows', async () => {
    render(<ScheduleTable />)
    const rows = await screen.findAllByRole('button', { name: 'Excel' })
    console.log('rows', rows)
    expect(rows).not.toHaveLength(2) // 1
  })
})
