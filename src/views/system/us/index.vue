<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-card class="box-card" style="margin-bottom: 40px">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px;">关于我们</span>
        </div>
        <div class="text item">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" clearable
                       :style="{width: '50%'}"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="aboutUsImg">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="openFile(1)">选择文件</el-button>
            </p>
            <span v-for="item in form.aboutUsImg">
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
                @click="setSrcList(form.aboutUsImg)"
                :preview-src-list="srcList"
              />
            </span>
          </el-form-item>
          <el-form-item label="介绍" prop="intro">
            <el-input v-model="form.intro" type="textarea" placeholder="请输入内容"
                      :rows="10" :style="{width: '50%'}" />
          </el-form-item>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-bottom: 40px">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px;">公司价值</span>
        </div>
        <div class="text item">
          <el-form-item label="图片" prop="meaningImg">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="openFile(2)">选择文件</el-button>
            </p>
            <span v-for="item in form.meaningImg">
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
                @click="setSrcList(form.meaningImg)"
                :preview-src-list="srcList"
              />
            </span>
          </el-form-item>
          <el-form-item label="背景图" prop="meaningBackground">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="openFile(3)">选择文件</el-button>
            </p>
            <span v-for="item in form.meaningBackground">
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
                @click="setSrcList(form.meaningBackground)"
                :preview-src-list="srcList"
              />
            </span>
          </el-form-item>
          <el-form-item label="价值" prop="meaning">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="handleAdd()">新增</el-button>
            </p>
            <el-table :data="tableData" style="width: 50%" border>
              <el-table-column prop="name" align="center" label="名称">
              </el-table-column>
              <el-table-column prop="value" align="center" label="数值">
              </el-table-column>
              <el-table-column prop="img" align="center" label="图片">
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
              <el-table-column label="操作" align="center" >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, tableDate)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-bottom: 40px">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px;">公司使命</span>
        </div>
        <div class="text item">
          <el-form-item label="使命" prop="mission">
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              placeholder="请输入使命"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag"
                       @click="showInput">添加</el-button>
            <p>
              <el-tag
                v-for="tag in tags"
                :key="tag"
                size="medium"
                type="succes"
                effect="plain"
                :disable-transitions="false"
                @close="handleTagClose(tag)"
                closable>
                {{tag}}
              </el-tag>
            </p>
          </el-form-item>
          <el-form-item label="图片" prop="missionImg">
            <p class="margin0" style="padding-bottom: 10px;">
              <el-button @click="openFile(4)">选择文件</el-button>
            </p>
            <span v-for="item in form.missionImg">
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
                @click="setSrcList(form.missionImg)"
                :preview-src-list="srcList"
              />
            </span>
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
      :img="form.aboutUsImg" @updateImg="updateImg"
      :number="number"
    />
    <materal-dialog
      :dialogOpen="materialOpen2" @updateDialogOpen="updateDialogOpen"
      :img="form.meaningImg" @updateImg="updateImg"
      :number="number"
    />
    <materal-dialog
      :dialogOpen="materialOpen3" @updateDialogOpen="updateDialogOpen"
      :img="form.meaningBackground" @updateImg="updateImg"
      :number="number"
    />
    <materal-dialog
      :dialogOpen="materialOpen4" @updateDialogOpen="updateDialogOpen"
      :img="form.missionImg" @updateImg="updateImg"
      :number="4"
    />
    <materal-dialog
      :dialogOpen="materialOpen5" @updateDialogOpen="updateDialogOpen"
      :img="meaningDemo.img" @updateImg="updateImg"
      :number="1"
    />

    <!-- 公司价值-->
    <el-dialog :title="title" :visible="meaningOpen" width="50%"
               append-to-body @close="handleClose">
      <el-form ref="meaningDemo" :model="meaningDemo" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="meaningDemo.name" placeholder="请输入名称"
                    clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="数值" prop="value">
          <el-input v-model="meaningDemo.value" placeholder="请输入数值" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <p class="margin0" style="padding-bottom: 10px;">
            <el-button @click="openFile(5)">选择文件</el-button>
          </p>
          <span v-for="item in meaningDemo.img">
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
      </el-form>
      <div slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="subTable">确定</el-button>
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
import { listUs, getUs, delUs, addUs, updateUs } from "@/api/system/us";
import MateralDialog from '../../MaterialDialog'
import Vue from 'vue'

