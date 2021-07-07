import { render,cleanup,screen } from "@testing-library/react";
import {Provider} from 'react-redux'
import {store} from '../../../app/store'
import {PieChartComponent} from "../PieChartComponent";
import { BrowserRouter } from "react-router-dom";

const element = {
    pcr_positive: 0,
    injured: 0,
    secure_bed: 0,
    use_bed_rate: '',
    inpatient: 0,
    source: '',
    update: '',
    home_recuperator: 0,
    prefecture: '',
    pref_code: 0,
    injured_bed: 0,
    use_injured_bed_rate: '',
  }
  
  const data = [
    {
      name: '推定病床残数',
      value: element.secure_bed - element.inpatient,
    },
    {
      name: '入院者数',
      value: element.inpatient,
    },
  ];


describe("CommentList", () => {

beforeEach(() => {
    render(
      <Provider store={store}>
        <PieChartComponent  element={element} data={data}/>
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
            <PieChartComponent  element={element} data={data} />
        </Provider>
        );
        expect(container).toMatchSnapshot();
        // screen.debug()


    });

    test("renders learn react link", () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <PieChartComponent element={element} data={data}/>
            </BrowserRouter>
          </Provider>
        );
        screen.debug();
      });
      

  });

//   describe('Pieタグテスト', () => {
//     test('Pieタグが存在するか否か', () => {
//       const pieTag = screen.getByText('人');
//       expect(pieTag).toBeInTheDocument();
//     });
//   });
