import request from '@/utils/request'

export function material(s) {
  return request({
    url: `report/material?${s}`,
    method: 'get'
  })
}

export function user(s) {
  return request({
    url: `report/user?${s}`,
    method: 'get'
  })
}
