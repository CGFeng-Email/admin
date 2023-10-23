import request from '@/utils/request'

// 查询服务列表
export function listServe(query) {
  return request({
    url: '/system/serve/list',
    method: 'get',
    params: query
  })
}

// 查询服务详细
export function getServe(id) {
  return request({
    url: '/system/serve/' + id,
    method: 'get'
  })
}

// 新增服务
export function addServe(data) {
  return request({
    url: '/system/serve',
    method: 'post',
    data: data
  })
}

// 修改服务
export function updateServe(data) {
  return request({
    url: '/system/serve',
    method: 'put',
    data: data
  })
}

// 删除服务
export function delServe(id) {
  return request({
    url: '/system/serve/' + id,
    method: 'delete'
  })
}
