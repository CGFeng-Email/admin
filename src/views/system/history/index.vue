<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="年份" prop="year">
        <el-select
          v-model="queryParams.year"
          placeholder="请选择年份"
          clearable
        >
          <el-option
            v-for="dict in dicts"
            :key="dict"
            :label="dict"
            :value="dict"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
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
          v-hasPermi="['system:history:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:history:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:history:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:history:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="historyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="图片" align="center" prop="img">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.img.length == 0"
            style="width: 100px; height: 100px"
          >
            <div slot="error" class="image-slot" style="background: #F5F7FA;line-height: 100px;">
              暂无图片
            </div>
          </el-image>
          <a v-else-if="scope.row.img[0].url.indexOf('.mp4') != -1"
             @click="handleOpen(scope.row.img[0].url)">
            <video class="video" :src="scope.row.img[0].url"
                   width="100" height="100" />
          </a>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            fit="scale-down"
            :src="scope.row.img[0].url"
            :preview-src-list="srcList"
            @click="setSrcList(scope.row.img)"
          />
        </template>
      </el-table-column>
      <el-table-column label="年份" align="center" prop="year" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="介绍" align="left" prop="intro" >
        <template slot-scope="scope">
          <div v-html="scope.row.intro" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:history:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:history:remove']"
          >删除</el-button>
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

    <!-- 添加或修改发展历程对话框 -->
    <el-dialog :title="title" :visible.sync="HistoryOpen" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="年份" prop="year">
          <el-input v-model="form.year" placeholder="请输入年份" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <p class="margin0" style="padding-bottom: 10px;">
            <el-button @click="openFile()">选择文件</el-button>
          </p>
          <span v-for="item in form.img">
            <el-image
              v-if="item.url == undefined"
              style="width: 100px; height: 100px"
              fit="scale-down"
              src=""
            />
            <a v-else-if="item.url.indexOf('.mp4') != -1"
               @click="handleOpen(item.url)">
              <video class="video" :src="item.url"
                     width="100" height="100" />
            </a>
            <el-image
              v-else
              style="width: 100px; height: 100px"
              fit="scale-down"
              :src="item.url"
              :preview-src-list="srcList"
            />
          </span>
        </el-form-item>
        <el-form-item label="介绍" prop="intro">
          <Editor v-model="form.intro" :type="'custom'"
                  :height="350" :minHeight="350" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!--  文件选择弹窗-->
    <material-dialog
      :dialogOpen="materialOpen" @updateDialogOpen="updateDialogOpen"
      :img="form.img" @updateImg="updateImg"
      :number="number"
    />
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
import { listHistory, getHistory, delHistory, addHistory, updateHistory } from "@/api/system/history";
import MaterialDialog from '../../MaterialDialog'

export default {
  name: "History",
  components: { MaterialDialog },
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
      // 发展历程表格数据
      historyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      HistoryOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        year: null,
        name: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        year: [
          { required: true, message: "年份不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "介绍不能为空", trigger: "blur" }
        ],
        // img: [
        //   { required: true, message: "图片不能为空", trigger: "blur" }
        // ],
      },
      srcList:['#'],
      dicts: null,
      arr: [],
      // 选择文件弹窗开关
      materialOpen: false,
      // 选择文件个数
      number:1,
      dialogVisible:false,
      dialogUrl:null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询发展历程列表 */
    getList() {
      this.loading = true;
      listHistory().then(response => {
        response.rows.forEach(item => {
          this.arr.push(item.year)
        })
        this.dicts = Array.from(new Set(this.arr)).sort()
      });
      listHistory(this.queryParams).then(response => {
        this.historyList = response.rows;
        this.historyList.forEach(item => {
          item.img = JSON.parse(item.img)
          item.intro = decodeURIComponent(item.intro)
        })
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.HistoryOpen = false;
      this.reset();
      this.getList()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        year: null,
        name: null,
        intro: null,
        img: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.HistoryOpen = true;
      this.title = "添加发展历程";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHistory(id).then(response => {
        this.form = response.data;
        this.HistoryOpen = true;
        this.title = "修改发展历程";
        this.form.img = JSON.parse(this.form.img)
        this.form.intro = decodeURIComponent(this.form.intro)
        this.setSrcList(this.form.img)
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.intro = encodeURIComponent(this.form.intro)
          if (this.form.img !== null){
            this.form.img = JSON.stringify(this.form.img)
          }else {
            this.form.img = JSON.stringify([])
          }
          if (this.form.id != null) {
            updateHistory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.cancel()
            });
          } else {
            addHistory(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.cancel()
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除发展历程编号为"' + ids + '"的数据项？').then(function() {
        return delHistory(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/history/export', {
        ...this.queryParams
      }, `history_${new Date().getTime()}.xlsx`)
    },
    // 列表点击图片时触发，查看图片
    setSrcList(data) {
      this.srcList = []
      data.forEach(item => this.srcList.push(item.url))
    },
    // 打开选择文件弹窗
    openFile(){
      this.materialOpen = true;
    },
    updateDialogOpen(newValue){
      this.materialOpen = newValue
    },
    updateImg(newValue){
      this.form.img = newValue
      this.setSrcList(this.form.img)
    },
    handleOpen(url){
      this.dialogVisible = true
      this.dialogUrl = url
    }

  }
};
</script>

