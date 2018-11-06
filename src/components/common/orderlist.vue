<template>
    <div class="orderlist">
        <ul class="order_list_ul">
            <li class="order_list_li" v-for="item in orderList" :key="item.id">
                <img :src="item.res_img_url" alt="" class="res_img">
                <section class="order_item_right">
                    <section>
                        <header class="order_item_right_header">
                            <section class="order_header">
                                <h4>
                                    <span class="ellipsis">{{item.res_name}}</span>
                                    <svg fill="#333" class="arrow_right">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                    </svg>
                                </h4>
                                <p class="order_time">{{item.formatted_created_at}}</p>
                            </section>
                            <p class="order_status">{{item.status_bar.title}}</p>
                        </header>
                        <section class="order_basket">
                            <p class="order_name ellipsis">{{item.basket.group[0][0].name}}等{{item.basket.group[0].length}}件商品</p>
                            <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
                        </section>
                    </section>
                    <div class="order_again">
                        <router-link to="/" tag="span" class="buy_again">再来一单</router-link>
                        <router-link to="/" tag="span" class="evaluate" v-if="item.operation_rate">评价得金币</router-link>
                    </div>
                </section>
            </li>       
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      //basket  deliver_fee配送费  extra 优惠信息  group 商品列表
      orderList: [
        // {
        //   id: 1, //id
        //   basket: {
        //     abandoned_extra: [],
        //     conditional_extra: [],
        //     deliver_fee: {
        //       category_id: 2,
        //       name: "配送费",
        //       price: 2,
        //       quantity: 1
        //     },
        //     extra: [
        //       {
        //         category_id: 11,
        //         name: "单品折扣",
        //         price: -3.8,
        //         quantity: 1
        //       }
        //     ],
        //     group: [
        //       [
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "小芋圆",
        //           new_specs: [],
        //           price: 3,
        //           quantity: 1,
        //           specs: []
        //         },
        //         {
        //           attrs: [
        //             {
        //               name: "温度",
        //               value: "去冰"
        //             },
        //             {
        //               name: "甜度",
        //               value: "标准糖"
        //             }
        //           ],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "珍珠奶绿-大杯",
        //           new_specs: [
        //             {
        //               name: "规格",
        //               value: "大杯"
        //             }
        //           ],
        //           price: 19,
        //           quantity: 1,
        //           specs: ["大杯"]
        //         }
        //       ]
        //     ],
        //     package_group: [],
        //     pindan_map: [],
        //     tying_group: []
        //   }, //商品
        //   res_img_url: "../../static/img/order/1.png", //店铺图片
        //   res_name: "耕喜台湾水果茶(青年路店)", // 店铺名
        //   status_bar: {
        //     color: "black",
        //     image_type: "completion_order",
        //     is_highlight: 0,
        //     sub_title: "",
        //     title: "订单已送达" //订单状态
        //   },
        //   status_code: 11,
        //   total_amount: 20.2, //总价
        //   formatted_created_at: "2018-11-02 13:15",
        //   operation_rate: 1 //是否评价
        // },
        // {
        //   id: 2, //id
        //   basket: {
        //     abandoned_extra: [],
        //     conditional_extra: [],
        //     deliver_fee: {
        //       category_id: 2,
        //       name: "配送费",
        //       price: 3,
        //       quantity: 1
        //     }, //配送费
        //     extra: [
        //       {
        //         category_id: 12,
        //         name: "在线支付立减优惠",
        //         price: -5,
        //         quantity: 1
        //       },
        //       { category_id: 15, name: "店铺红包", price: -4, quantity: 1 }
        //     ], //优惠信息
        //     group: [
        //       [
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "宽粉",
        //           new_specs: [],
        //           price: 3,
        //           quantity: 1,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "加糖",
        //           new_specs: [],
        //           price: 0,
        //           quantity: 1,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "土豆片",
        //           new_specs: [],
        //           price: 3,
        //           quantity: 1,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "年糕片",
        //           new_specs: [],
        //           price: 3,
        //           quantity: 1,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "鱼豆腐",
        //           new_specs: [],
        //           price: 2.5,
        //           quantity: 1,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "五常稻花香米",
        //           new_specs: [],
        //           price: 4,
        //           quantity: 1,
        //           specs: []
        //         }
        //       ]
        //     ],
        //     package_group: [],
        //     pindan_map: [],
        //     tying_group: []
        //   }, //商品
        //   res_img_url: "../../static/img/order/2.jpeg", //店铺图片
        //   res_name: "东北麻辣烫", // 店铺名
        //   status_bar: {
        //     color: "black",
        //     image_type: "completion_order",
        //     is_highlight: 0,
        //     sub_title: "",
        //     title: "订单已送达" //订单状态
        //   },
        //   status_code: 11,
        //   total_amount: 6.5, //总价
        //   formatted_created_at: "2018-11-02 13:15",
        //   operation_rate: 0 //是否评价
        // },
        // {
        //   id: 3, //id
        //   basket: {
        //     abandoned_extra: [],
        //     conditional_extra: [],
        //     deliver_fee: {
        //       category_id: 2,
        //       name: "配送费",
        //       price: 3,
        //       quantity: 1
        //     }, //配送费
        //     extra: [
        //       {
        //         category_id: 12,
        //         name: "在线支付立减优惠",
        //         price: -10,
        //         quantity: 1
        //       },
        //       { category_id: 15, name: "店铺红包", price: -5, quantity: 1 }
        //     ], //优惠信息
        //     group: [
        //       [
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "土豆",
        //           new_specs: [],
        //           price: 4,
        //           quantity: 3,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "奶香小馒头",
        //           new_specs: [],
        //           price: 3,
        //           quantity: 3,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "鸡翅",
        //           new_specs: [],
        //           price: 5,
        //           quantity: 2,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "羊肉串",
        //           new_specs: [],
        //           price: 4,
        //           quantity: 2,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "望京小腰",
        //           new_specs: [],
        //           price: 2.5,
        //           quantity: 4,
        //           specs: []
        //         },
        //         {
        //           attrs: [],
        //           image_hash: "",
        //           ingredient_items: [],
        //           name: "可口可乐",
        //           new_specs: [],
        //           price: 4,
        //           quantity: 2,
        //           specs: []
        //         }
        //       ]
        //     ],
        //     package_group: [],
        //     pindan_map: [],
        //     tying_group: []
        //   }, //商品
        //   res_img_url: "../../static/img/order/3.jpeg", //店铺图片
        //   res_name: "地地道道", // 店铺名
        //   status_bar: {
        //     color: "black",
        //     image_type: "completion_order",
        //     is_highlight: 0,
        //     sub_title: "",
        //     title: "订单已送达" //订单状态
        //   },
        //   status_code: 11,
        //   total_amount: 40.0, //总价
        //   formatted_created_at: "2018-11-02 13:15",
        //   operation_rate: 0 //是否评价
        // }
      ]
    };
  },
  mounted() {
    axios.get("/static/json/orderlist.json").then(res => {
      this.orderList = res.data;
    });
  },
};
</script>
<style lang="scss">
@import "../../style/mixin";
.orderlist {
  padding-top: 1.9rem;
  padding-bottom: 1.9rem;
}
.order_list_li {
  // @include wh(100%, 5.55em);
  width: 100%;
  background: $fc;
  display: flex;
  margin: 0.433rem 0 0.5rem;
  padding: 0.6rem 0.6rem 0.2rem;
  .res_img {
    @include wh(2rem, 2rem);
    margin-right: 0.4rem;
  }
  .order_item_right {
    flex: 5;
    .order_item_right_header {
      border-bottom: 0.025rem solid #f5f5f5;
      padding-bottom: 0.3rem;
      @include fj;
      .order_header {
        h4 {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          @include sc(0.75rem, #333);
          line-height: 1rem;
          width: 9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .arrow_right {
            @include wh(0.4rem, 0.4rem);
            fill: #ccc;
            margin-left: 0.3rem;
          }
        }
        .order_time {
          @include sc(0.55rem, #999);
          line-height: 0.8rem;
        }
      }
      .order_status {
        @include sc(0.6rem, #333);
      }
    }
    .order_basket {
      @include fj;
      line-height: 2rem;
      border-bottom: 0.025rem solid #f5f5f5;
      .order_name {
        @include sc(0.55rem, #666);
        max-width: 10rem;
      }
      .order_amount {
        @include sc(0.55rem, #666);
        font-weight: bold;
      }
    }
    .order_again {
      text-align: right;
      line-height: 1.6rem;
      .buy_again,
      .evaluate {
        @include sc(0.55rem, #3190e8);
        border: 0.025rem solid #3190e8;
        padding: 0.25rem 0.5rem;
        border-radius: 0.1rem;
      }
      .evaluate {
        @include sc(0.55rem, #ff5339);
        border: 0.025rem solid #ff5339;
      }
    }
  }
}
</style>
