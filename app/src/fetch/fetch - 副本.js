const API='http://localhost:3600/';
let Tools = {
    checkStates: function (response) {
        if(response.ok){
            return response
        }else{
            let error = new Error(response.statusText);
            error.state = response.status;
            error.response = response;
            throw error;
        }
    },
    parseJSON:function (response) {
        return response.json();
    },
    _getSearchFromObject:function(param, key) {

        if(param == null) return '';
        let _search = '?';
        for (let key in param) {
            _search += `${key}=${encodeURIComponent(param[key])}&`
        }
        return _search.slice(0, -1);
    }
};
function _request (_method,_api,_params) {
    let _options = {
        method:_method,
        mode: "cors",
        headers:{
            // 'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:(_method === 'GET')? null:JSON.stringify(_params)
    };
    if(_method.toLowerCase() === 'get'){
        _api+=Tools._getSearchFromObject(_params)
    }
    fetch(_api,_options)
        .then(Tools.checkStates)
        .then(Tools.parseJSON)
        .then((data)=>{
            return data;
        })
        .catch((err)=>{
            return err;
        });
}


export function get(url) {
      _request('GET',API+url);
}

export function post(url, data) {
    return _request('POST',API+url,data);
}