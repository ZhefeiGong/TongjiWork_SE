(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/store"],{"22ef":function(t,a,e){"use strict";(function(t){e("4a2a");i(e("66fd"));var a=i(e("e782"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(a.default)}).call(this,e("543d")["createPage"])},"2a20":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{contenDown:{contentnomore:"没有更多菜品啦"},current:0,userId:"",isCanteen:"",id:"",nickName:"",address:"",merchantStatus:"",tel:"",intro:"",activityList:[],categoryList:[],pictureList:[],dishList:[],isFavoured:""}},onLoad:function(a){var e=this;this.id=a.id,console.log("商家id："+this.id),t.getStorage({key:"userInfo",success:function(i){e.userId=i.data.id,"1"==a.isCanteen?t.request({url:"http://124.71.170.100/index.php/index/getOneCanteenInfo",method:"GET",data:{canteenId:e.id,userId:e.userId},success:function(t){console.log(t),e.isCanteen=t.data.data.isCanteen,e.isFavoured=t.data.data.isFavoured,e.merchantStatus="1",e.nickName=t.data.data.nickName,e.address=t.data.data.address,e.tel=t.data.data.tel,e.intro=t.data.data.intro,e.activityList=t.data.data.activityList,e.pictureList=t.data.data.pictureList,e.dishList=t.data.data.dishList,e.setCategory(t)},fail:function(){console.log("获取食堂失败")}}):t.request({url:"http://124.71.170.100/index.php/index/getMerchant",method:"GET",data:{merchantId:e.id,userId:e.userId},success:function(t){console.log(t),e.merchantStatus=t.data.data.status,e.isCanteen="0",e.isFavoured=t.data.data.isFavoured,e.nickName=t.data.data.nickName,e.address=t.data.data.address,e.tel=t.data.data.tel,e.intro=t.data.data.intro,e.activityList=t.data.data.activityList,e.pictureList=t.data.data.pictureList,e.categoryList=t.data.data.categoryList,e.dishList=t.data.data.dishList},fail:function(){console.log("获取商家失败")}})}})},methods:{setCategory:function(a){var e=this;t.request({url:"http://124.71.170.100/index.php/index/getCategory",method:"GET",success:function(t){console.log(t.data.data.TotalCategoryList);for(var i=t.data.data.TotalCategoryList,n=0;n<a.data.data.categoryList.length;n++)e.categoryList.push(i[Number(a.data.data.categoryList[n])-2])}})},dishClick:function(a){console.log(this.dishList[a].dishName+"被点击了"),t.navigateTo({url:"/pages/index/dish?dishId="+this.dishList[a].dishId+"&isCanteen="+this.isCanteen})},activityClick:function(a){console.log(this.activityList[a].activityName+"被点击了"),t.navigateTo({url:"/pages/index/activities?activityId="+this.activityList[a].activityId})},updateDish:function(){t.navigateTo({url:"/pages/index/update-dish?merchantId="+this.id})},collectStore:function(){var a=this;0==this.isFavoured?(this.isFavoured=1,t.request({url:"http://124.71.170.100/index.php/index/favourStore",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{storeId:this.id,id:this.userId},success:function(e){console.log("关注商家"),console.log(e),console.log(a.id),console.log(a.userId),t.getStorage({key:"userInfo",success:function(a){t.setStorage({key:"userInfo",data:{id:a.data.id,nickName:a.data.nickName,identity:a.data.identity,status:a.data.status,schoolName:a.data.schoolName,schoolId:a.data.schoolId,avatarUrl:a.data.avatarUrl,favouredStoreNum:a.data.favouredStoreNum+1,followerNum:a.data.followerNum,followingNum:a.data.followingNum}})}})}})):0!=this.isFavoured&&(this.isFavoured=0,t.request({url:"http://124.71.170.100/index.php/index/cancelFavourStore",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{storeId:this.id,id:this.userId},success:function(){console.log("取消关注"),t.getStorage({key:"userInfo",success:function(a){t.setStorage({key:"userInfo",data:{id:a.data.id,nickName:a.data.nickName,identity:a.data.identity,status:a.data.status,schoolName:a.data.schoolName,schoolId:a.data.schoolId,avatarUrl:a.data.avatarUrl,favouredStoreNum:a.data.favouredStoreNum-1,followerNum:a.data.followerNum,followingNum:a.data.followingNum}})}})}}))},chat:function(){t.navigateTo({url:"/pages/message/chat?id="+this.userId+"&otherUserId="+this.id})},tipof:function(){t.navigateTo({url:"/pages/home/tip-of?id="+this.id+"&nickName="+this.nickName})},progressImgClick:function(a){var e=this;t.previewImage({urls:a,longPressActions:{itemList:["保存图片"],success:function(a){t.downloadFile({url:e.progress_imgs[a.index],success:function(a){200===a.statusCode&&t.saveImageToPhotosAlbum({filePath:a.tempFilePath,success:function(){t.showToast({title:"保存成功",icon:"success"})},fail:function(){t.showToast({title:"保存失败，请稍后重试",icon:"none"})}})}})},fail:function(t){console.log(t.errMsg)}}})}}};a.default=e}).call(this,e("543d")["default"])},3550:function(t,a,e){"use strict";e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}));var i={uniSection:function(){return e.e("components/uni-section/uni-section").then(e.bind(null,"b506"))},uniGroup:function(){return e.e("uni_modules/uni-group/components/uni-group/uni-group").then(e.bind(null,"74d5"))},uniCard:function(){return e.e("uni_modules/uni-card/components/uni-card/uni-card").then(e.bind(null,"1a0f"))},uniLoadMore:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(e.bind(null,"b4b9"))}},n=function(){var t=this,a=t.$createElement;t._self._c},o=[]},"3f63":function(t,a,e){"use strict";var i=e("912a"),n=e.n(i);n.a},"912a":function(t,a,e){},c9fd:function(t,a,e){"use strict";e.r(a);var i=e("2a20"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},e782:function(t,a,e){"use strict";e.r(a);var i=e("3550"),n=e("c9fd");for(var o in n)"default"!==o&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("3f63");var s,d=e("f0c5"),u=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);a["default"]=u.exports}},[["22ef","common/runtime","common/vendor"]]]);