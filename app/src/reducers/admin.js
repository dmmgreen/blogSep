import {combineReducers} from 'redux';
import {reducer as tags} from './adminManagerTags';


const admin=combineReducers({
    tags
});

export default admin;