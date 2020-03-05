import axios from "axios"
import auth from "./auth"
import router from "../routes"

const BASE_URL = 'http://127.0.0.1:8000'
// const BASE_URL = 'http://www.ykjzone.com'


class Http{
  constructor(){
    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    })
    this.http.interceptors.request.use(config => {
      const token = auth.token
      if(token){
        config.headers.common.authorization = 'jwt ' + token
      }
      return config
    })
    this.http.interceptors.response.use(null, err => {
      if(err.response.status == 403){
        auth.clearUserToken()
        router.replace('/login')
      }
    })
  }

  getSmsCode(telephone){
    const url = '/smscode?tel=' + telephone
    return this.http.get(url)
  }

  login(data){
    const url = '/login'
    return this.http.post(url,data)
  }

  getMerchant(merchant_id){
    const url = '/merchant/' + merchant_id
    return this.http.get(url)
  }

  getMerchants(page){
    const url = '/merchant?page=' + page
    return this.http.get(url)
  }

  getCategories(merchant_id){
    const url = '/category/merchant/' + merchant_id
    return this.http.get(url)
  }

  searchMerchants(keyword){
    const url = '/search?q=' + keyword
    return this.http.get(url)
  }

  addAddress(address){
    const url = '/address'
    return this.http.post(url,address)
  }

  getAddressList(){
    const url = '/address'
    return this.http.get(url)
  }

  updateAddress(address_id,address){
    const url = '/address/' + address_id
    return this.http.put(url,address)
  }

  getDefaultAddress(){
    const url = '/address/default'
    return this.http.get(url)
  }

  submitorder(data){
    const url = '/order'
    return this.http.post(url,data)
  }

  getOrders(){
    const url = '/order/own'
    return this.http.get(url)
  }

  getGoodses(goods_id_list){
    const url = '/goods_list?goods_id_list=' + JSON.stringify(goods_id_list)  
    console.log(url)  
    return this.http.get(url)
  }
}

export default new Http()