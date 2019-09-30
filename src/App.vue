<template>
  <div id="page-container">
    <div id="" class="" :key="appKey">
      <div class="">

        <!-- Start: 路由视图 -->
        <transition name="view" mode="out-in">
          <keep-alive>
            <router-view ></router-view>
          </keep-alive>
        </transition>
        <!-- End: 路由视图 -->

      </div>
      
    </div>
    
  </div>
</template>

<script>
  import api from 'api'

  export default {
    name: 'App',
    data () {
      return {
        appKey: 1, // 监听地址栏参数
        title:'电梯行业监管战情室',

      }
    },
    components: {
    },

    watch:{
      $route(to,from){ //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
        if (localStorage.getItem('theme')) {
          this.changeTheme(localStorage.getItem('theme'))
        }
        this.appKey = new Date().getTime(); // 监听地址栏参数变化


        // if(to.name=='Login' || to.name=='lift-print' || to.name=='panel-test'){
        //   this.$store.commit('SWITCH_LAYOUT', 'auth')
          
        //   // console.log('layout====' + this.layout)
        // } else{
        //   this.$store.commit('SWITCH_LAYOUT', 'admin')
        // }
      },


    },
        
    created(){
    },

    mounted () {
      let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme1'
      this.changeTheme(theme)
      
    },

    methods: {
      changeTheme (theme) {
        document.getElementById("page-container").setAttribute('class', theme)
        localStorage.setItem('theme', theme)
      },
    }
  }
</script>

<style lang="stylus">
// 配置
@import 'assets/stylus/base'
// -------------------------------------------------------
#page-container{

}

@media screen and (min-width: 760px) {
  #page-container{
    width 760px;
    margin 0 auto;
  }
  
}

</style>

