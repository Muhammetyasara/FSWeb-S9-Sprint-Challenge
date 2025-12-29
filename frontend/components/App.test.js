import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from './AppFunctional'

describe('AppFunctional - Temel Render ve Etkileşim Testleri', () => {

  test('Koordinatlar ve adım başlığı ekranda görünüyor', () => {
    render(<AppFunctional />)

    expect(screen.getByText(/Koordinatlar/i)).toBeInTheDocument()
    expect(screen.getByText(/kere ilerlediniz/i)).toBeInTheDocument()
  })

  test('Yön butonları ekranda render ediliyor', () => {
    render(<AppFunctional />)

    expect(screen.getByText('SOL')).toBeInTheDocument()
    expect(screen.getByText('SAĞ')).toBeInTheDocument()
    expect(screen.getByText('YUKARI')).toBeInTheDocument()
    expect(screen.getByText('AŞAĞI')).toBeInTheDocument()
  })

  test('Reset butonu ekranda görünüyor', () => {
    render(<AppFunctional />)

    expect(screen.getByText(/reset/i)).toBeInTheDocument()
  })

  test('Email input ekranda görünüyor', () => {
    render(<AppFunctional />)

    const emailInput = screen.getByPlaceholderText(/email girin/i)
    expect(emailInput).toBeInTheDocument()
  })

  test('Email inputuna yazı yazıldığında value değişiyor', () => {
    render(<AppFunctional />)

    const emailInput = screen.getByPlaceholderText(/email girin/i)
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })

    expect(emailInput).toHaveValue('test@test.com')
  })

})

test('sanity', () => {
  expect(true).toBe(false)
})
