import request from '@/utils/request'

// 查询发展历程列表
export function listHistory(query) {
  return request({
    url: '/system/history/list',
    method: 'get',
    params: query
  })
}

// 查询发展历程详细
export function getHistory(id) {
  return request({
    url: '/system/history/' + id,
    method: 'get'
  })
}

// 新增发展历程
export function addHistory(data) {
  return request({
    url: '/system/history',
    method: 'post',
    data: data
  })
}

// 修改发展历程
export function updateHistory(data) {
  return request({
    url: '/system/history',
    method: 'put',
    data: data
  })
}

// 删除发展历程
export function delHistory(id) {
  return request({
    url: '/system/history/' + id,
    method: 'delete'
  })
}
