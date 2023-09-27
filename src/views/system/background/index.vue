<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="backgroundList" @selection-change="handleSelectionChange">
      <el-table-column label="标签" align="center" prop="label" />
      <el-table-column label="背景图" align="center" prop="img" >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img"
            :preview-src-list="imageList"
            @click="setImageList(scope.row.img)"
            fit="contain"></el-image>
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标签" align="center" prop="label">
          <el-input disabled v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="背景图" prop="img" >
          <el-upload
            :http-request="HttpRequest"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="imageList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <span style="margin-left: 20px;" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-table-column label="描述" align="center" prop="remark" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBackground, getBackground, delBackground, addBackground, updateBackground } from "@/api/system/background";

export default {
  name: "Background",
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
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      imageList:[]
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
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
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
        this.open = true;
        this.title = "修改背景图";
        this.imageList=[{name:this.form.img.substring(this.form.img.lastIndexOf("/") + 1),url:this.form.img}]
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBackground(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBackground(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    setImageList(img){
      this.imageList = [img]
    },
    HttpRequest(){},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.imageList = [file.url]
    },
  }
};
</script>
