import { render, screen } from '@testing-library/react'
import Home from '../page'
import '@testing-library/jest-dom'
import { act } from 'react'

describe('Home', () => {
    
  it('Renders the HomeHero component', () => {
    act(() => {
        render(<Home />)
    })
    // The HomeHero renders music note emojis
    const musicNotes = screen.getAllByText('🎵')
    expect(musicNotes.length).toBeGreaterThan(0)
  })
})