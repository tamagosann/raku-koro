import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { BrowserRouter } from "react-router-dom";
import  {ModalPreview}  from "../ModalPreview";


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


describe("DeceasedPerson", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("renders learn react link", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ModalPreview element={element} data={data}/>
        </BrowserRouter>
      </Provider>
    );
  });
});
