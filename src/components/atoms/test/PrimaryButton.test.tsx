import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import  PrimaryButton  from '../PrimaryButton';

describe('PrimaryButton test', () => {

  const sampleText = '決定'
  const MockFunc = jest.fn()

  afterEach(() => {
    cleanup()
  })

  test('render', () => {
    render(<PrimaryButton label={sampleText} onClick={() => MockFunc} />);
    const linkElement = screen.getByText(sampleText);
    expect(linkElement).toBeInTheDocument();
  });

  test("click:PrimaryButton", () => {
    render(<PrimaryButton label={sampleText} onClick={MockFunc} />)
    const button = screen.getByText(sampleText);
    fireEvent.click(button)
    expect(MockFunc.mock.calls.length).toBe(1)
  })
})