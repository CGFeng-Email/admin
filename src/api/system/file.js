import request from '@/utils/request'

// 查询素材管理列表
export function listFile(query) {
  return request({
    url: '/system/file/list',
    method: 'get',
    params: query
  })
}

// 查询素材管理详细
export function getFile(id) {
  return request({
    url: '/system/file/' + id,
    method: 'get'
  })
}

// 新增素材管理
export function addFile(data) {
  return request({
    url: '/system/file',
    method: 'post',
    data: data
  })
}

// 修改素材管理
export function updateFile(data) {
  return request({
    url: '/system/file',
    method: 'put',
    data: data
  })
}

// 删除素材管理
export function delFile(id) {
  return request({
    url: '/system/file/' + id,
    method: 'delete'
  })
}
