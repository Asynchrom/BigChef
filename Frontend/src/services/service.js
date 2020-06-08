import axios from "axios"
import store from '../store'

let Service = axios.create({
    baseURL: 'https://big-chef-api.herokuapp.com/',
    timeout: 5000
})

Service.interceptors.request.use((request) => {
    request.headers['Authorization'] = 'Bearer ' + store.token;
    return request;
})

Service.interceptors.response.use((response) => {
        return response
    },
    (error) => {
        if (error.response.status == 401) { 
            window.localStorage.removeItem('store')
            $router.go()
        }
        throw error
    }
)

export { Service }
