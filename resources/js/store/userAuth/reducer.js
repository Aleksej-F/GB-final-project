import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, SET_ERROR} from "./actions"

const initialState = {
    user: {
        email: "",
        password: "",
        token: null,
        id: null,
    },
    errors: null
}

export const userAuthReducer = (state = initialState, action)=> {
    switch(action.type){
        case(SIGNUP_USER): {
            return {
                user:action.payload
            }
        }
        case(LOGIN_USER): {
            return {
                user:action.payload
            }
        }

        case(LOGOUT_USER): {
            console.log("LOGOUT_USER red - ")
            return {
                ...state,
                user: {...state.user, token: null, id: null}
            }
        }

        case(SET_ERROR): {
            return {
                ...state,
                errors: action.payload
            }
        }

        default : {
            return state
        }
    }
}