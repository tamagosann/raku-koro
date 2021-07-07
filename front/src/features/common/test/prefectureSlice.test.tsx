import reducer, { selectedPrefecture } from '../prefectureSlice';
import { PrefectureState } from '../prefectureSlice';

describe('Reducer Redux Toolkit', () => {
  describe('change prefectureCode', () => {
    const initialState: PrefectureState = {
      prefCode: 1,
      status: 'loading',
    };
    it('changeValue', () => {
      const action = { type: selectedPrefecture.type, payload: 47 };
      const state = reducer(initialState, action);
      // expect(state.status).toEqual('success');
      expect(state).toEqual({
        prefCode: 47,
        status: 'success',
      });
      // expect(reducer(initialState, selectedPrefecture(47))).toEqual({
      //   prefCode: 47,
      //   status: 'success',
      // });
    });
  });
});
