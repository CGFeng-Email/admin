<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="backgroundList" @selection-change="handleSelectionChange">
      <el-table-column label="标签" align="center" prop="label" />
      <el-table-column label="背景图片" align="center" prop="img">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.img.length == 0"
            style="width: 100px; height: 100px"
            fit="scale-down"
            src=""
          />
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
      <el-table-column label="描述" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:background:edit']"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改背景图对话框 -->
    <el-dialog :title="title" :visible.sync="BackOpen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标签" align="left" prop="label">
          <template slot-scope="scope">
            {{form.label}}
          </template>
        </el-form-item>
        <el-form-item label="背景图片" prop="img">
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
        <el-table-column label="描述" align="center" prop="remark" />
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
import { listBackground, getBackground, delBackground, addBackground, updateBackground } from "@/api/system/background";
import MaterialDialog from '../../MaterialDialog'

export default {
  name: "Background",
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
      // 背景图表格数据
      backgroundList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      BackOpen: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      srcList:['#'],
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
    /** 查询背景图列表 */
    getList() {
      this.loading = true;
      listBackground().then(response => {
        this.backgroundList = response.data;
        this.backgroundList.forEach(item => {
          item.img = JSON.parse(item.img)
        })
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.BackOpen = false;
      this.reset();
      this.getList()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        label: null,
        img: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBackground(id).then(response => {
        this.form = response.data;
        this.BackOpen = true;
        this.title = "修改背景图";
        this.form.img = JSON.parse(this.form.img)
        this.setSrcList(this.form.img)
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.img = JSON.stringify(this.form.img)
          if (this.form.id != null) {
            updateBackground(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.cancel()
            });
          } else {
            addBackground(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.cancel()
            });
          }
        }
      });
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
