import request from '@/utils/request'

// 查询顾问团队+企业荣誉列表
export function listGrouped(query) {
  return request({
    url: '/system/grouped/list',
    method: 'get',
    params: query
  })
}

// 查询顾问团队+企业荣誉详细
export function getGrouped(id) {
  return request({
    url: '/system/grouped/' + id,
    method: 'get'
  })
}

// 新增顾问团队+企业荣誉
export function addGrouped(data) {
  return request({
    url: '/system/grouped',
    method: 'post',
    data: data
  })
}

// 修改顾问团队+企业荣誉
export function updateGrouped(data) {
  return request({
    url: '/system/grouped',
    method: 'put',
    data: data
  })
}

// 删除顾问团队+企业荣誉
export function delGrouped(id) {
  return request({
    url: '/system/grouped/' + id,
    method: 'delete'
  })
}
