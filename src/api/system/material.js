// 资源列表

import request from "@/utils/request";

// 添加菜单栏
export const addMenu = (data) => {
  return request({
    url: "/system/material",
    method: "post",
    data,
  });
};

// 获取列表
export const MenuList = (data) => {
  return request({
    url: "/system/material/list",
    method: "get",
    data,
  });
};

// 右侧列表
export const List = (id) => {
  return request({
    url: "/system/material/" + id,
    method: "get",
  });
};

// 重命名
export const editName = (data) => {
  return request({
    url: "/system/material",
    method: "PUT",
    data,
  });
};

// 上传
export const upload = (data) => {
  return request({
    url: "/common/upload",
    method: "post",
    data,
  });
};

// 插入列表
export const addList = (data) => {
  return request({
    url: "/system/material",
    method: "post",
    data,
  });
};


// 列表删除
export const listDel = (id) => {
  return request({
    url: "/system/material/" + id,
    method: "DELETE",
  });
};
