<template>
  <div class="data_list">
    <div class="main">
      <el-row class="el_row">
        <el-col :span="4" class="el_left">
          <div class="menu">
            <ul class="list" v-infinite-scroll="menu_to_bottom">
              <li class="li" :class="index == menu_index ? 'active' : ''" v-for="(item, index) in menu_list" :key="index"
                  @click="menu_change(item, index)">
                <img class="img" src="../../../assets/images/download_icon.png" />
                <span class="text over1">{{ item.name }}</span>
                <el-popover trigger="hover" placement="bottom-start" width="60">
                  <div class="li_ul">
                    <div class="li_text" @click="menu_edit_name(item)">
                      命名分组
                    </div>
                    <el-popconfirm title="确定删除该文件吗？" @confirm="listDel(item.id)">
                      <div class="li_text" slot="reference">删除文件</div>
                    </el-popconfirm>
                  </div>
                  <span class="icon" slot="reference" v-if="item.name != '全部' && item.name != '未分组'">...</span>
                </el-popover>
              </li>
            </ul>
            <div class="menu_add_box">
              <el-button class="btn" type="primary" @click="add_dialog_show = true">添加新文件</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="el_right">
          <div class="content">
            <div class="content_head">
              <div class="ch_left">
                <el-upload action="#" accept=".jpg,.jpeg,.png,.gif.JPG,.JPEG,.PBG,.GIF,.mp4,.MP4"
                           :on-change="upload_change">
                  <el-button size="small" type="primary">本地上传</el-button>
                </el-upload>
              </div>
              <div class="ch_right">
                <el-input placeholder="请输入搜索内容" v-model="keyword" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div class="icon_box" :class="type_index == 0 ? 'active' : ''">
                  <i class="icon el-icon-s-order"></i>
                </div>
                <div class="icon_box" :class="type_index == 1 ? 'active' : ''">
                  <i class="icon el-icon-menu"></i>
                </div>
              </div>
            </div>
            <el-table class="table_content" :data="fileList" border height="500" v-loading="loading">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="url" label="图片">
                <template slot-scope="scope">
                  <div class="cover">
                    <a v-if="scope.row.url.indexOf('.mp4') != -1"
                       @click="handleOpen(scope.row.url)">
                      <video class="video" :src="scope.row.url"
                             width="100" height="100" />
                    </a>
                    <el-image class="img" :preview-src-list="[scope.row.url]" :src="scope.row.url" fit="cover"
                              v-else></el-image>
<!--                    <Display :displayType="0" :displayData="scope.row.url" />-->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="createTime" label="上传日期"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button class="btn" slot="reference" type="primary" size="mini"
                             @click="editName(scope.row)">重命名</el-button>
                  <el-popconfirm title="这是一段内容确定删除吗？" @confirm="listDel(scope.row.id)">
                    <el-button type="danger" size="mini" slot="reference">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              class="page_content"
              v-show="total>0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            />
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 新增文件弹窗 -->
    <el-dialog title="添加新文件" :visible.sync="add_dialog_show" :before-close="edit_name_dialog_close" width="30%">
      <div class="content">
        <el-form ref="addform" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="form.name" clearable maxlength="20"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit_name_dialog_close">取 消</el-button>
        <el-button type="primary" @click="add_dialogs_submit">确 定</el-button>
      </span>
    </el-dialog>

