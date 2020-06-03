import request from '@/utils/request'

export function users(s) {
  return request({
    url: `users?${s}`,
    method: 'get'
  })
}

export function user(id) {
  return request({
    url: `users/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: 'users/create',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `users/${id}/update`,
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `users/${id}/delete`,
    method: 'post'
  })
}
