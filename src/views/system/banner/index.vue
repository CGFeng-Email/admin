<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            v-for="dict in dicts"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述信息" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入描述信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:banner:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:banner:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:banner:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:banner:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bannerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="序号" align="center" prop="id"/>
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="图片" align="center" prop="img">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            fit="scale-down"
            :src="scope.row.img"
            :preview-src-list="srcList"
            @click="setSrcList(scope.row.img)"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="sort"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="updateStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:banner:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:banner:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改轮播图对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <p class="margin0">
            <el-button @click="openFile()">选择文件</el-button>
          </p>
          <p>
            <el-image
              style="width: 100px; height: 100px"
              fit="scale-down"
              :src="form.img"
              :preview-src-list="srcList"
            />
          </p>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="1" :max="10" type="width:80px;"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择文件" :visible.sync="materialOpen" width="1000px" style="height: 900px;" append-to-body>
      <materal-dialog />
    </el-dialog>
  </div>
</template>

<script>
import { listBanner, getBanner, delBanner, addBanner, updateBanner, changeStatus } from '@/api/system/banner'
import MateralDialog from '../../MaterialDialog'

export default {
  name: 'Banner',
  components: { MateralDialog, },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 轮播图表格数据
      bannerList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        status: null,
        remark: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      srcList: [],
      dicts: [
        { label: '显示', value: '1' },
        { label: '停用', value: '0' }
      ],
      // 选择文件弹窗开关
      materialOpen: false,

    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询轮播图列表 */
    getList() {
      this.loading = true
      listBanner(this.queryParams).then(response => {
        this.bannerList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        img: null,
        sort: null,
        status: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加轮播图'

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getBanner(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改轮播图'
        this.srcList = [this.form.img]
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBanner(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addBanner(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除轮播图编号为"' + ids + '"的数据项？').then(function() {
        return delBanner(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/banner/export', {
        ...this.queryParams
      }, `banner_${new Date().getTime()}.xlsx`)
    },
    // 状态修改
    updateStatus(row) {
      let text = row.status === '0' ? '启用' : '停用'
      this.$modal.confirm('确认要' + text + '' + row.name + '轮播图吗？').then(function() {
        return changeStatus(row.id, row.status)
      }).then(() => {
        this.$modal.msgSuccess(text + '成功')
      }).catch(function() {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    // 列表点击图片时触发，查看图片
    setSrcList(img) {
      this.srcList = [img]
    },
    // 打开选择文件弹窗
    openFile(){
      this.materialOpen = true;
    },
  }
}
</script>
<style lang="scss" scoped>
.margin0 {
  margin: 0;
}

.main {
  height: calc(100vh - 84px);
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
      height: 100px;
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
      margin-top: 20px;

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
      height: 100px;
      padding: 10px 0;
    }
  }
}

</style>
