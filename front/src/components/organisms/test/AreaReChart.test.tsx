import { render, screen, cleanup } from '@testing-library/react';
import { AreaReChart } from '..';

import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

interface Data {
  date: string;
  ndeaths: number;
}

interface Props {
  data: Data[];
  xDataKey: string;
  areaDataKey: string;
  areaName: string;
}

describe('累計グラフチャートのテスト', () => {
    // テストケースを実行する前にやって欲しい処理
    beforeEach(() => {
    })
    
    //毎回レンダリング画面を空にする
    afterEach(() => {
      cleanup();
    });

    test('累計グラフチャートの表示テスト', () => {
      const AreaReChartProps: Props = {
        data: [
          {
            date: "2021-07-05",
            ndeaths: 600
          },
          {
            date: "2021-07-06",
            ndeaths: 700
          }
        ],
        xDataKey: "date",
        areaDataKey: "ndeaths",
        areaName: "死亡者数"
      };
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AreaReChart
              data={AreaReChartProps.data}
              xDataKey={AreaReChartProps.xDataKey}
              areaDataKey={AreaReChartProps.areaDataKey}
              areaName={AreaReChartProps.areaName}
            />
          </BrowserRouter>
        </Provider>
      )
    })
})