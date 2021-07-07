import reducer, { GraphState, fetchBedOccupancyRateAsync } from '../bedOccupancyRateSlice';

describe('Reducer Redux Toolkit', () => {
  const initialState: GraphState ={
    data: [
      {
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
      },
    ],
    status: 'loading',
  }

  const dummyData: GraphState = {
    data: [
      {
        pcr_positive: 10,
        injured: 20,
        secure_bed: 30,
        use_bed_rate: '25%',
        inpatient: 40,
        source: 'test',
        update: 'test2',
        home_recuperator: 50,
        prefecture: 'test3',
        pref_code: 60,
        injured_bed: 70,
        use_injured_bed_rate: 'test4',
      },
    ],
    status: 'loading',
  }

  test('changeValue(fulfilled)', () => {
    const action = {
      type: fetchBedOccupancyRateAsync.fulfilled,
      payload: dummyData
    }
    const state = reducer(initialState, action);
    expect(state).toEqual({
      data: [
        {
          pcr_positive: 10,
          injured: 20,
          secure_bed: 30,
          use_bed_rate: '25%',
          inpatient: 40,
          source: 'test',
          update: 'test2',
          home_recuperator: 50,
          prefecture: 'test3',
          pref_code: 60,
          injured_bed: 70,
          use_injured_bed_rate: 'test4',
        },
      ],
      status: 'success',
    })
  })

  test('changeValue(pending)', () => {
    const action = {
      type: fetchBedOccupancyRateAsync.pending,
      payload: dummyData
    }
    const state = reducer(initialState, action);
    expect(state).toEqual({
      data: [
        {
          home_recuperator: 0,
          injured: 0,
          injured_bed: 0,
          inpatient: 0,
          pcr_positive: 0,
          pref_code: 0,
          prefecture: "",
          secure_bed: 0,
          source: "",
          update: "",
          use_bed_rate: "",
          use_injured_bed_rate: "",
        },
      ],
      status: 'loading',  
    })
  })
})