import { render, screen } from '@testing-library/react'
import Home from '../page'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import { act } from 'react-dom/test-utils'

jest.mock('next/router', () => ({
    useRouter: jest.fn()
  }))
  
describe('Home', () => {
    
  it('Has Welcome Text', () => {
    act(() => {
        render(<Home />)
        const welcomeText = screen.getByText( 'What genre is this?')
    })
    
    expect(welcomeText).toBeInTheDocument()
  })
})