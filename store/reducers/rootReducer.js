import {combineReducers} from 'redux';
import contactReducer from '../../slices/contacts';

const rootReducer = combineReducers({
    contact: contactReducer,
});

export default rootReducer;