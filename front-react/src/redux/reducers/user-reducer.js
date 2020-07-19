import { Types } from '../constants/user-type';

const initialState = {
    saveusermessage:"",
    userlist:[],
    registermessage:""
};
export default function authorReducer(state = initialState, action) {
    switch (action.type) {
        case Types.USER_LIST:
            return {...state, userlist: action.payload.message}
            case Types.AUTHMESSAGE:
            return {...state, saveusermessage: action.payload.message}
                case Types.REGISTER_MESSAGE:
            return {...state, registermessage: action.payload.message}
              default:
            return state;
    }
}

// AUTHMESSAGE
// REGISTER_MESSAGE