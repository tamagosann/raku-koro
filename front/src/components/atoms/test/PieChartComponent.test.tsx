import { render,screen } from "@testing-library/react";
import {Provider} from 'react-redux'
import {store} from '../../../app/store'
import {PieChartComponent} from "../PieChartComponent";
// import { BrowserRouter } from "react-router-dom";
// import {renderCustomizedLabel} from '../PieChartComponent'



const element = [
    {
    pcr_positive: 100,
    injured: 10,
    secure_bed: 10000,
    use_bed_rate: '',
    inpatient: 200,
    source: '',
    update: '',
    home_recuperator: 10,
    prefecture: '',
    pref_code: 10,
    injured_bed: 10,
    use_injured_bed_rate: '',
  },
]
  
  const data = [
    {
      name: '推定病床残数',
      value: 40
    },
    {
      name: '入院者数',
      value: 15
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

// beforeEach(() => {
//     render(
//       <Provider store={store}>
//         <PieChartComponent data={data}/>
//       </Provider>
//     );
//   });

describe("CommentList", () => {


  test(`PCR存在する？`, () => {

    // const messageRender = render(<Provider store={store}><PieChartComponent element={element} data={data} /></Provider>);

        const { container } = render(
        <Provider store={store}>
            <PieChartComponent data={data} />
        </Provider>
        );
        expect(container).toMatchSnapshot();

    });
    test(`renders TodayCorona component`, () => {
      render(
        <Provider store={store}>
          <PieChartComponent data={data}/>
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
    });
      });
  });

