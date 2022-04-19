import axios from "axios"
import Qs from "qs"
import router from '../router'
if (process.env.NODE_ENV == "development") {
    // axios.defaults.baseURL = "http://tc.banyue.vip"
    axios.defaults.baseURL = "http://www.bypark.cn"
} else {
    // axios.defaults.baseURL = "http://tc.banyue.vip"
    axios.defaults.baseURL = "http://www.bypark.cn"
        // axios.defaults.baseURL = "http://192.168.0.185:1110"

}

axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//请求拦截
axios.interceptors.request.use(
    config => {
        let url = config.url
        if (url.indexOf("login") > -1) {
            localStorage.setItem('token', "");
            config.headers.accessToken = "1111";
        } else {
            var Token = localStorage.getItem('token')
            config.headers.authToken = Token;
        }

        return config
    }, error => {
        return Promise.error(error)
    })

//响应拦截
axios.interceptors.response.use(
    response => {
        //如果返回的状态码为200,说明接口请求成功，可以正常拿到数据
        if (response.status == 200) {
            // console.log("陈工")
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        return Promise.reject(error.response);
    }
)

function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            // resolve(res.data)
            if (res.data.code == 414) {
                router.replace({
                    path: '/login' // 到登录页重新获取token
                })
            } else {
                resolve(res.data)
            }
        }).catch(err => {
            reject(err.data)
        })
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        // params.id = 1;
        // params = Qs.stringify(params)
        axios.post(url, params).then(res => {
            // console.log(res,"code是多少")
            if (res.data.code == 414) {
                router.replace({
                    path: '/login' // 到登录页重新获取token
                })
            } else {
                resolve(res.data)
            }

        }).catch(err => {
            reject(err)
        })
    })
}
//非json格式的post请求
function postrest(url, params) {
    return new Promise((resolve, reject) => {
        // params.id = 1;
        params = Qs.stringify(params)
        axios.post(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}


export default {
    get,
    post,
    postrest
}