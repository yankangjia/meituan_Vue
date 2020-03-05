<style scoped>
.submit-btn >>> .van-button__text{
  font-size: 18px;
}
</style>

<style lang="scss" scoped>
.login-group{
  padding: 20px;
  .logo-group{
    width: 100%;
    height: 200px;
    background-image: url("http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/7a5ff05b334e0debdd10954a7f5d4789.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 66px;
  }
  .submit-btn{
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="login-group">
    <div class="logo-group"></div>
    <van-cell-group>
      <van-field v-model="telephone" placeholder="请输入手机号" />
      <van-field
        v-model="smscode"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="default" :disabled="smsCodeButtonDisabled" @click="sendSmsCode">{{sendtext}}</van-button>
      </van-field>
      <van-button type="primary" block class="submit-btn" :disabled="submitButtonDisabled" @click="onLogin">登 录</van-button>
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import { CellGroup, Field, Button, Toast } from 'vant';
  export default {
    name: "Login",
    data: function(){
      return {
        telephone: '',
        smscode: '',
        sendtext: "发送验证码",
        timeout: 0
      }
    },
    components: {
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Button.name]: Button,
      [Toast.name]: Toast
    },
    computed: {
      smsCodeButtonDisabled(){
        if(!this.telephone.match(/^1[3456789]\d{9}$/) || this.timeout > 0){
          return true
        } else{
          return false
        }
      },
      submitButtonDisabled(){
        if(!this.telephone.match(/^1[3456789]\d{9}$/) || !this.smscode.match(/^\d{4}$/)){
          return true
        } else{
          return false
        }
      }
    },
    methods: {
      // 发送短信验证码
      sendSmsCode(){
        this.$http.getSmsCode(this.telephone).then(() => {
          Toast("验证码发送成功")
          this.timeout = 60
          let interval = setInterval(() => {
            this.timeout--
            this.sendtext = this.timeout + "s后重新发送"
            if(this.timeout <= 0){
              clearInterval(interval)
              this.sendtext = "发送验证码"
            }
          }, 1000);
        }).catch(err => {
          window.console.log(err)
        })
      },
      // 登录
      onLogin(){
        const data = {
          telephone: this.telephone,
          smscode: this.smscode
        }
        this.$http.login(data).then(res => {
          const data = res.data
          const user = data.user
          const token = data.token
          this.$auth.setUserToken(user,token)
          const from = this.$route.query['from']
          if(from){
            this.$router.push(from)
          } else{
            this.$router.replace('/')
          }
        }).catch(err => {
          window.console.log(err)
        })
      }
    }
  }
</script>