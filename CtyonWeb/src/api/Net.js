//全局路径
const commonUrl = 'http://192.168.0.40:8081/api';

//解析json
function parseJSON(response) {
    return response.json()
}

//检查请求状态
function checkStatus(response) {
    if (response.status >= 200 && response.status < 500) {
        return response
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error
}

export default function request(options = {}) {
    const {headers, url} = options;
    delete options.url;
    options = {...options};
    options.mode = 'cors';//跨域
    if (!headers) {
        options.headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        };
    }
    return fetch(commonUrl + url, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch(err => ({err}))
}