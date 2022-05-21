import { api } from "../../shared/Api";

import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { handleActions } from "redux-actions";

import swal from "sweetalert";

// Action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const LOG_IN_INFO = "LOG_IN_INFO";
const GET_ALARM = "GET_ALARM";
const READ_ALARM = "READ_ALARM";

// Action creators
export const getAlarm = (payload) => ({
  type: GET_ALARM,
  payload,
});

export const readAlarm = (payload) => ({
  type: READ_ALARM,
  payload,
});

export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = (payload) => ({
  type: LOG_OUT,
  payload,
});

export const logInInfo = (payload) => ({
  type: LOG_IN_INFO,
  payload,
});

// 초기값
const initialState = {
  isLogin: false,
  user: {
    nickname: null,
    userId: null,
    profileUrl: null,
  },
  alarm: [],
};

// 미들웨어
export const kakaoLogin = (authorization_code) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(
        `user/kakao/callback?code=${authorization_code}`
      );
      console.log(data);
      const userId = data.userId;
      const nickname = data.nickname;
      const profileUrl = data.profileUrl;
      const firstLogin = data.firstLogin;
      const agreeSMS = data.agreeSMS;

      setCookie("accessToken", data.token, 168);
      setCookie("refreshToken", data.refreshToken, 168);

      localStorage.setItem("userId", userId);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileUrl", profileUrl);
      localStorage.setItem("firstLogin", firstLogin);
      localStorage.setItem("agreeSMS", agreeSMS);

      dispatch(
        logIn({
          nickname: nickname,
          userId: userId,
          profileUrl: profileUrl,
          firstLogin: firstLogin,
        })
      );

      if (data.firstLogin) {
        history.replace("/loginInfo");
      } else {
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const naverLoginDB = (code, state) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(
        `user/naver/callback?code=${code}&state=${state}`
      );
      console.log(data);
      const userId = data.userId;
      const nickname = data.nickname;
      const profileUrl = data.profileUrl;
      const firstLogin = data.firstLogin;
      const agreeSMS = data.agreeSMS;

      setCookie("accessToken", data.token, 168);
      setCookie("refreshToken", data.refreshToken, 168);

      localStorage.setItem("userId", userId);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileUrl", profileUrl);
      localStorage.setItem("firstLogin", firstLogin);
      localStorage.setItem("agreeSMS", agreeSMS);

      dispatch(
        logIn({
          nickname: nickname,
          userId: userId,
          profileUrl: profileUrl,
          firstLogin: firstLogin,
        })
      );

      if (data.firstLogin) {
        history.replace("/loginInfo");
      } else {
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginInfoDB = (likeLocation, likeDistance, userLevel) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.patch(`/auth/userLike`, {
        likeLocation: likeLocation,
        likeDistance: likeDistance,
        userLevel: userLevel,
      });
      console.log(data);

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    console.log("로그인 체크 DB");
    api
      .get("/user/auth")
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const userId = res.data.userId;
          const nickname = res.data.nickname;
          const profileUrl = res.data.profileUrl;
          const firstLogin = res.data.firstLogin;
          const agreeSMS = res.data.agreeSMS;

          localStorage.setItem("userId", userId);
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("profileUrl", profileUrl);
          localStorage.setItem("firstLogin", firstLogin);
          localStorage.setItem("agreeSMS", agreeSMS);

          dispatch(
            logIn({
              nickname: nickname,
              userId: userId,
              profileUrl: profileUrl,
              firstLogin: firstLogin,
            })
          );
        } else {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          localStorage.clear();
          dispatch(logOut());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const logoutDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.delete(`/user/logout`);
      console.log(data);
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.clear();

      dispatch(logOut());
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
};

export const _getAlarmDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const data = await api.get(`/alarm`);
      console.log(data);
      dispatch(getAlarm(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _readAlarmDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const data = await api.patch(`/alarm`);
      console.log(data);
      // dispatch(readAlarm(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = action.payload.nickname;
        draft.user.userId = action.payload.userId;
        draft.user.profileUrl = action.payload.profileUrl;
        draft.isLogin = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = null;
        draft.user.userId = null;
        draft.user.profileUrl = null;
        draft.isLogin = false;
      }),

    [GET_ALARM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.alarm = action.payload;
      }),
  },
  initialState
);
