const API='http://localhost:3600';
import axios from 'axios';

let config = {
    // baseURL: '/api',
    transformRequest: [
        function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret;
        }
    ],
    transformResponse: [
        function (data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000,
    responseType: 'json'
};

axios.interceptors.response.use(function(res){
    //相应拦截器
    return res.data;
});


export function get(url) {
    return axios.get(API+url, config);
}

export function post(url, data) {
    return axios.post(API+url, data, config);
}