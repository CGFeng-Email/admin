import request from '@/utils/request'

// 查询素材列表
export function listMaterial(query) {
  return request({
    url: '/system/material/list',
    method: 'get',
    params: query
  })
}

// 查询素材详细
export function getMaterial(id) {
  return request({
    url: '/system/material/' + id,
    method: 'get'
  })
}

// 新增素材
export function addMaterial(data) {
  return request({
    url: '/system/material',
    method: 'post',
    data: data
  })
}

// 修改素材
export function updateMaterial(data) {
  return request({
    url: '/system/material',
    method: 'put',
    data: data
  })
}

// 删除素材
export function delMaterial(id) {
  return request({
    url: '/system/material/' + id,
    method: 'delete'
  })
}
