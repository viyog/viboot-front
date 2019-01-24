import request from '../util/request'

export function get() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function getOne(id) {
  return request({
    url: '/user/query',
    method: 'get',
    params: { id }
  })
}

export function post(userName, password) {
  return request({
    url: '/user',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function put(id, userName, password) {
  return request({
    url: '/user',
    method: 'put',
    data: {
      id,
      userName,
      password
    }
  })
}

export function del(id) {
  return request({
    url: '/user',
    method: 'delete',
    params: { id }
  })
}