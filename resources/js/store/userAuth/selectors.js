export const getIsAuth = (state) => {
   console.log(state.auth)
   return state.auth.user.token == null;
};

export const getUser = (state) => {
   console.log(state.auth)
   return state.auth.user
};

export const getUserEmail = (state) => {
   console.log(state.auth.user)
   return state.auth.user.email ;
}

export const getToken = (state) => state.auth.user !== null ? state.auth.user.token: '';

export const getErrors = (state) => {
   console.log(state.auth)
   return state.auth.errors
};