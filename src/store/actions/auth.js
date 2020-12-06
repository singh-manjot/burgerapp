import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    localId: data.localId,
    idToken: data.idToken,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("localId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      dispatch(logoutUser());
    } else {
      const expiration = new Date(localStorage.getItem("expirationDate"));
      const localId = new Date(localStorage.getItem("localId"));
      if (expiration > new Date()) {
        dispatch(authSuccess({ localId, idToken }));
        dispatch(checkAuthTimeout(expiration.getTime() - new Date().getTime()));
      } else {
        dispatch(logoutUser());
      }
    }
  };
};

export const checkAuthTimeout = (expirationTimeout) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logoutUser());
    }, expirationTimeout);
  };
};

export const auth = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(
        process.env.AUTH_URL,
        { email: username, password, returnSecureToken: true }
      )
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("localId", response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
  };
};
