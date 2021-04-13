import {ADD_COUNT,ADD_PRODUCT} from './mutations-type'

export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      // 1.判断购物车中是否有该商品
      const oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })
      // 2.
      if(oldProduct){
        // oldProduct.count += 1
        context.commit(ADD_COUNT,oldProduct)
        resolve('商品数量+1')
      }else{
        payload.count = 1
        payload.checked = true
        context.commit(ADD_PRODUCT,payload)
        resolve('添加了新商品')
      }
    })
  }
}
