<template>
  <div class="app-container" style="margin-bottom: 50px;">
    <el-form ref="form" :model="form" label-width="100px">
      <el-card class="box-card" style="margin-bottom: 40px">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px;">首页信息</span>
        </div>
        <div class="text item">
          <el-form-item label="Logo" prop="logo">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="openFile(1)">选择文件</el-button>
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
          <el-form-item label="微信公众号" prop="wexin">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="openFile(2)">选择文件</el-button>
            </p>
            <span v-for="item in form.wexin">
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
                @click="setSrcList(form.wexin)"
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
      :dialogOpen="materialOpen1" @updateDialogOpen="updateDialogOpen"
      :img="form.logo" @updateImg="updateImg"
      :number="2"
    />
    <materal-dialog
      :dialogOpen="materialOpen2" @updateDialogOpen="updateDialogOpen"
      :img="form.wexin" @updateImg="updateImg"
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
        id:2,
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
      materialOpen1: false,
      materialOpen2: false,
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
      getIndexinfo(2).then(response => {
        this.form = response.data;
        console.log(this.form)
      });
    },
    handleClick(){
      console.log(this.form)
      console.log("baocun")

      this.form.logo = JSON.stringify(this.form.logo)
      this.form.wexin = JSON.stringify(this.form.wexin)
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
      switch(i) {
        case 1:
          this.materialOpen1 = true;
          break
        case 2:
          this.materialOpen2 = true;
          break
      }
    },
    updateDialogOpen(newValue){
      this.materialOpen1 = newValue
      this.materialOpen2 = newValue
    },
    updateImg(newValue){
      if(this.materialOpen1){
        this.form.logo = newValue
        this.setSrcList(this.form.logo)
      } else if(this.materialOpen2){
        this.form.wexin = newValue
        this.setSrcList(this.form.wexin)
      }
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
  border-top: 2px solid #eeeeee;
}
</style>
