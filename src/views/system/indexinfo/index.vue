<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-card class="box-card" style="margin-bottom: 40px">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px;">关于我们</span>
        </div>
        <div class="text item">
          <el-form-item label="Logo" prop="logo">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="openFile()">选择文件</el-button>
            </p>
            <span v-for="item in form.logo">
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
                @click="setSrcList(form.logo)"
                :preview-src-list="srcList"
              />
            </span>
          </el-form-item>
          <el-form-item label="公司简介" prop="intro">
            <el-input v-model="form.intro" type="textarea" placeholder="请输入内容"
                      :rows="10" :style="{width: '50%'}" />
          </el-form-item>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-bottom: 40px">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px;">联系方式</span>
        </div>
        <div class="text item">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" :style="{width: '50%'}" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" :style="{width: '50%'}" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="form.address" :style="{width: '50%'}" placeholder="请输入公司地址" />
          </el-form-item>
        </div>
      </el-card>
    </el-form>

    <div class="fixed-button">
      <el-button @click="handleClick" type="primary">保存</el-button>
    </div>
    <!--  文件选择弹窗-->
    <materal-dialog
      :dialogOpen="materialOpen" @updateDialogOpen="updateDialogOpen"
      :img="form.aboutUsImg" @updateImg="updateImg"
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
import {getIndexinfo, updateIndexinfo} from '../../../api/system/indexinfo'
import MateralDialog from '../../MaterialDialog'
import Vue from 'vue'

export default {
  name: 'indexinfo',
  components: { MateralDialog, },
  data(){
    return  {
      form:{
        id:1,
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }]
      },
      srcList: ['#'],
      // 选择文件弹窗开关
      materialOpen: false,
      // 选择文件个数
      number:1,
      dialogVisible:false,
      dialogUrl:null,
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList() {
      getIndexinfo(1).then(response => {
        this.form = response.data;
        console.log(this.form)
      });
    },
    handleClick(){
      console.log(this.form)
      console.log("baocun")

      this.form.logo = JSON.stringify(this.form.logo)
      updateIndexinfo(this.form).then(res =>{
        if (res.code == 200){
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.getList()
        }else{
          this.$message.error('保存失败');
        }
      })
    },

    // 列表点击图片时触发，查看图片
    setSrcList(data) {
      this.srcList = []
      data.forEach(item => this.srcList.push(item.url))
    },
    // 打开选择文件弹窗
    openFile(i){
      this.materialOpen = true;
    },
    updateDialogOpen(newValue){
      this.materialOpen = newValue
    },
    updateImg(newValue){
      this.form.logo = newValue
      this.setSrcList(this.form.logo)
    },
    handleOpen(url){
      this.dialogVisible = true
      this.dialogUrl = url
    },
  }
}
</script>

<style lang="scss" scoped>
.margin0 {
  margin: 0;
}
.fixed-button {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  text-align: center;
}
</style>
