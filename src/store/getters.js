const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  access_token: state => state.user.access_token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
