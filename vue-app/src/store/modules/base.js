const state = {
  name: 'Tom'
}

const getters = {
  name: state => state.name
}

const mutations = {
  changeName(state) {
    const persons = ['Tom', 'Mike', 'Jerry', 'Andy']
    const random = Math.round(Math.random() * 3)
    state.name = persons[random]
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}