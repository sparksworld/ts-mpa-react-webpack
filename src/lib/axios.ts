import axios from 'axios'
import deep from 'spark-deep'

export default class Ajax {
    protected http: any
    constructor(option: { baseURL: string; }) {
        this.http = axios.create({
            baseURL: option.baseURL
        })

        this.http.interceptors.request.use((config: any) => {
            config.params = deep({
                test: 1
            }, config.params)
            if (config.method === 'post') {
                // 数据序列化成表单
                const formData = new FormData()
                Object.keys(config.data).forEach((key) => formData.append(key, config.data[key]))
                config.data = formData
            }
            config.headers = {
                'Content-type': 'application/x-www-form-urlencoded'
            }

            return config
        }, (error: any) => {

            return Promise.reject(error)
        })

        this.http.interceptors.response.use((response: any) => {
            const {
                data
            }: any = response
            if (data && data != "") {
                return data
            } else {
                return Promise.reject(data)
            }
        }, (error: any) => {
            return Promise.reject(error)
        })
    }
    protected get(api: any, params = {}) {
        return this.http.get(api, {
            params: params
        })
    }
    protected post(api: any, params = {}) {
        return this.http.post(api, params)
    }
}