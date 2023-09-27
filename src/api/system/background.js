import request from '@/utils/request'

// 查询背景图列表
export function listBackground() {
  return request({
    url: '/system/background/list',
    method: 'get',
  })
}

// 查询背景图详细
export function getBackground(id) {
  return request({
    url: '/system/background/' + id,
    method: 'get'
  })
}

// 新增背景图
export function addBackground(data) {
  return request({
    url: '/system/background',
    method: 'post',
    data: data
  })
}

// 修改背景图
export function updateBackground(data) {
  return request({
    url: '/system/background',
    method: 'put',
    data: data
  })
}

// 删除背景图
export function delBackground(id) {
  return request({
    url: '/system/background/' + id,
    method: 'delete'
  })
}
