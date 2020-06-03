import Cookies from 'js-cookie'
import { positions } from '@/api/user'
import da from 'element-ui/src/locale/lang/da'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  positions: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  INIT_POSITION: (state, positions) => {
    state.positions = positions
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  initPositions({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.positions.length < 1) {
        positions().then(response => {
          const { data } = response
          commit('INIT_POSITION', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.positions)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
