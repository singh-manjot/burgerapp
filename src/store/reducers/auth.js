import * as actionTypes from "../actions/actionTypes";

const initialState = {
  idToken: null,
  loading: false,
  error: null,
  localId: null,
  redirect:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, error: null, loading: true, redirect:false };
    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.error, redirect:false };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, idToken: null, localId: null, redirect:false };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        localId: action.localId,
        idToken: action.idToken,
        redirect:true
      };
    default:
      return initialState;
  }
};
