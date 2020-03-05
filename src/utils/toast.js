import { Toast } from 'vant'


class MTToast{
  success(message){
    Toast.success(message ? message : '恭喜，操作成功！')
  }

  fail(message){
    Toast.fail(message ? message : '抱歉，操作失败！')
  }

  text(message){
    Toast.text(message)
  }

  loading(message){
    Toast.loading(message ? message : '正在加载...')
  }

  close(){
    Toast.clear()
  }
}

export default new MTToast()