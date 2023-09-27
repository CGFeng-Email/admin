import request from '@/utils/request'

// 查询联系列表
export function listContact(query) {
  return request({
    url: '/system/contact/list',
    method: 'get',
    params: query
  })
}

// 查询联系详细
export function getContact(id) {
  return request({
    url: '/system/contact/' + id,
    method: 'get'
  })
}

// 新增联系
export function addContact(data) {
  return request({
    url: '/system/contact',
    method: 'post',
    data: data
  })
}

// 修改联系
export function updateContact(data) {
  return request({
    url: '/system/contact',
    method: 'put',
    data: data
  })
}

// 删除联系
export function delContact(id) {
  return request({
    url: '/system/contact/' + id,
    method: 'delete'
  })
}
