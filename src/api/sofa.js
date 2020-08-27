import request from '@/utils/request'

export function sofas(s) {
  return request({
    url: `sofa?${s}`,
    method: 'get'
  })
}

export function sofaList() {
  return request({
    url: `sofa/list`,
    method: 'get'
  })
}

export function sofa(id) {
  return request({
    url: `sofa/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: `sofa`,
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `sofa/${id}`,
    method: 'post',
    data
  })
}

export function up(id) {
  return request({
    url: `sofa/${id}/up`,
    method: 'post'
  })
}

export function del(id) {
  return request({
    url: `sofa/${id}/delete`,
    method: 'post'
  })
}

export function sofaItems(id, s) {
  return request({
    url: `sofa/${id}/items?${s}`,
    method: 'get'
  })
}

export function sofaItem(id, itemId) {
  return request({
    url: `sofa/${id}/items/${itemId}`,
    method: 'get'
  })
}

export function createItem(id, data) {
  return request({
    url: `sofa/${id}/items`,
    method: 'post',
    data
  })
}

export function updateItem(id, itemId, data) {
  return request({
    url: `sofa/${id}/items/${itemId}`,
    method: 'post',
    data
  })
}

export function delItem(id, itemId) {
  return request({
    url: `sofa/${id}/items/${itemId}/delete`,
    method: 'post'
  })
}

export function designs() {
  return request({
    url: `designs`,
    method: 'get'
  })
}
