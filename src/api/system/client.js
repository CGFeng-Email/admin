import request from '@/utils/request'

// 查询合作客户列表
export function listClient(query) {
  return request({
    url: '/system/client/list',
    method: 'get',
    params: query
  })
}

// 查询合作客户详细
export function getClient(id) {
  return request({
    url: '/system/client/' + id,
    method: 'get'
  })
}

// 新增合作客户
export function addClient(data) {
  return request({
    url: '/system/client',
    method: 'post',
    data: data
  })
}

// 修改合作客户
export function updateClient(data) {
  return request({
    url: '/system/client',
    method: 'put',
    data: data
  })
}

// 删除合作客户
export function delClient(id) {
  return request({
    url: '/system/client/' + id,
    method: 'delete'
  })
}
