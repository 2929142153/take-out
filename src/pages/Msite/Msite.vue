<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo1"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to ="userInfo._id ? '/userInfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-icon-"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food"  v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-option"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>

    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from "swiper"
  import "swiper/css/swiper.min.css"

  import HeaderTop from "../../components/HeaderTop/HeaderTop"
  import ShopList from "../../components/ShopList/ShopList"

    export default {
      data(){
      return{
        baseImageUrl:'https:fuss10.elemecdn.com'
      }
    },
      mounted(){
        this.$store.dispatch('getCategorys')
        this.$store.dispatch('getShops')
      },
      computed:{
        ...mapState(['address','categorys' ,'userInfo']),
      /*
      根据categorys一维数组生成一个二维数组
      小数组中的元素个数最大是8
      */
      categorysArr(){
        const {categorys} = this
        //准备空的二维数组
        const arr=[]
        //准备一个小数组（最大长度为8）
        let minArr = []
        //遍历categorys
        categorys.forEach(c =>{
          //如果当前小数组已经满了，创建一个新的
          if(minArr.length === 8){
          minArr = []
        }
        //如果当前minArr是空的，将小数组保存到大数组中
        if(minArr.length === 0){
          arr.push(minArr)
        }
        //将当前分类保存到小数组中
        minArr.push(c)
      })
        return arr
      }
    },
      watch:{
        categorys(value){  //categorys数组中有数据了，在异步更新界面之前执行
        //使用settimeout可以实现效果，但不是最好的
        /*setTimeout(() =>{
          //创建一个swiper实例对象，来实现轮播
          new Swiper('.swiper-container',{
            loop: true, // 循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        },100)*/

        //界面更新就立即创建swiper对象
        this.$nextTick(() =>{  //一旦完成界面更新，立即调用
       //创建一个swiper实例对象，来实现轮播
          new Swiper('.swiper-container',{
            loop: true, // 循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },
      components:{
        HeaderTop,
        ShopList,
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .icon-option
          color: #999;
          font-size: 12px;
          line-height: 20px;
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

  .msite_header
    background-color #55cb4f
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo1
        font-size 25px
        color #fff

    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
        font-size 15px
      .icon-icon-
        font-size 25px
        color #fff
</style>
