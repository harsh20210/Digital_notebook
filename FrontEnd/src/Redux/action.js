import {
  LOGIN,
  ERROR_MESSAGE,
  ERROR_MESSAGE_IN_REGISTER,
  GET_DATA,
} from "./actionType";
import axios from "../axios";
import Swal from "sweetalert2";

export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const errorMessage = (payload) => {
  return {
    type: ERROR_MESSAGE,
    payload,
  };
};

export const error_message_while_gegistering = (payload) => {
  return {
    type: ERROR_MESSAGE_IN_REGISTER,
    payload,
  };
};

export const getAllData = (payload) => {
  return {
    type: GET_DATA,
    payload,
  };
};

export const loginApi = (payload, redirurl) => (dispatch) => {
  axios
    .post(`/login`, {
      email: payload.email,
      password: payload.pass,
    })
    .then((res) => {
      if (res.data.status) {
        dispatch(login(res.data.data));
        Swal.fire({
          icon: "success",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
        redirurl();
      } else {
        dispatch(errorMessage(res.data.message));
      }
    })
    .catch((e) => {
      dispatch(errorMessage(e.response.data.message));
    });
};

export const registerApi = (payload) => (dispatch) => {
  axios
    .post(`/register`, {
      name: payload.name,
      email: payload.email,
      password: payload.pass,
    })
    .then((res) => {
      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        dispatch(error_message_while_gegistering(res.data.message));
      }
    })
    .catch((e) => {
      dispatch(error_message_while_gegistering(e.response.data.message));
    });
};

export const getAllDataAPI = (payload) => (dispatch) => {
  axios
    .post(`/getApi`, {
      email: payload.email,
    })
    .then((res) => {
      if (res.data.status) {
        dispatch(getAllData(res?.data?.data));
      } else {
        dispatch(getAllData([]));
        Swal.fire({
          icon: "error",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
    .catch((e) => {
      dispatch(getAllData([]));

      Swal.fire({
        icon: "error",
        title: `${e.response.data.message}`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showConfirmButton: false,
        timer: 2000,
      });
    });
};

export const deleteApi = (payload) => (dispatch) => {
  axios
    .post(`/deleteCommand`, {
      email: payload.email,
      date: payload.date
    })
    .then((res) => {
      if (res.data.status) {
        dispatch(getAllDataAPI({email:payload.email}));
        Swal.fire({
          icon: "success",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
    .catch((e) => {
      console.log("e?.response?.data?.message => " , e?.response?.data?.message)
      Swal.fire({
        icon: "error",
        title: `${e?.response?.data?.message}`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showConfirmButton: false,
        timer: 2000,
      });
    });
};

export const inserData = (payload) => (dispatch) => {
  axios
    .post(`/insertValue`, {
       ...payload
    })
    .then((res) => {
      if (res.data.status) {
        dispatch(getAllDataAPI({email:payload.email}));
        Swal.fire({
          icon: "success",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
    .catch((e) => {
      Swal.fire({
        icon: "error",
        title: `${e?.response?.data?.message}`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showConfirmButton: false,
        timer: 2000,
      });
    });
};

export const logout = (payload , redir) => (dispatch) => {
  axios
    .post(`/logout`, {
       ...payload
    })
    .then((res) => {
      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
        redir();
      } else {
        Swal.fire({
          icon: "error",
          title: `${res.data.message}`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
    .catch((e) => {
      Swal.fire({
        icon: "error",
        title: `${e?.response?.data?.message}`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showConfirmButton: false,
        timer: 2000,
      });
    });
};