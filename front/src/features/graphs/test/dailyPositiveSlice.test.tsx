import reducer, {
    // dailyDeadSlice,
    fetchDailyPositiveAsync,
    GraphState,
  } from '../dailyPositiveSlice';
  
  describe('Reducer Redux Toolkit', () => {
    describe('change positive', () => {
      const initialState: GraphState = {
        data: [
          {
            daily_hospitalization: 0,
            daily_pcr: 0,
            daily_positive: 0,
            daily_recovery: 0,
            date: ''
          },
        ],
        status: 'loading',
      };
      const dummyData: GraphState = {
        data: [
          {
            daily_hospitalization: 100,
            daily_pcr: 120,
            daily_positive: 10,
            daily_recovery: 10,
            date: '2021-12-12'
          },
        ],
        status: 'loading',
      };
      it('changeValue（fullfilled）', () => {
        const action = {
          type: fetchDailyPositiveAsync.fulfilled,
          payload: dummyData,
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          data: [
            {
                daily_hospitalization: 100,
                daily_pcr: 120,
                daily_positive: 10,
                daily_recovery: 10,
                date: '2021-12-12'
            },
          ],
          status: 'success',
        });
      });
      it('changeValue（pending）', () => {
        const action = {
          type: fetchDailyPositiveAsync.pending,
          payload: dummyData,
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          data: [
            {
                daily_hospitalization: 0,
                daily_pcr: 0,
                daily_positive: 0,
                daily_recovery: 0,
                date: ''
            },
          ],
          status: 'loading',
        });
      });
    });
  });