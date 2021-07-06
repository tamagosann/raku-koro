import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Data {
  date: string;
  npatients: number;
  adpatients: number;
}

interface Props {
  data: Data[];
  xDataKey: string;
  lineDataKey: string;
  lineName: string;
  startIndex: number;
  endIndex: number;
}

describe('日別グラフチャートのテスト', () => {
    // テストケースを実行する前にやって欲しい処理
    beforeEach(() => {
    })
    
    //毎回レンダリング画面を空にする
    afterEach(() => {
      cleanup();
    });

    test('テスト', () => {
      const LineReChartProps: Props = {
        data: [{
          date: "2021-07-05",
          npatients: 600,
          adpatients: 400
        }
        ],
        xDataKey: "date",
        lineDataKey: "npatients",
        lineName: "感染者数",
        startIndex: 1,
        endIndex: 30
      };
      
    })

    
})