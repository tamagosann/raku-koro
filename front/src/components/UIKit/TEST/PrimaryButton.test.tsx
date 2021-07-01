import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { PrimaryButton } from '../../atoms/index';

describe('PrimaryButton test', () => {

  const sampleText = '決定'
  const MockFunc = jest.fn()

  afterEach(() => {
    cleanup()
  })

  test('render', () => {
    const component = render(<PrimaryButton label={sampleText} onClick={() => MockFunc} />);
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