export default {
  name: 'Us',
  components: { MateralDialog, },
  data(){
    return  {
      form:{
        id:1,
      },
      tableData:[],
      flag : -1,
      tags:[],
      inputValue:'',
      inputVisible: false,
      title: '',
      meaningOpen: false,
      meaningDemo:{
        name:null,
        value:null,
        img:[]
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
      materialOpen3: false,
      materialOpen4: false,
      materialOpen5: false,
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
      getUs(1).then(response => {
        this.form = response.data;
        if(this.form.meaning != null){
          this.tableData = this.form.meaning
        }
        if(this.form.mission != null){
          this.tags = this.form.mission
        }
        console.log(this.form)
      });
    },
    // 表单重置
    reset() {
      this.meaningDemo = {
        name:null,
        value:null,
        img:[]
      };
      this.resetForm("meaningDemo");
    },
    handleAdd(){
      this.title = "添加价值信息"
      this.meaningOpen = true
      this.reset()
    },
    handleUpdate(index,row){
      this.title = "修改价值信息"
      this.meaningOpen = true
      this.meaningDemo = row
      this.flag = index
    },
    handleClose(){
      this.meaningOpen = false
    },
    handleDelete(index,data){
      console.log(index,data)
      data.splice(index, 1);
    },
    handleClick(){
      console.log(this.form)
      console.log("baocun")
      // this.form.aboutUsImg = JSON.stringify(this.form.aboutUsImg != undefined?this.form.aboutUsImg:[])

      this.form.meaning =this.tableData
      this.form.mission =this.tags

      this.form.aboutUsImg = JSON.stringify(this.form.aboutUsImg)
      this.form.meaningImg = JSON.stringify(this.form.meaningImg)
      this.form.meaningBackground = JSON.stringify(this.form.meaningBackground)
      this.form.meaning = JSON.stringify(this.form.meaning)
      this.form.mission = JSON.stringify(this.form.mission)
      this.form.missionImg = JSON.stringify(this.form.missionImg)
      updateUs(this.form).then(res =>{
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
    subTable(){
      if (this.flag != -1){
        let data = {
          name:this.meaningDemo.name,
          value:this.meaningDemo.value,
          img:this.meaningDemo.img
        }
        Vue.set(this.tableData,this.flag,data)
        this.flag = -1
      }else {
        this.tableData.push({
          name:this.meaningDemo.name,
          value:this.meaningDemo.value,
          img:this.meaningDemo.img
        })
      }
      this.handleClose()
    },
    // 列表点击图片时触发，查看图片
    setSrcList(data) {
      this.srcList = []
      data.forEach(item => this.srcList.push(item.url))
    },
    // 打开选择文件弹窗
    openFile(i){
      switch(i){
        case 1:
          this.materialOpen1 = true;
          break
        case 2:
          this.materialOpen2 = true;
          break
        case 3:
          this.materialOpen3 = true;
          break
        case 4:
          this.materialOpen4 = true;
          break
        case 5:
          this.materialOpen5 = true;
          break
      }
    },
    updateDialogOpen(newValue){
      this.materialOpen1 = newValue
      this.materialOpen2 = newValue
      this.materialOpen3 = newValue
      this.materialOpen4 = newValue
      this.materialOpen5 = newValue
    },
    updateImg(newValue){
      if(this.materialOpen1){
        this.form.aboutUsImg = newValue
        this.setSrcList(this.form.aboutUsImg)
      } else if(this.materialOpen2){
        this.form.meaningImg = newValue
        this.setSrcList(this.form.meaningImg)
      } else if(this.materialOpen3){
        this.form.meaningBackground = newValue
        this.setSrcList(this.form.meaningBackground)
      } else if(this.materialOpen4){
        this.form.missionImg = newValue
        this.setSrcList(this.form.missionImg)
      } else if(this.materialOpen5){
        this.meaningDemo.img = newValue
        this.setSrcList(this.meaningDemo.img)
      }
    },
    handleOpen(url){
      this.dialogVisible = true
      this.dialogUrl = url
    },
    handleTagClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
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
.el-tag{
  height: 36px;
  line-height: 36px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 36px;
  line-height: 36px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 50%;
  vertical-align: bottom;
}
</style>
