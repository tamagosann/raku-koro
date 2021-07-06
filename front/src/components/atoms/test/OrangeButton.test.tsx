import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrangeButton } from '..';


describe('オレンジボタンのテスト', () => {
  // テストケースを実行する前にやって欲しい処理
  beforeEach(() => {
  })
  
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });
  
  test('テスト用のボタンが存在するか', () => {
    const onClick = jest.fn();
    const label = 'テストボタンタイトル';
    render(
      <OrangeButton label={label} onClick={onClick}/>
    )

    expect(screen.getByText('テストボタンタイトル')).toBeInTheDocument();
  })
  

  test('テスト用ボタンをクリック', () => {
    const onClick = jest.fn();
    const label = 'テストボタンタイトル';
    render(
      <OrangeButton label={label} onClick={onClick}/>
    )

    const orangeButton = screen.getByRole('button')
    userEvent.click(orangeButton)
    expect(onClick).toHaveBeenCalledTimes(1);
  })
})