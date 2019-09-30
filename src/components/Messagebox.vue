<template>
  <div>
    <div class="msgBox" v-show="showLayout">
      <div class="msgBox-img">
        <img v-if="type=='success'" src="../assets/images/xym/success.png" alt="">
        <img v-else src="../assets/images/xym/error.png" alt="">
      </div>
      <div class="msgBox-p">{{content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'content', 'timestamp'],
  data() {
    return {
      showLayout: true,
      timer: null,
      timeChild: this.timestamp
    }
  },
  mounted() {
    // console.log('子组件执行')
    this.setTimer()
  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearTimeout(this.timer)
    this.timer = null
  },
  methods: {
    setTimer() {
      this.showLayout = true
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.showLayout = false
      }, 2000)
    
    }

  },
  components: {

  },
  watch: {
    timeChild: {
      handler(newVal) {
        this.setTimer()
      },
      deep: true
    }

  }

}
</script>

<style lang="stylus" scoped>
// messagebox
.msgBox{
  position: fixed;
  top: 50%;
  left 50%;
  transform: translate(-50%, -50%);
  background: rgba(51,51,51,0.60);
  border-radius: 4px;
  padding: 16px 20px;
  text-align: center;
  z-index 999;
}
.msgBox-img img{
  width 44px;
}
.msgBox-p{
  font-size: 14px;
  color: #FFFFFF;
  margin-top 6px;
}

</style>
