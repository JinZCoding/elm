export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADD_CART = 'ADD_CART'
export const REDUCE_CART = 'REDUCE_CART'
export const CLEAR_CATR = 'CLEAR_CATR'

export default ({
    // 登录
    [LOGIN](state, info, phone) {
        state.userInfo = info
        state.login = true
    },
    // 退出登录
    [LOGOUT](state) {
        state.userInfo = null
        state.login = false
    },

    // 添加商品
    [ADD_CART](state, {
        shopid,
        food_id,
        name,
        packing_fee,
        num,
        food_pri,
        old_pri
    }) {
        let cart = state.cartInfo
        let foodid = cart.findIndex(food => food.food_id == no)
        if (foodid == -1) {
            //返回值-1，商品不存在，新添加该商品
            if (old_pri) {
                cart.push({
                    'shopid': shopid,
                    'food_id': food_id,
                    'name': name,
                    'packing_fee': packing_fee,
                    'num': num,
                    'food_pri': food_pri,
                    'old_pri': old_pri
                });
            } else {
                cart.push({
                    'shopid': shopid,
                    'food_id': food_id,
                    'name': name,
                    'packing_fee': packing_fee,
                    'num': num,
                    'food_pri': food_pri
                });
            }
        } else {
            cart[foodid].num++;
        }
        // cart.totalNum++;
        // cart.totalPacking += pack;
    },

    //减少购物车商品数量
    [REDUCE_CART](state, num, index) {
        let cart = state.cartInfo

        cart.totalNum--;
        cart[index].num--;
        cart.totalPacking -= cart[index].packing_fee;
        cart.totalPrice = cart.totalPrice - cart[index].food_pri;
        if (cart[index].old_pri) {
            cart.originalPrice =
                cart.originalPrice - cart[index].old_pri;
        } else {
            cart.originalPrice =
                cart.originalPrice - cart[index].food_pri;
        }
        if (cart[index].num === 0) {
            cart.splice(index, 1);
        }

    },
    //清空购物车
    [CLEAR_CATR](state) {
        let cart = state.cartInfo
        cart = []
    }

})