import { createContext, useReducer } from "react";

export const AuthContext = createContext();

/** is needed to change the "user" object on page */
const authReducer = (state, action) => {
  switch (action.type) {
    // User is Loging in
    case "LOGIN":
      let result;
      if (state.user) {
        result = { user: { ...state.user, ...action.payload } };
      } else {
        result = { ...state, user: action.payload };
      }
      return result;
    //User is logged out
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
/** provides "user" and "dispatch" to every page that uses this context (--> const {user,dispatch} = useContext(AuthContext)) */
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
