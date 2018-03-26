import axios from 'axios'
import Services from './services'

export default {
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    if (req.session && req.session.user) {
      const {
        email,
        nickname,
        avatarUrl
      } = req.session.user
      console.log(req.session)
      const user = {
        email,
        nickname,
        avatarUrl
      }

      commit('SET_USER', user)
    }
  },

  getWechatSignature({
    commit
  }, url) {
    return Services.getWechatSignature(url)
  },

  getWechatOAuth({
    commit
  }, url) {
    return Services.getWechatOAuth(url)
  },

  setAuthUser({
    commit
  }, authUser) {
    commit('SET_AUTHUSER', authUser)
  },

  async login({
    commit
  }, {
    email,
    password
  }) {
    try {
      let res = await axios.post('/admin/login', {
        email,
        password
      })

      let {
        data
      } = res
      if (!data.ret) commit('SET_USER', data.user)

      return data
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('You can\'t do it')
      }
    }
  },

  async logout({
    commit
  }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },

  async createOrder({
    state
  }, obj) {
    const { data } = Services.createOrder(obj)
    return data
  },

  async fetchHouses({
    state
  }) {
    const res = await Services.allHouses()
    state.houses = res.data
    return res
  },

  async fetchCharacters({
    state
  }) {
    const res = await Services.povCharacters()
    state.characters = res.data
    return res
  },

  async fetchProducts({
    state
  }) {
    const res = await Services.allProducts()

    state.products = res.data
    return res
  },

  async focusProduct({
    state
  }, _id) {
    if (_id === state.focusProduct._id) return
    const res = await Services.focusProduct(_id)
    state.focusProduct = res.data
    return res
  },

  async fetchPayments({
    state
  }) {
    let {
      data
    } = await Services.getPayments()
    console.log(data)
    state.payments = data.data
    state.authUser = data.authUser
    if (!state.authUser) {
      state.authUser = {
        nickname: '小可爱',
        address: '西安省安康市瀛湖一家人',
        phoneNumber: '18699944411',
        name: '帕拉斯'
      }
    }
    console.log('state.authUser', state.authUser)
    return data
  },

  async focusHouse({
    state
  }, _id) {
    if (_id === state.focusHouse._id) return
    const res = await Services.focusHouse(_id)
    state.focusHouse = res.data
    return res
  },

  async focusCharacter({
    state
  }, _id) {
    if (_id === state.focusCharacter._id) return
    const res = await Services.focusCharacter(_id)
    state.focusCharacter = res.data
    return res
  },

  async updateCharacter({
    state,
    dispatch
  }, character) {
    await axios.put(`/wiki/characters/${character._id}`, character)
    await dispatch('fetchCharacters')

    return ''
  },

  async updateHouse({
    state,
    dispatch
  }, house) {
    await axios.put(`/wiki/houses/${house._id}`, house)
    await dispatch('fetchHouses')

    return ''
  },

  async saveProduct({
    state,
    dispatch
  }, product) {
    await axios.post('/api/products', product)
    let res = await dispatch('fetchProducts')

    return res.data
  },

  async deleteProduct({
    state,
    dispatch
  }, product) {
    await axios.delete(`/api/products/${product._id}`)
    let res = await dispatch('fetchProducts')

    return res.data
  },

  async putProduct({
    state,
    dispatch
  }, product) {
    await axios.put('/api/products', product)
    let res = await dispatch('fetchProducts')
    return res.data
  },

  async crawlerIMDbCharacters({
    state
  }) {
    const {
      data
    } = await Services.crawlerIMDbcharacters()
    state.IMDb = data
    return data
  },

  async APICharacters({
    state
  }) {
    const {
      data
    } = await Services.APICharacters()
    state.APICharacters = data

    return data
  },

  homePageScroll({
    state
  }, {
    home,
    house
  }) {
    state.homePageScroll = {
      home: home,
      house: house
    }
  },

  shoppingScroll({
    state
  }, payload) {
    state.shoppingScroll = payload
  },

  finishExam({
    state
  }, obj) {
    return Services.finishExam(obj)
  }
}
