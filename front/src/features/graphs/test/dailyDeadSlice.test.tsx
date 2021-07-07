import reducer, {
    // dailyDeadSlice,
    fetchDailyDeadAsync,
    GraphState,
  } from '../dailyDeadSlice';
  
  describe('Reducer Redux Toolkit', () => {
    describe('change prefectureDead', () => {
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
            date: '2021-12-12',
            pref_code: 1,
            pref_name: '北海道',
          },
        ],
        status: 'loading',
      };
      it('changeValue（fullfilled）', () => {
        const action = {
          type: fetchDailyDeadAsync.fulfilled,
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
              date: '2021-12-12',
              pref_code: 1,
              pref_name: '北海道',
            },
          ],
          status: 'success',
        });
      });
      it('changeValue（pending）', () => {
        const action = {
          type: fetchDailyDeadAsync.pending,
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