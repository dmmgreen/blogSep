import {take,call,put} from 'redux-saga/effects';
import {get,post} from '../fetch/fetch';
import {actionsTypes as IndexActionTypes} from '../reducers';
import {actionTypes as FrontActionTypes} from '../reducers/frontReducer';


export function * getArticleList(tag, pageNum) {
    yield put({type:IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getArticles?pageNum=${pageNum}&isPublish=true&tag=${tag}`);
    } catch (e) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0});
    } finally {
        yield put({type:IndexActionTypes.FETCH_END});
    }
}

export function * getArticlesListFlow() {
    while (true) {
        let req = yield take(FrontActionTypes.GET_ARTICLE_LIST);
        let res=yield call(getArticleList,req.tag,req.pageNum);
        if(res.code === 0){
            res.data.pageNum=req.pageNum;
            yield  put({type:FrontActionTypes.RESPONSE_ARTICLE_LIST,data:res.data});
        }else{
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
        }
    }
}


export function * getArticleDetail(id) {
    yield put({type:IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getArticleDetail?id=${id}`);
    } catch (e) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType: 0})
    } finally {
        yield put({type:IndexActionTypes.FETCH_END});
    }
}

export function *getArticleDetailFlow() {
    while (true) {
        let req = yield take(FrontActionTypes.GET_ARTICLE_DETAIL);
        let res=yield call(getArticleDetail,req.id);
        if(res){
            if(res.code === 0){
                yield put({type: FrontActionTypes.RESPONSE_ARTICLE_DETAIL,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function * login(username, password) {
    yield put({type:IndexActionTypes.FETCH_START});
    try {
        return yield call(post, "/user/login", {username, password});
    } catch (e) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:"用户名或密码错误",msgType:0});
    } finally {
        yield put({type:IndexActionTypes.FETCH_END});
    }
}

export function * loginFlow() {
    while (true) {
        let request = yield take(IndexActionTypes.USER_LOGIN);
        let response=yield call(login,request.username,request.password);
        if(response && response.code===0){
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:"登录成功!",msgType:1});
            yield put({type:IndexActionTypes.RESPONSE_USER_INFO,data:response.data});
        }
    }
}

export function * register(data) {
    yield put({type:IndexActionTypes.FETCH_START});
    try {
        return yield call(post, "/user/register",data);
    } catch (e) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:"注册失败",msgType:0});
    } finally {
        yield put({type:IndexActionTypes.FETCH_END});
    }
}

export function * registerFlow() {
    while (true) {
        let request = yield take(IndexActionTypes.USER_REGISTER);
        let response=yield call(register,request.data);
        if(response && response.code===0){
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:"注册成功!",msgType:1});
            yield put({type:IndexActionTypes.RESPONSE_USER_INFO,data:response.data});
        }
    }
}