(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/activities"],{2151:function(t,n,e){"use strict";e.r(n);var i=e("21ac"),a=e("fe58");for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);e("5fed");var o,u=e("f0c5"),r=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);n["default"]=r.exports},"21ac":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}));var i={uniNavBar:function(){return e.e("uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"70e7"))},uniNoticeBar:function(){return e.e("uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar").then(e.bind(null,"2ce4"))},uniSection:function(){return e.e("components/uni-section/uni-section").then(e.bind(null,"b506"))}},a=function(){var t=this,n=t.$createElement;t._self._c},c=[]},"5fed":function(t,n,e){"use strict";var i=e("e146"),a=e.n(i);a.a},"9c0b":function(t,n,e){"use strict";(function(t){e("4a2a");i(e("66fd"));var n=i(e("2151"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},e146:function(t,n,e){},f159:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{current:0,activityId:"",store:{name:"",textColor:"#000000",backgroundColor:"#ddeaf0"},activityInfor:{name:"",notice:"",information:"",time:"",startTime:"",endTime:""},activityPic:[{url:""}],showSet:{intervalTime:1e3,durationTime:500}}},onLoad:function(n){var e=this;this.activityId=n.activityId,console.log("活动信息为：",n.activityId),t.request({url:"http://124.71.170.100/index.php/index/getActivityInfo",method:"GET",data:{activityId:n.activityId},success:function(t){console.log("获取活动信息成功"+t.data.slogan),e.store.name=t.data.merchantNickName,e.activityInfor.notice=t.data.slogan,e.activityInfor.information=t.data.intro,e.activityInfor.startTime=e.changeTime(t.data.startTime),e.activityInfor.endTime=e.changeTime(t.data.endTime),e.activityInfor.name=t.data.activityName,e.activityPic[0].url=t.data.picture,e.activityInfor.time=e.activityInfor.startTime+"~"+e.activityInfor.endTime},fail:function(){console.log("获取活动信息失败")}})},methods:{navigateTo:function(n){t.navigateTo({url:n})},clickButton:function(){t.showToast({title:"参与活动",icon:"none"})},checkTime:function(t){return t<10&&(t="0"+t),t},changeTime:function(t){var n=new Date(1*t),e=n.getFullYear(),i=n.getMonth()+1,a=(t=n.getDate(),n.getDay(),n.getHours()),c=n.getMinutes(),o=n.getSeconds();a=this.checkTime(a),c=this.checkTime(c),o=this.checkTime(o);return e+"-"+i+"-"+t+" "+a+":"+c+":"+o}}};n.default=e}).call(this,e("543d")["default"])},fe58:function(t,n,e){"use strict";e.r(n);var i=e("f159"),a=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=a.a}},[["9c0b","common/runtime","common/vendor"]]]);