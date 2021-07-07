import { render,cleanup,screen } from "@testing-library/react";
import {Provider} from 'react-redux'
import {store} from '../../../app/store'
import {PieChartComponent} from "../PieChartComponent";
import { BrowserRouter } from "react-router-dom";

const element = {
    pcr_positive: 10,
    injured: 10,
    secure_bed: 10,
    use_bed_rate: '',
    inpatient: 10,
    source: '',
    update: '',
    home_recuperator: 10,
    prefecture: '',
    pref_code: 10,
    injured_bed: 10,
    use_injured_bed_rate: '',
  }
  
  const data = [
    {
      name: '推定病床残数',
      value: 40
    },
    {
      name: '入院者数',
      value: 15
    },
  ];

  


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

    test("renders learn react link", () => {
        render(
          <Provider store={store}>
              <PieChartComponent data={data}/>
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
