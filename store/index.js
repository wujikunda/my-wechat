import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      imageCDN: 'http://p4qxmr4o6.bkt.clouddn.com/',
      homePageScroll: {
        'home': 0,
        'house': 0
      },
      APICharacters: null,
      IMDb: null,
      authUser: null,
      shoppingScroll: 0,
      houses: [],
      cities: [],
      characters: [],
      focusHouse: {},
      focusCharacter: {},
      user: null,
      products: [],
      focusProduct: {},
      payments: []
    },
    getters,
    actions,
    mutations
  })
}

export default createStore
