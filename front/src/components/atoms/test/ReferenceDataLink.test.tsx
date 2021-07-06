import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReferenceDataLink } from '..';

describe('リンクのテスト', () => {
  beforeEach(() => {
  })

  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test('「Googleへ」テキストが存在するか', () => {
    const label = 'Googleへ'
    const href = 'https://www.google.com'
    render(
      <ReferenceDataLink label={label} href={href} />
    )

    expect(screen.getByText('Googleへ')).toBeInTheDocument();
  })  
})