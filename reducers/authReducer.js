
const initialState = {
    user: null,
  };
  
  const SET_USER = "SET_USER";
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        };
      // Vous pouvez ajouter d'autres cas pour gérer d'autres actions liées à l'utilisateur
      default:
        return state;
    }
  };
  
  export const setUser = (user) => {
    return {
      type: SET_USER,
      payload: user,
    };
  };
  
  export default authReducer;