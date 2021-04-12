import {ADD_COUNT,ADD_PRODUCT} from './mutations-type'

export default {
  addCart(context,payload){
    // 1.判断购物车中是否有该商品
    const oldProduct = context.state.cartList.find(item => {
      item.iid === payload.iid
    })
    // 2.
    if(oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNT,oldProduct)
    }else{
      payload.count = 1
      context.commit(ADD_PRODUCT,payload)
    }
  }
}
