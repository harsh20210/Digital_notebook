// import {
//   LOGIN,
//   GET_DATA,
//   ERROR_MESSAGE_IN_REGISTER,
//   ERROR_MESSAGE,
// } from "./actionType";

// const init = {
//   loginDetails: {},
//   errorMesageForReg: "",
//   errorInLogin: "",
//   allData:[]
// };

// export const taskManagerStorage = (state = init, { type, payload }) => {
//   switch (type) {
//     case LOGIN:
//       return {
//         ...state,
//         loginDetails: payload,
//       };

//     case ERROR_MESSAGE:
//       return {
//         ...state,
//         errorInLogin: payload,
//       };

//     case ERROR_MESSAGE_IN_REGISTER:
//       return {
//         ...state,
//         errorMesageForReg: payload,
//       };

//     case GET_DATA: 
//     return {
//        ...state,
//        allData:payload
//     }

//     default:
//       return state;
//   }
// };



import {
  LOGIN,
  GET_DATA,
  ERROR_MESSAGE_IN_REGISTER,
  ERROR_MESSAGE,
} from "./actionType";

const initialState = {
  loginDetails: {},
  errorMesageForReg: "",
  errorInLogin: "",
  allData: [],
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle write errors here
  }
};

export const taskManagerStorage = (state = loadState(), { type , payload } ) => {
  switch (type) {
    case LOGIN:
      const newStateLogin = {
        ...state,
        loginDetails: payload,
      };
      saveState(newStateLogin);
      return newStateLogin;

    case ERROR_MESSAGE:
      const newStateError = {
        ...state,
        errorInLogin: payload,
      };
      saveState(newStateError);
      return newStateError;

    case ERROR_MESSAGE_IN_REGISTER:
      const newStateErrorReg = {
        ...state,
        errorMesageForReg: payload,
      };
      saveState(newStateErrorReg);
      return newStateErrorReg;

    case GET_DATA:
      const newStateData = {
        ...state,
        allData: payload,
      };
      saveState(newStateData);
      return newStateData;

    default:
      return state;
  }
};
