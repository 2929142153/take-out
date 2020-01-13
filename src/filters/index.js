
import moment from 'moment'
//import format from 'date-fns/format'
import Vue from 'vue'
//自定义过滤器
Vue.filter('dateString', function (value, format) {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})
