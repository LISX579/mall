import axios from "axios";

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL:  "http://152.136.185.210:7878/api/m5" ,
    timeout: 5000
  })
  //2.1axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })
    //（1）比如config中的一些信息不符合服务器的要求
    //（2）比如每次发送网络请求时，都希望再界面中显示一个请求的图标
    //（3）某些网络请求（比如登录(token)）,必须携带一些特殊信息
  //2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })

  //3.发送真正的网络请求
  return instance(config)
}
