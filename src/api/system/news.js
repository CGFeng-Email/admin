import request from '@/utils/request'

// 查询新闻列表
export function listNews(query) {
  return request({
    url: '/system/news/list',
    method: 'get',
    params: query
  })
}

// 查询新闻详细
export function getNews(id) {
  return request({
    url: '/system/news',
    method: 'get',
    params: {id:id}
  })
}

// 新增新闻
export function addNews(data) {
  return request({
    url: '/system/news',
    method: 'post',
    data: data
  })
}

// 修改新闻
export function updateNews(data) {
  return request({
    url: '/system/news',
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data
  })
}

// 删除新闻
export function delNews(id) {
  return request({
    url: '/system/news/' + id,
    method: 'delete'
  })
}
