webpackJsonp([4],{"9zw/":function(t,s,r){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=r("ra3+"),a=r("dqtu"),i={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"orderlist"},[r("ul",{staticClass:"order_list_ul"},t._l(t.orderList,function(s){return r("li",{key:s.id,staticClass:"order_list_li"},[r("img",{staticClass:"res_img",attrs:{src:s.res_img_url,alt:""}}),t._v(" "),r("section",{staticClass:"order_item_right"},[r("section",[r("header",{staticClass:"order_item_right_header"},[r("section",{staticClass:"order_header"},[r("h4",[r("span",{staticClass:"ellipsis"},[t._v(t._s(s.res_name))]),t._v(" "),r("svg",{staticClass:"arrow_right",attrs:{fill:"#333"}},[r("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#arrow-right"}})])]),t._v(" "),r("p",{staticClass:"order_time"},[t._v(t._s(s.formatted_created_at))])]),t._v(" "),r("p",{staticClass:"order_status"},[t._v(t._s(s.status_bar.title))])]),t._v(" "),r("section",{staticClass:"order_basket"},[r("p",{staticClass:"order_name ellipsis"},[t._v(t._s(s.basket.group[0][0].name)+"等"+t._s(s.basket.group[0].length)+"件商品")]),t._v(" "),r("p",{staticClass:"order_amount"},[t._v("¥"+t._s(s.total_amount.toFixed(2)))])])]),t._v(" "),r("div",{staticClass:"order_again"},[r("router-link",{staticClass:"buy_again",attrs:{to:"/",tag:"span"}},[t._v("再来一单")]),t._v(" "),s.operation_rate?r("router-link",{staticClass:"evaluate",attrs:{to:"/",tag:"span"}},[t._v("评价得金币")]):t._e()],1)])])}))])},staticRenderFns:[]};var n=r("VU/8")({data:function(){return{orderList:[]}},mounted:function(){var t=this;this.$axios.get("/static/json/orderlist.json").then(function(s){t.orderList=s.data})}},i,!1,function(t){r("LPoe")},null,null).exports,o=r("NYxO"),l=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var r=arguments[s];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t},_={data:function(){return{}},components:{headerBar:e.a,footerBar:a.a,orderList:n},computed:l({},Object(o.b)(["userInfo"]))},c={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("header-bar",{attrs:{"head-title":"我的订单",goBack:"true"}}),this._v(" "),this.userInfo?s("order-list"):s("section",{staticClass:"no_login"},[s("img",{attrs:{src:r("HQy5"),alt:""}}),this._v(" "),s("h3",[this._v("登录后查看外卖订单")]),this._v(" "),s("router-link",{attrs:{to:"/login",tag:"button"}},[this._v("立即登录")])],1),this._v(" "),s("footer-bar")],1)},staticRenderFns:[]};var u=r("VU/8")(_,c,!1,function(t){r("NQoQ")},null,null);s.default=u.exports},HQy5:function(t,s,r){t.exports=r.p+"static/img/order.d607000.png"},LPoe:function(t,s){},NQoQ:function(t,s){}});
//# sourceMappingURL=4.ac0b273b8e4ad55e626e.js.map