import {fork} from 'redux-saga/effects';
import {getAllTagsFlow} from './adminManagerTagsSaga';
import {getArticlesListFlow,getArticleDetailFlow,loginFlow,registerFlow,user_auth} from './frontSaga';


export default function *rootSaga() {
    yield fork(getAllTagsFlow);
    yield fork(getArticlesListFlow);
    yield fork(getArticleDetailFlow);
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(user_auth);
}