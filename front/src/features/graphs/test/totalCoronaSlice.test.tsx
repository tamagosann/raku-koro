import reducer, { GraphState, fetchTotalCoronaAsync } from '../totalCoronaSlice';

describe('Reducer Redux Toolkit', () => {
  const initialState: GraphState = {
    data: [
      {
        date: "",
        npatients: 0,
        adpatients: 0,
      }
    ],
    status: "loading"
  };
  const dummyData: GraphState = {
    data: [
      {
        date: "2021-07-04",
        npatients: 500,
        adpatients: 200,
      }
    ],
    status: "loading"
  };

  test('changeValue(fulfilled)', () => {
    const action = {
      type: fetchTotalCoronaAsync.fulfilled,
      payload: dummyData
    }
    const state = reducer(initialState, action)
    expect(state).toEqual({
      data: [
        {
          date: "2021-07-04",
          npatients: 500,
          adpatients: 200,
        }
      ],
      status: "success"
    })
  })

  test('changeValue(pending)', () => {
    const action = {
      type: fetchTotalCoronaAsync.pending,
      payload: dummyData
    }
    const state = reducer(initialState, action)
    expect(state).toEqual({
      data: [
        {
          date: "",
          npatients: 0,
          adpatients: 0,
        }
      ],
      status: "loading"
    })

  })
})