<!--    &lt;!&ndash; 预览上传模块弹窗 &ndash;&gt;-->
<!--    <el-dialog :visible.sync="upload_prev_dialogs" :destroy-on-close="true" :before-close="prev_dialogs_close">-->
<!--      <img width="100%" :src="upload_image_url" alt="" v-if="upload_prev_type == 'img'" />-->
<!--      <video class="video" :src="upload_video_url" autoplay loop v-else-if="upload_prev_type == 'video'"></video>-->
<!--    </el-dialog>-->

    <!-- 修改命名-弹窗 -->
    <el-dialog :visible.sync="edit_name_dialog_show" :destroy-on-close="true" :before-close="edit_name_dialog_close"
               width="30%" title="修改名称">
      <div class="edit_box">
        <el-form ref="editForm" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="文件名称" prop="name">
            <el-input class="edit_input" placeholder="请输入内容" clearable maxlength="20" v-model="form.name" show-word-limit>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_name_dialog_close">取 消</el-button>
        <el-button type="primary" @click="edit_name_dialog_confirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 视频播放弹窗-->
    <el-dialog
      title="视频播放"
      :visible.sync="dialogVisible"
      width="50%">
      <video class="video" :src="dialogUrl" width="100%"
             controls />

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  MenuList,
  addMenu,
  List,
  editName,
  upload,
  addList,
  listDel
}  from '../../../api/system/material'
import Display from '../../Display'
export default {
  components: { Display },
  data() {
    return {
      tabsNameActive: "tabs0",
      // 左侧菜单栏
      menu_list: [],
      // 左侧菜单下标
      menu_index: 0,
      // 重命名-弹窗
      edit_name_dialog_show: false,
      // 添加新文件 - 弹窗
      add_dialog_show: false,
      // 搜索关键字
      keyword: "",
      // 列表排版类型下标
      type_index: 0,
      form: {
        id: "",
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false, // 加载
      fileList: [], // 上传文件列表
      disabled: false,
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
      },
      dialogVisible:false,
      dialogUrl:null,
    };
  },
  created() {
    this.getMenuListFn();
  },
  methods: {
    // 获取菜单列表
    async getMenuListFn(flag = false) {
      const res = await MenuList({
        parent_id: 0,
        type: "0",
      });
      console.log("菜单列表", res);
      if (res.code == 200 && res.data.length > 0) {
        this.menu_list = res.data;
        this.getList()
      }
    },
    // 左侧菜单栏，change
    menu_change(item, index) {
      this.menu_index = index;
      this.getList();
    },
    // 列表
    async getList() {
      this.loading = true;
      this.queryParams.id = this.menu_list[this.menu_index].id
      const res = await List(this.queryParams);
      console.log("列表", res);
      this.fileList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    // 左侧菜单栏，触底
    menu_to_bottom(e) {
      console.log("菜单触底", e);
    },
    // 修改命名弹窗，关闭
    edit_name_dialog_close() {
      this.form.id = '';
      this.form.name = '';
      this.add_dialog_show = false;
      this.edit_name_dialog_show = false;
    },
    // 修改命名弹窗，确定
    async edit_name_dialog_confirm() {
      const form = this.form;
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          // 重命名
          const res = await editName({
            id: form.id,
            name: form.name,
          });
          if (res.code == 200) {
            // 刷新列表
            await this.getMenuListFn(true);
            // 初始化
            await this.edit_name_dialog_close();
            this.$message({
              message: "修改名称成功",
              type: "success",
            });
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // 左侧菜单栏，修改命名弹窗，显示
    menu_edit_name(e) {
      this.form.id = e.id;
      this.form.name = e.name;
      this.edit_name_dialog_show = true
    },
    // 左侧菜单栏，删除
    menu_li_del(index, name) {
      this.menu_list.splice(index, 1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },
    // tabs栏切换
    tabsClick(e) {
      console.log("tabs", e);
    },
    // 添加新模块弹窗 - 提交
    add_dialogs_submit() {
      this.$refs.addform.validate(async (valid) => {
        if (valid) {
          const res = await addMenu({
            parentId: 0,
            type: "0",
            name: this.form.name,
          });
          console.log("res", res);
          if (res.code == 200) {
            // 重新加载
            await this.getMenuListFn(true);
            // 初始化
            await this.edit_name_dialog_close();
            this.$message({
              message: "添加新模块成功",
              type: "success",
            });
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // 本地上传
    upload_change(file) {
      if (file.status !== "ready") return;
      console.log("本地上传", file);

      let formData = new FormData();
      formData.append("file", file.raw);

      upload(formData).then(res=>{
        const data = {
          parentId: this.menu_list[this.menu_index].id,
          type: 1,
          name: res.originalFilename,
          url: res.fileName,
        }
        addList(data);
        this.getList();
      });
    },
    // 列表重命名
    async editName(e) {
      this.form.name = e.name;
      this.form.id = e.id;
      this.edit_name_dialog_show = true;
    },
    // 列表删除
    async listDel(id) {
      const res = await listDel(id);
      if (res.code == 200) {
        this.getMenuListFn(true)
        this.$message({
          message: "删除成功",
          type: "success",
        });
      } else {
        this.$message.error(res.msg);
      }
    },
    handleOpen(url){
      this.dialogVisible = true
      this.dialogUrl = url
    }
  },
};
</script>

<style lang="scss" scoped>
.data_list {
  padding: 20px;
  background: #f5f5f5;

  .main {
    height: calc(100vh - 140px);
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    .el_row {
      height: 100%;

      .el_left {
        height: 100%;
      }

      .el_right {
        height: 100%;
      }
    }

    .menu {
      border-right: 1px solid #e4e7ed;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .list {
        flex: 1;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid #e4e7ed;
        overflow-y: auto;

        .li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0 10px 10px;

          .img {
            width: 20px;
          }

          .text {
            flex: 1;
            padding: 0 10px;
            font-size: 14px;
            cursor: pointer;
          }

          .icon {
            display: inline-block;
            width: 30px;
            padding: 0 6px;
            cursor: pointer;
            font-weight: 500;
            font-size: 18px;

            &:hover {
              color: #46a6ff;
            }
          }

          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        }

        .active {
          background: #edefff;
        }
      }

      .menu_add_box {
        height: 60px;
        text-align: center;

        .btn {
          margin: 10px auto;
        }
      }
    }

    .content {
      height: 100%;
      overflow: hidden;
      padding: 10px 10px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .content_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: none;

        .ch_right {
          display: flex;
          align-items: center;

          .icon_box {
            margin-left: 8px;
            padding: 3px;
            border-radius: 2px;
            cursor: pointer;

            .icon {
              font-size: 26px;
            }
          }

          .active {
            background: #dbdfff;

            .icon {
              color: #4a5dff;
            }
          }
        }
      }

      .table_content {
        margin-top: 10px;

        .cover {
          text-align: center;
        }

        .video {
          height: 80px;
          border-radius: 2px;
        }

        .img {
          height: 80px;
          border-radius: 2px;
        }

        .btn {
          margin: 0 10px;
        }
      }

      .page_content {
        height: 60px;
        margin: 0px;
        display:flex;
        align-items:center;
        justify-content:left;
      }
    }
  }

  .upload-demo {
    .video {
      width: 148px;
      width: 148px;
    }
  }
}

.li_ul {
  .li_text {
    padding: 6px 0;
    font-size: 14px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}

.edit_box {
  .edit_cancel {
    margin: 0 10px;
  }

  .edit_confirm {
    margin: 0;
  }
}
</style>
