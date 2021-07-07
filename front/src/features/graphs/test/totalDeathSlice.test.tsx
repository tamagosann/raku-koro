import reducer, {
  totalDeathSlice,
  fetchTotalDethAsync,
  GraphState,
} from '../totalDeathSlice';

describe('Reducer Redux Toolkit', () => {
  const initialState: GraphState = {
    data: [
      {
        date: '',
        ndeaths: 0,
      },
    ],
    status: 'loading',
  };
  const mockData: GraphState = {
    data: [
      {
        date: '2021-5-1',
        ndeaths: 100,
      },
    ],
    status: 'loading',
  };
  it('changeValue(fullfilled)', () => {
    const action = {
      type: fetchTotalDethAsync.fulfilled,
      payload: mockData,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      data: [
        {
          date: '2021-5-1',
          ndeaths: 100,
        },
      ],
      status: 'success',
    });
  });
  it('changeValue(pending)', () => {
    const action = {
      type: fetchTotalDethAsync.pending,
      payload: mockData,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      data: [
        {
          date: '',
          ndeaths: 0,
        },
      ],
      status: 'loading',
    });
  });
});
