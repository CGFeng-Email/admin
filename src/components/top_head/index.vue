<template>
  <div class="top_head">
    <div class="left">
      <div class="title">{{ top_head_title }}</div>
    </div>
    <div class="right" v-if="hide_head_top">
      <el-date-picker
        v-model="time"
        align="right"
        type="date"
        placeholder="选择日期"
        :editable="false"
        :picker-options="pickerOptions"
        value-format="timestamp"
        @change="changeTime"
      >
      </el-date-picker>
      <i class="el-icon-arrow-down"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    top_head_title: {
      type: String,
      default: " ",
    },
    hide_head_top: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      time: new Date(), // 默认显示当天日期
    };
  },
  methods: {
    changeTime(e) {
      // console.log(e);
      this.$emit('changeTime', e)
    },
  },
};
</script>

<style lang="scss" scoped>
.top_head {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .right {
    .el-date-editor.el-input {
      width: 140px;
    }
    .el-icon-arrow-down {
      padding-left: 8px;
    }
  }
}
</style>
