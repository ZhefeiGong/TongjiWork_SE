(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/admin/manage"],{"026c":function(n,e,t){},1194:function(n,e,t){"use strict";(function(n){t("4a2a");a(t("66fd"));var e=a(t("fbdd"));function a(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},"28f0":function(n,e,t){"use strict";var a=t("026c"),o=t.n(a);o.a},3275:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{identity:0,active:"",animate:"zoomIn",height:"",tabbarHeight:"",tabbar_admin:[{name:"index",text:"首页",icon:"../../static/icons/rank.png"},{name:"manage",text:"管理",icon:"../../static/icons/cube-active.png"},{name:"canteen",text:"食堂",icon:"../../static/icons/edit.png"}]}},onShow:function(){wx.hideHomeButton()},onLoad:function(){this.identity=0},onPullDownRefresh:function(){console.log("refresh");var e=this;setTimeout((function(){e.refresh("1"),n.stopPullDownRefresh()}),1e3)},methods:{handleChange:function(e){if(console.log("change::",e),0==this.identity)switch(e.name){case"index":n.redirectTo({url:"../index/index"});break;case"canteen":n.redirectTo({url:"../canteen/canteenList"});break;default:break}},setAppeal:function(){console.log("appeal"),n.navigateTo({url:"appealList"})},setAct:function(){console.log("act"),n.navigateTo({url:"activityList"})},setTipofUser:function(){console.log("user"),n.navigateTo({url:"tipofUser"})},setTipofComment:function(){console.log("comment"),n.navigateTo({url:"tipofComment"})}}};e.default=t}).call(this,t("543d")["default"])},"4ceb":function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return a}));var a={lbTabbar:function(){return Promise.all([t.e("common/vendor"),t.e("components/lb-tabbar/lb-tabbar")]).then(t.bind(null,"b226"))},lbTabbarItem:function(){return Promise.all([t.e("common/vendor"),t.e("components/lb-tabbar/lb-tabbar-item")]).then(t.bind(null,"26a2"))}},o=function(){var n=this,e=n.$createElement;n._self._c},i=[]},a955:function(n,e,t){"use strict";t.r(e);var a=t("3275"),o=t.n(a);for(var i in a)"default"!==i&&function(n){t.d(e,n,(function(){return a[n]}))}(i);e["default"]=o.a},fbdd:function(n,e,t){"use strict";t.r(e);var a=t("4ceb"),o=t("a955");for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);t("28f0");var c,r=t("f0c5"),u=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=u.exports}},[["1194","common/runtime","common/vendor"]]]);