import { SET_DATA } from './actions';

const initialState = {
  data: [], // 초기 상태
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload, // action의 payload로 전달된 데이터로 업데이트
      };
    default:
      return state;
  }
};