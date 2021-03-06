import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const shoppingcart = r => require.ensure([], () => r(require('../page/cart/shoppingcart')), 'shoppingcart')





// 测试页面
const loginn = r => require.ensure([], () => r(require('../page/login/login.1')), 'login.1')
const test = r => require.ensure([], () => r(require('../page/search/children/test')), 'test')


export default [{
  path: '/',
  component: App,//顶级路由，对应index.html
  children: [     //二级路由，对应App.vue
    //地址为空跳转到home页面
    {
      path: '',
      // redirect: '/home'
      redirect: '/msite'
    },
    //首页城市列表页，选择所在城市
    {
      path: '/home',
      component: home
    },
    //当前选择城市页面
    {
      path: '/city/:cityid',
      component: city
    },
    //所有商铺列表页
    {
      path: '/msite',
      meta: { title: "饿了么" },
      component: msite
    },
    //查找页面
    {
      path: '/search',
      meta: { title: "搜索" },
      component: search,
      children:[
        // 测试
        {
        path:'test',
        component: test
      }]
    },
    //我的订单
    {
      path: '/order',
      meta: { title: "订单" },
      component: order
    },
    //我的
    {
      name: 'profile',
      path: '/profile',
      meta: { title: "我的" },
      component: profile,
      children: [{
        name: 'info',
        path: 'info',
        meta: { title: "我的信息" },
        component: info,
      }]
    },
    // 登录注册页面
    {
      path: '/login',
      component: login
    },
    // 商铺页
    {
      name:'shop',
      path: '/shop',
      component: shop
    },
    {
      name:'shoppingcart',
      path: '/shoppingcart',
      component: shoppingcart
    },
    // 测试页面
    {
      path: '/loginn',
      component: loginn
    },
  ]

}]
