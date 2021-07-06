import { render, screen, cleanup } from '@testing-library/react';
import { LineReChart } from '..';

import { Provider } from 'react-redux';
import { store } from '../../../app/store';


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

    test('日別グラフチャートの表示テスト', () => {
      const LineReChartProps: Props = {
        data: [
          {
          date: "2021-07-05",
          npatients: 600,
          adpatients: 400
          },
          {
            date: "2021-07-06",
            npatients: 700,
            adpatients: 300
          }
        ],
        xDataKey: "date",
        lineDataKey: "npatients",
        lineName: "感染者数",
        startIndex: 1,
        endIndex: 30
      };
      render(
        <Provider store={store}>
          <LineReChart
            data={LineReChartProps.data}
            xDataKey= {LineReChartProps.xDataKey}
            lineDataKey= {LineReChartProps.lineDataKey}
            lineName= {LineReChartProps.lineName}
            startIndex={LineReChartProps.startIndex}
            endIndex={LineReChartProps.endIndex}
          />
        </Provider>
      )
    })

    
})