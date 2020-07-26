import request from '@/utils/request'

export function orders(s) {
  return request({
    url: `order?${s}`,
    method: 'get'
  })
}

export function order(id) {
  return request({
    url: `order/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: `order`,
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `order/${id}/update`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `order/${id}/delete`,
    method: 'post'
  })
}

export function confirm(id) {
  return request({
    url: `order/${id}/confirm`,
    method: 'post'
  })
}

export function orderDesign(id, d_id) {
  return request({
    url: `order/${id}/design/${d_id}`,
    method: 'get'
  })
}

export function updateOrderDesign(id, d_id, data) {
  return request({
    url: `order/${id}/design/${d_id}/update`,
    method: 'post',
    data
  })
}

export function delOrderDesign(id, d_id) {
  return request({
    url: `order/${id}/design/${d_id}/delete`,
    method: 'post'
  })
}
