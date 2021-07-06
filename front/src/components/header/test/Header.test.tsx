import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Header } from '../index'

import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


describe('ヘッダーのテスト', () => {
  // テストケースを実行する前にやって欲しい処理
  beforeEach(() => {
  })
  
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });
  
  test("ヘッダー部分の表示テスト", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
    screen.debug()
  });

  test("ボタンの数が正しいかどうか",() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getAllByRole("button").length).toBe(8)
    // screen.getAllByRole("")
    // screen.debug()
  })
})

