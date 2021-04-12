import {ADD_COUNT,ADD_PRODUCT} from './mutations-type'

export default {
    [ADD_COUNT](state,payload){
      payload.count ++
    },
    [ADD_PRODUCT](state,payload){
      state.cartList.push(payload)
    }
}