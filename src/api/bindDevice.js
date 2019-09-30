import http from '../utils/http'

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// let url2 = `${protocol}//192.168.100.2/domino`// let url2 = `${protocol}//127.0.0.1/domino`
let url1 = `${http.localURL}`



export default {

  // 获取待绑定设备的信息
  getDeviceInfo(id) {
    return http.get(`${url1}/puffer/v1/devInfo/${id}?acc=unitadmin==`)
  },

  // pass
  passDevice(param) {
    return http.post(`${url1}/puffer/unit/v1/factory/device`, param)
  },



}
