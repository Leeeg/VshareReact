//全局路径
const commonUrl = 'http://localhost:8089';

//解析json
function parseJSON(response) {
    console.log('parseJSON = ' + response);
    return response.json()
}

//检查请求状态
function checkStatus(response) {
    if (response.status >= 200 && response.status < 500) {
        console.log('status = ' + response.status);
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
    // if (!headers) {
    //     options.headers = {
    //         'Content-Type': 'application/json;charset=UTF-8'
    //     };
    // }
    let urlComplete = url;
    if (!url.toString().startsWith('http')) {
        urlComplete = commonUrl + url;
    }
    return fetch(urlComplete, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch(err => alert('' + err));
}