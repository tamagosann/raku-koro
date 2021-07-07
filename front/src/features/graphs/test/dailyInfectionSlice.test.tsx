import reducer, {
  dailyInfectionSlice,
  fetchDailyInfectionAsync,
  GraphState,
} from '../dailyInfectionSlice';

describe('Reducer Redux Toolkit', () => {
  describe('change prefectureInfection', () => {
    const initialState: GraphState = {
      data: [
        {
          daily_infection: 0,
          total_infection: 0,
          daily_dead: 0,
          total_dead: 0,
          date: '',
          pref_code: 1,
          pref_name: '',
        },
      ],
      status: 'loading',
    };
    const dummyData: GraphState = {
      data: [
        {
          daily_infection: 100,
          total_infection: 200,
          daily_dead: 300,
          total_dead: 400,
          date: '2021-80-12',
          pref_code: 1,
          pref_name: '北海道',
        },
      ],
      status: 'loading',
    };
    it('changeValue（fullfilled）', () => {
      const action = {
        type: fetchDailyInfectionAsync.fulfilled,
        payload: dummyData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [
          {
            daily_infection: 100,
            total_infection: 200,
            daily_dead: 300,
            total_dead: 400,
            date: '2021-80-12',
            pref_code: 1,
            pref_name: '北海道',
          },
        ],
        status: 'success',
      });
    });
    it('changeValue（pending）', () => {
      const action = {
        type: fetchDailyInfectionAsync.pending,
        payload: dummyData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [
          {
            daily_infection: 0,
            total_infection: 0,
            daily_dead: 0,
            total_dead: 0,
            date: '',
            pref_code: 1,
            pref_name: '',
          },
        ],
        status: 'loading',
      });
    });
  });
});
