import HelloComponent from '@/components/basetest/HelloComponent'
import { render, screen } from '@testing-library/react'

describe('Testing snapshot example', () => {
  it('will check the matchers and pass', () => {
    const user = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20),
      name: 'LeBron James'
    }

    expect(user).toMatchSnapshot({
      createdAt: expect.any(Date),
      id: expect.any(Number)
    })
  })
})
