import axios from "axios";


const service = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000,
})

service.interceptors.response.use(
  response=>{
    return response.data
  }
)
export default service;