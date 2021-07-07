import reducer, { selectedPrefecture } from '../prefectureSlice';
import { PrefectureState } from '../prefectureSlice';

describe('Reducer Redux Toolkit', () => {
  describe('change prefectureCode', () => {
    const initialState: PrefectureState = {
      prefCode: 1,
      status: 'loading',
    };
    it('changeValue', () => {
      expect(reducer(initialState, selectedPrefecture(47))).toEqual({
        prefCode: 47,
        status: 'success',
      });
    });
  });
});
