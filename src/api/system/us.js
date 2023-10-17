import request from '@/utils/request'

// 查询关于我们列表
export function listUs(query) {
  return request({
    url: '/system/us/list',
    method: 'get',
    params: query
  })
}

// 查询关于我们详细
export function getUs(id) {
  return request({
    url: '/system/us/' + id,
    method: 'get'
  })
}

// 新增关于我们
export function addUs(data) {
  return request({
    url: '/system/us',
    method: 'post',
    data: data
  })
}

// 修改关于我们
export function updateUs(data) {
  return request({
    url: '/system/us',
    method: 'put',
    data: data
  })
}

// 删除关于我们
export function delUs(id) {
  return request({
    url: '/system/us/' + id,
    method: 'delete'
  })
}
