import request from '@/utils/request'

// 查询首页信息列表
export function listIndexinfo(query) {
  return request({
    url: '/system/indexinfo/list',
    method: 'get',
    params: query
  })
}

// 查询首页信息详细
export function getIndexinfo(id) {
  return request({
    url: '/system/indexinfo/' + id,
    method: 'get'
  })
}

// 新增首页信息
export function addIndexinfo(data) {
  return request({
    url: '/system/indexinfo',
    method: 'post',
    data: data
  })
}

// 修改首页信息
export function updateIndexinfo(data) {
  return request({
    url: '/system/indexinfo',
    method: 'put',
    data: data
  })
}

// 删除首页信息
export function delIndexinfo(id) {
  return request({
    url: '/system/indexinfo/' + id,
    method: 'delete'
  })
}
