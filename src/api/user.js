import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/auth/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function resetToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

export function positions() {
  return request({
    url: '/positions',
    method: 'get'
  })
}
