import { render,cleanup,screen } from "@testing-library/react";
import {Provider} from 'react-redux'
import {store} from '../../../app/store'
import {PieChartComponent} from "../PieChartComponent";
import { BrowserRouter } from "react-router-dom";
import {renderCustomizedLabel} from '../PieChartComponent'



const element = [
    {
    pcr_positive: 100,
    injured: 10,
    secure_bed: 10000,
    use_bed_rate: '',
    inpatient: 200,
    source: '',
    update: '',
    home_recuperator: 0,
    prefecture: '',
    pref_code: 0,
    injured_bed: 0,
    use_injured_bed_rate: '',
  },
]
  
  const data = [
    {
      name: '推定病床残数',
      value: element[0].secure_bed - element[0].inpatient,
    },
    {
        name: 'aaaaaa',
        value: element[0].secure_bed - element[0].inpatient,
      },
  ];

  const data2 = [
    {
      name: 'aaaaaaa',
      value: element[0].secure_bed - element[0].inpatient,
    },
    {
        name: '推定病床残数',
        value: element[0].secure_bed - element[0].inpatient,
      },
  ];

  const custom = {
    cx:10,
    cy:10,
    midAngle:10,
    innerRadius:10,
    outerRadius:10,
    percent:10,
    index:10,
  }


describe("CommentList", () => {

beforeEach(() => {
    render(
      <Provider store={store}>
        <PieChartComponent element={element[0]} data={data}/>
      </Provider>
    );
  });

  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });


  test(`PCR存在する？`, () => {

    // const messageRender = render(<Provider store={store}><PieChartComponent element={element} data={data} /></Provider>);

        const { container } = render(
        <Provider store={store}>
            <PieChartComponent  element={element[0]} data={data} />
        </Provider>
        );
        expect(container).toMatchSnapshot();
        // screen.debug()


    });

    test("renders learn react link", () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <PieChartComponent element={element[0]} data={data}/>
            </BrowserRouter>
          </Provider>
        );
        screen.debug();
      });

      test(`renders TodayDeth`, () => {
        render(
          <Provider store={store}>
            <PieChartComponent element={element[0]} data={data}/>
          </Provider>
        );
        // expect(screen.getByTestId('tooltip')).toBe(true);
        // expect(screen.getByTestId('tooltip')).toBe(true);
        // expect(screen.getAllByRole('tooltip')).toBe(true);
      });
      test(`renders TodayCorona component`, () => {
        render(
          <Provider store={store}>
            <PieChartComponent element={element[0]} data={data2}/>
          </Provider>
          
        );
        screen.debug();
      });
      test("renders learn react link", () => {
        render(
          <Provider store={store}>
              <renderCustomizedLabel custom={custom}/>
          </Provider>
        );
        // const text = screen.getByTestId('text')
        // const radius = custom.innerRadius + (custom.outerRadius - custom.innerRadius) * 0.5;
        // const RADIAN:number = Math.PI / 180;

        // expect(text).toHaveAttribute('x',)
        // expect(screen.getByText('%')).toBeInTheDocument();
        
      });

  });

//   describe('Pieタグテスト', () => {
//     test('Pieタグが存在するか否か', () => {
//       const pieTag = screen.getByText('人');
//       expect(pieTag).toBeInTheDocument();
//     });
//   });
