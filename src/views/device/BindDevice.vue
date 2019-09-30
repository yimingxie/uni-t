<template>
  <div id="BindDevice">
    <!-- <h1>绑定设备</h1> -->
    <div class="bind-device-wrap">
      <div class="bind-device-nav clearfix">
        <div class="bind-device-nav-a on">
          <span @click="goTo('/bind-device')">设备绑定</span>
          <div class="bind-device-nav-line"></div>
        </div>
        <div class="bind-device-nav-a">
          <span @click="goTo('/device-query')">历史查询</span>
          <div class="bind-device-nav-line"></div>
        </div>
      </div>

      <div class="bind-device-in">
        <div class="bind-device-box">
          <input v-model="devEui" @focus="devEuiInput" @input="devEuiInput" @blur="devEuiBlur" @keyup.enter="setTimer" @change="clearTimer" class="bind-device-input" type="text" placeholder="请填写节点ID">
          <div class="bDevice-operate clearfix" v-show="closeBtn1">
            <div class="bind-device-close" @click="clearVal('devEui')"></div>
          </div>
        </div>
        <div class="bind-device-box">
          <input v-model="nodeID" @focus="nodeIDInput" @input="nodeIDInput" @blur="nodeIDBlur" @keyup.enter="setTimer" class="bind-device-input" type="text" placeholder="请填写设备ID">
          <div class="bDevice-operate clearfix" v-show="closeBtn2">
            <div class="bind-device-close" @click="clearVal('nodeID')"></div>
            <div class="bDevice-operate-line">|</div>
            <div class="bDevice-operate-btn bDevice-operate-btn-ok" @click="setTimer">绑定</div>
          </div>
        </div>
      </div>

      <div class="bind-device-content">
        <div class="bindDevice-no-data" v-if="dataList.length == 0">
          <img src="../../assets/images/xym/box.png" alt="">
          <div class="bindDevice-no-data-h">暂无信息</div>
          <div class="bindDevice-no-data-p">请填写设备ID及节点ID</div>
        </div>
        <div class="bDevice-info" v-else>

          <div class="bDevice-info-title">
            <div class="bDevice-info-title-h">{{dataListNative.devModel}}</div>
            <div class="bDevice-info-title-p">厂商：{{dataListNative.manName}}</div>
          </div>

          <div class="bDevice-info-cb clearfix">
            <div class="bDevice-info-box">
              <div class="bDevice-info-box-h">数据一</div>
              <div class="bDevice-info-box-p">{{dataList[0] !== undefined ? dataList[0].val : '--'}} <span class="bDevice-unit">{{dataList[0] !== undefined ? dataList[0].unit : ''}}</span></div>
              <div class="bDevice-info-box-p" v-if="dataList[0].val1 !== undefined">{{dataList[0] !== undefined ? dataList[0].val1 : '--'}} <span class="bDevice-unit">{{dataList[0] !== undefined ? dataList[0].unit1 : ''}}</span></div>
              
            </div>
            <div class="bDevice-info-box">
              <div class="bDevice-info-box-h">数据二</div>
              <div class="bDevice-info-box-p">{{dataList[1] !== undefined ? dataList[1].val : '--'}} <span class="bDevice-unit">{{dataList[1] !== undefined ? dataList[1].unit : ''}}</span></div>
              <div class="bDevice-info-box-p">{{dataList[1] !== undefined ? dataList[1].val1 : '--'}} <span class="bDevice-unit">{{dataList[1] !== undefined ? dataList[1].unit1 : ''}}</span></div>
            </div>
            <div class="bDevice-info-box">
              <div class="bDevice-info-box-h">数据三</div>
              <div class="bDevice-info-box-p">{{dataList[2] !== undefined ? dataList[2].val : '--'}} <span class="bDevice-unit">{{dataList[2] !== undefined ? dataList[2].unit : ''}}</span></div>
              <div class="bDevice-info-box-p">{{dataList[2] !== undefined ? dataList[2].val1 : '--'}} <span class="bDevice-unit">{{dataList[2] !== undefined ? dataList[2].unit1 : ''}}</span></div>
              
            </div>
            <div class="bDevice-info-box">
              <div class="bDevice-info-box-h">数据四</div>
              <div class="bDevice-info-box-p">{{dataList[3] !== undefined ? dataList[3].val : '--'}} <span class="bDevice-unit">{{dataList[3] !== undefined ? dataList[3].unit : ''}}</span></div>
              <div class="bDevice-info-box-p">{{dataList[3] !== undefined ? dataList[3].val1 : '--'}} <span class="bDevice-unit">{{dataList[3] !== undefined ? dataList[3].unit1 : ''}}</span></div>
            </div>
            <div class="bDevice-info-box">
              <div class="bDevice-info-box-h">数据五</div>
              <div class="bDevice-info-box-p">{{dataList[4] !== undefined ? dataList[4].val : '--'}} <span class="bDevice-unit">{{dataList[4] !== undefined ? dataList[4].unit : ''}}</span></div>
              <div class="bDevice-info-box-p">{{dataList[4] !== undefined ? dataList[4].val1 : '--'}} <span class="bDevice-unit">{{dataList[4] !== undefined ? dataList[4].unit1 : ''}}</span></div>
            </div>
            <div class="bDevice-info-box">
              <div class="bDevice-info-box-h">信号强度</div>
              <div class="bDevice-info-box-p">{{dataList[5] !== undefined ? dataList[5].rssi : '--'}} <span class="bDevice-unit">dbm</span></div>
            </div>
            <div class="bDevice-info-box">
              <div class="bDevice-info-box-h">信噪比</div>
              <div class="bDevice-info-box-p">{{dataListNative.snr !== undefined ? dataListNative.snr : '--'}}</div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- 底部 -->
    <div class="bindDevice-footer">
      <div class="bindDevice-footer-logo">
        <img src="../../assets/images/xym/footer-logo.png" alt="">
      </div>
      <div class="bindDevice-footer-op">
        <div class="bindDevice-footer-op-wrap clearfix">
          <div class="bindDevice-footer-btn bindDevice-footer-btn-red" @click="reset">RESET</div>
          <div class="bindDevice-footer-btn bindDevice-footer-btn-white" @click="submit">PASS</div>
        </div>
      </div>
    </div>


    <!-- 密码框 -->
    <div class="password-layout" v-show="passwordLayout">
      <div class="password-layout-bg" @click="closeLayout"></div>
      <div class="password-layout-content">
        <div class="bind-device-close" @click="closeLayout" style="float: none; position: absolute; top: 0; right: 0;"></div>
        <div class="password-layout-img">
          <img src="../../assets/images/xym/change.png" alt="">
        </div>
        <div class="password-layout-p" id="password-layout-p">
          该节点ID已绑定设备
          <br>
          若需绑定新的设备
          <br>
          请输入密码
        </div>
        <!-- <input style="display: none" type="text" v-model="testModel" @change="testChange"> -->
        <div class="password-layout-enter">
          <input id="password-input" ref="password-input" v-model="password" @input="passwordChart" class="password-layout-input" type="number">
          <div class="pLayout-sb">
            <div class="pLayout-span" v-for="(item, i) in spanList" :key="i">{{item.val}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- messagebox 调用记得清空名字 -->
    <component :is="componentName" :type="msgType" :content="msgContent" :timestamp="Date.now()"></component>


  </div>
</template>

<script>
import http from '../../utils/http.js'
import api from '../../api'
import xymFun from '../../utils/xymFun'
import Messagebox from '../../components/Messagebox'
export default {
  data() {
    return {
      devEui: '',
      nodeID: '',
      testModel: '',
      componentName: '',
      msgContent: '',
      msgType: '',
      closeBtn1: false,
      closeBtn2: false,
      timer: null,
      dataList: [],
      dataListNative: [],
      spanList: [
        {val: ''},
        {val: ''},
        {val: ''},
        {val: ''},
        {val: ''},
        {val: ''},
      ],
      password: '',
      passwordLayout: false,
      allowPass: false,

    }
  },
  mounted() {
    // 调用messagebox组件，记得清空name
    // this.componentName = 'messagebox'
    // this.msgType = 'success'
    // this.msgContent = '绑定成功'
  },

  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.timer)
    this.timer = null
  },

  methods: {
    // 开启定时器
    setTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.getDeviceInfo()
      this.timer = setInterval(() => {
        this.getDeviceInfo()
      }, 2000)
    },

    // 关闭定时器
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },

    // 获取设备信息
    getDeviceInfo() {
      const that = this
      // http://iot.gidomino.com/puffer/v1/devInfo/8cf957200000dec4
      // http://192.168.100.89:8066/puffer/v1/devInfo/aabb009

      this.allowPass = false
      api.bindDevice.getDeviceInfo(this.devEui).then(res => {
        this.dataListNative = []
        this.dataList = []

        console.log('设备信息', res.data)
        if (res.data.code != 200) {
          this.componentName = ''
          this.allowPass = false
          setTimeout(() => {
            this.componentName = 'messagebox'
            this.msgType = 'error'
            this.msgContent = '设备不存在'
          }, 10)
          // 关闭定时器
          clearInterval(this.timer)
          this.timer = null
          return
        }

        if (res.data.code == 200 && res.data.data == null) {
          this.componentName = ''
          this.allowPass = true
          setTimeout(() => {
            this.componentName = 'messagebox'
            this.msgType = 'error'
            this.msgContent = '设备暂无数据'
          }, 10)
          return
        }


        this.allowPass = true
        this.dataListNative = res.data.data

        // res.data.data.datas.forEach((item, i) => {
        //   let tempObj = {
        //     val: item.toFixed(2),
        //     unit: res.data.data.unit
        //   }
        //   this.dataList.push(tempObj)
        // })

        res.data.data.datas.forEach((item, i) => {
          let valueFormat = item + ''
          let tempObj = {}

          if (valueFormat.substring(0,2).indexOf('0x') === 0) {
            var unit = res.data.data.unit ? res.data.data.unit : ''
            tempObj = {
              val: valueFormat,
              unit: unit === 'null' ? '' : res.data.data.unit
            }
          } else {
            var unit = res.data.data.unit ? res.data.data.unit : ''
            tempObj = {
              val: parseFloat(item).toFixed(2),
              unit: unit === 'null' ? '' : res.data.data.unit
            }
          }
          this.dataList.push(tempObj)
        })



        if (res.data.data.datas1 !== undefined) {
          res.data.data.datas1.forEach((item, i) => {
            let valueFormat = item + ''
            let tempObj = {}
            if (valueFormat.indexOf('0x')) {
              this.dataList[i].val1 = valueFormat
              this.dataList[i].unit1 = res.data.data.unit1 === 'null' ? '' : res.data.data.unit1
            } else {
              this.dataList[i].val1 = parseFloat(item).toFixed(2)
              this.dataList[i].unit1 = res.data.data.unit1 === 'null' ? '' : res.data.data.unit1
            }
          })
        }
        // 信号强度
        this.dataList.push({
          rssi: res.data.data.rssi
        })
        if (res.data.data.rssi1 !== undefined) {
          this.dataList[5].rssi1 = res.data.data.rssi1
        }

        console.log('this.dataList详情', this.dataList)
      })
    },

    // 改devEui
    devEuiInput() {
      if (this.devEui !== '') {
        this.closeBtn1 = true
      }
    },

    // devEui失去焦点
    devEuiBlur() {
      setTimeout(() => {
        this.closeBtn1 = false
      }, 300)
    },

    // 修改节点ID
    nodeIDInput() {
      if (this.nodeID !== '') {
        this.closeBtn2 = true
      }
    },

    // devEui失去焦点
    nodeIDBlur() {
      setTimeout(() => {
        this.closeBtn2 = false
      }, 300)
    },

    // 清空
    clearVal(inputName) {
      this[inputName] = ''
      // 关闭定时器
      clearInterval(this.timer)
      this.timer = null
    },

    // 分割密码框字符
    passwordChart() {
      // console.log('密码', this.password.charAt(0))
      this.spanList.forEach(item => {
        item.val = ''
      })
      if (this.password.length <= 0) return
      // 发送请求，提交密码
      if (this.password.length == 6) {
        console.log('发送请求', this.password.substring(0,4))

        let password = this.password.substring(0,6)
        let param = {
          "devEui": this.devEui,
          "devSn": this.nodeID,
          "devModel": this.dataListNative.devModel,
          "devName": this.dataListNative.devName,
          "manId": this.dataListNative.manId,
          "password": password,
          "acc": "unitadmin=="
        }
        console.log('passwordParam', param)
        api.bindDevice.passDevice(param).then(res => {
          console.log('res.pass', res.data)

          this.closeLayout()

          if (res.data.code == 200) {
            this.componentName = ''
            setTimeout(() => {
              this.componentName = 'messagebox'
              this.msgType = 'success'
              this.msgContent = '绑定成功'
            }, 10)
          } else if (res.data.code == 40004001) {
            this.componentName = ''
            setTimeout(() => {
              this.componentName = 'messagebox'
              this.msgType = 'error'
              this.msgContent = '设备不存在'
            }, 10)
          } else if (res.data.code == 40004007) {
            this.componentName = ''
            setTimeout(() => {
              this.componentName = 'messagebox'
              this.msgType = 'error'
              this.msgContent = '设备已绑定'
            }, 10)
          } else if (res.data.code == 40004020) {
            this.componentName = ''
            setTimeout(() => {
              this.componentName = 'messagebox'
              this.msgType = 'error'
              this.msgContent = '设备SN已绑定'
            }, 10)
          } else if (res.data.code == 40001015) {
            this.componentName = ''
            setTimeout(() => {
              this.componentName = 'messagebox'
              this.msgType = 'error'
              this.msgContent = '密码错误'
            }, 10)
          } else {
            this.componentName = ''
            setTimeout(() => {
              this.componentName = 'messagebox'
              this.msgType = 'error'
              this.msgContent = '未知错误'
            }, 10)
          }
          
        })


      }
      
      for (let i = 0; i < this.password.length; i ++) {
        this.spanList[i].val = this.password.charAt(i)
      }
    },

    // 关闭密码框
    closeLayout() {
      this.password = ''
      this.passwordChart()
      this.passwordLayout = false
    },

    // 跳转
    goTo(pathParam) {
      this.$router.push({
        path: pathParam
      })
    },

    // 重置
    reset() {
      this.clearVal('devEui')
      this.clearVal('nodeID')
      this.dataListNative = []
      this.dataList = []
    },



    // PASS，如果已绑定，则弹出密码框
    submit() {
      const that = this
      if (!this.allowPass) {
        this.componentName = ''
        setTimeout(() => {
          this.componentName = 'messagebox'
          this.msgType = 'error'
          this.msgContent = '请输入设备ID和节点ID后点击绑定'
        }, 10)
        return
      }
      let param = {
        "devEui": this.devEui,
        "devSn": this.nodeID,
        "devModel": this.dataListNative.devModel,
        "devName": this.dataListNative.devName,
        "manId": this.dataListNative.manId,
        "acc": "unitadmin=="
      }
      api.bindDevice.passDevice(param).then(res => {
        console.log('pass', res.data)
        if (res.data.code == 200) {
          this.componentName = ''
          setTimeout(() => {
            this.componentName = 'messagebox'
            this.msgType = 'success'
            this.msgContent = '绑定成功'
          }, 10)
          return
        }
        // 已绑定，则弹出密码框
        else {
          // 弹出密码框
          this.password = ''
          this.passwordLayout = true
          setTimeout(() => {
            document.getElementById('password-input').focus()
          }, 300)

        }
      })


      


    
    },

    testChange() {
      console.log('change')
      document.getElementById('password-input').focus()
    },

    

  },
  components: {
    'messagebox': Messagebox

  }
}
</script>

<style lang="stylus" scoped>
#BindDevice{
  @import '../../assets/stylus/xymStyle.styl'


}

</style>
