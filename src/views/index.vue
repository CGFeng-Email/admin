<template>
  <div class="home">
    <!-- 顶部 -->
    <div class="top_conent radius_box">
      <TOPHEAD top_head_title="核心指标"></TOPHEAD>
      <div class="data_list">
        <el-row>
          <el-col :span="6">
            <div class="box">
              <div class="name">今日 UV</div>
              <div class="value">79</div>
              <div class="ratio">
                同比上周
                <span class="radio_num top">8.04%</span>
                <i class="el-icon-caret-top top" v-if="true"></i>
                <i class="el-icon-caret-bottom bottom" v-else></i>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box">
              <div class="name">昨日 UV</div>
              <div class="value">79</div>
              <div class="ratio">
                同比上周
                <span class="radio_num bottom">8.04%</span>
                <i class="el-icon-caret-top top" v-if="false"></i>
                <i class="el-icon-caret-bottom bottom" v-else></i>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box">
              <div class="name">新用户</div>
              <div class="value">79</div>
              <div class="ratio">
                同比上周
                <span class="radio_num top">8.04%</span>
                <i class="el-icon-caret-top top" v-if="true"></i>
                <i class="el-icon-caret-bottom bottom" v-else></i>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box hide">
              <div class="name">近 7 日 UV</div>
              <div class="value">79</div>
              <div class="ratio">
                同比上周
                <span class="radio_num top">8.04%</span>
                <i class="el-icon-caret-top top" v-if="true"></i>
                <i class="el-icon-caret-bottom bottom" v-else></i>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 中间 -->
    <div class="center_content">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="c_left c_box radius_box">
            <TOPHEAD top_head_title="访问量趋势"></TOPHEAD>
            <div id="center_echarts" class="item"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="c_right c_box radius_box">
            <TOPHEAD
              top_head_title="产品好评度排行"
              :hide_head_top="false"
            ></TOPHEAD>
            <ul
              class="infinite-list item"
              v-infinite-scroll="load"
              style="overflow: auto"
            >
              <li
                v-for="(item, index) in evaluate_list"
                :key="index"
                class="infinite-list-item"
              >
                <span class="serial_number" :class="index <= 2 ? 'bg' : ''">{{
                  index + 1
                }}</span>
                <span class="name over1">语雀ANT VIST</span>
                <el-progress class="el_box" :percentage="50"></el-progress>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 底部 -->
    <div class="bottom_content">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="b_left b_box radius_box">
            <TOPHEAD top_head_title="用户来源"></TOPHEAD>
            <div id="b_left_echarts" class="b_item"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="b_center b_box radius_box">
            <TOPHEAD top_head_title="资源访问统计" :hide_head_top="false"></TOPHEAD>
            <div id="b_center_echarts" class="b_item"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="b_right b_box radius_box">
            <TOPHEAD top_head_title="性别比例" :hide_head_top="false"></TOPHEAD>
            <div id="sex_box" class="b_item"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 联系我们 -->
    <div class="contact_us_content">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="box radius_box">
            <TOPHEAD top_head_title="用户分布" :hide_head_top="false"></TOPHEAD>
            <div id="contact_us_map" class="item"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box radius_box">
            <TOPHEAD top_head_title="热门搜索" :hide_head_top="false"></TOPHEAD>
            <div id="keyword_echarts" class="item"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box radius_box">
            <TOPHEAD top_head_title="联系我们" :hide_head_top="false"></TOPHEAD>
            <div class="item">
              <div class="contact_us_top">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <img
                      class="code_img"
                      src="../../src/assets/images/code1.png"
                      alt=""
                    />
                    <p class="code_text">客服咨询</p>
                  </el-col>
                  <el-col :span="12">
                    <img
                      class="code_img"
                      src="../../src/assets/images/code2.png"
                      alt=""
                    />
                    <p class="code_text">维护技术</p>
                  </el-col>
                </el-row>
              </div>
              <div class="contact_us_content">
                展望未来,市场竞争日益加剧,充满了无穷的机会与挑战我们不应该满足于现有的成功,而是以此为基点,向着新的目标,满怀信心,同心协力,积极进取。
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import wordcloud from "echarts-wordcloud"; // 词云ectarts依赖
//下边这两行尤为重要，数据才能正常渲染
import china from "echarts/map/json/china.json"; // 地图echarts依赖
echarts.registerMap("china", china); // 地图echarts依赖
import TOPHEAD from "@/components/top_head/index";
export default {
  name: "Index",
  components: {
    TOPHEAD,
  },
  data() {
    return {
      evaluate_list: 30,
      load: false,
    };
  },
  async mounted() {
    await this.center_content_left();
    await this.b_left_echarts_fn();
    await this.b_center_echarts_fn();
    await this.sex_echarts_fn();
    await this.contact_us_map_fn();
    await this.keyword_echarts_fn();
  },
  methods: {
    center_content_left() {
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById("center_echarts");
      var myChart = echarts.init(chartDom);
      var option;
      // 绘制图表
      var DataA = ["12", "15", "20", "17", "13", "10", "12"];
      var DataDM = [
        "2023/03/15",
        "2023/03/16",
        "2023/03/17",
        "2023/03/18",
        "2023/03/19",
        "2023/03/20",
        "2023/03/21",
      ];
      option = {
        // backgroundColor: "#344b58",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            textStyle: {
              color: "#fff",
            },
          },
          //formatter: '{b}<br />{a}: {c}人',
          //backgroundColor: 'rgba(0,0,0,0.7)', //提示背景
        },
        grid: {
          left: 50,
          right: 35,
          top: 10,
          bottom: 30,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#666",
                width: 1,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#666",
                padding: [10, 0, 0, 0],
                fontSize: 12,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: DataDM,
          },
        ],
        yAxis: [
          {
            nameTextStyle: {
              color: "#666",
              fontSize: 12,
              padding: [0, 0, 0, 0],
              lineHeight: 40,
            },
            min: 0,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(200,200,200,.5)",
                type: "dashed",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#666",
                padding: 16,
                fontSize: 12,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "访问量",
            type: "line",
            showAllSymbol: true,
            symbolSize: 8,
            symbol: "circle",
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: "#409EFF",
              },
              borderColor: "rgba(0,0,0,.4)",
            },
            itemStyle: {
              color: "#409EFF",
            },
            tooltip: {
              show: true,
            },
            data: DataA,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    b_left_echarts_fn() {
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById("b_left_echarts");
      var myChart = echarts.init(chartDom);
      var option;
      var YeaTItem = ["2023年", "去年同期"];
      var CiteyX = ["美国", "欧盟", "东盟"];

      var Year2023 = [2601.65, 2706.57, 853.77];
      var Year2022 = [1963.4, 1143.29, 167.31];
      option = {
        // backgroundColor: 'blurScope',
        title: {
          // text: '时段-进出港流量',
          left: "5%",
          top: "5%",
          textStyle: {
            color: "#666",
            fontSize: "18px",
          },
        },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //     type: 'shadow',
          // },
        },
        legend: [
          {
            icon: "react",
            right: "5%",
            top: "5%",
            textStyle: {
              color: "#666",
              fontSize: 12,
            },
            itemGap: 30,
            itemWidth: 20,
            itemHeight: 4,
            data: YeaTItem,
          },
        ],
        grid: {
          top: "10%",
          right: "3%",
          left: "10%",
          bottom: "12%",
        },
        xAxis: [
          {
            type: "category",
            data: CiteyX,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              margin: 10,
              color: "#666",
              textStyle: {
                fontSize: 12,
              },
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
              color: "#666",
              textStyle: {
                fontSize: 12,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                // 使用深浅的间隔色
                color: "#e3e3e3",
              },
            },
          },
        ],
        series: [
          {
            name: YeaTItem[0],
            type: "bar",
            data: Year2023,
            // markPoint : {
            //     data : [
            //         {type : 'max', name: '最大值'},
            //         {type : 'min', name: '最小值'}
            //     ],
            // },

            barWidth: "20px",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#0085E8",
                      //  0%  处的颜色
                    },
                  ],
                },
                barBorderRadius: [30, 30, 0, 0],
              },
            },
            // label: {
            //     normal: {
            //         show: true,
            //     },
            // },
          },
          {
            name: YeaTItem[1],
            type: "bar",
            data: Year2022,
            barWidth: "20px",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#DCEFFF",
                      //  0%  处的颜色
                    },
                  ],
                },
                barBorderRadius: [30, 30, 0, 0],
              },
            },
            label: {
              normal: {
                show: false,
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    b_center_echarts_fn() {
      var chartDom = document.getElementById("b_center_echarts");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        backgroundColor: "#fff",
        title: {
          text: "报警总量",
          subtext: "31242",
          x: "center",
          y: "41%",
          textStyle: {
            fontWeight: "normal",
            fontSize: 14,
            color: "#999999",
          },
          subtextStyle: {
            fontSize: 22,
            color: "#1890ff",
          },
        },
        color: [
          "#0090ff",
          "#06d3c4",
          "#ffbc32",
          "#2ccc44",
          "#ff3976",
          "#6173d6",
          "#ff9f7e",
          "#5f71d2",
          "#f36f8a",
          "#5fd27b",
          "#6173d6",
          "#47dfae",
          "#4ac7f5",
          "#f36f8a",
          "#42a4eb",
          "#426eeb",
          "#5f71d2",
          "#f36f8a",
        ],
        legend: {
          orient: "horizontal",
          x: "center",
          top: "bottom",

          itemWidth: 16,
          itemHeight: 16,
          itemGap: 16,
        },

        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b}：{c}个<br/>占比：({d}%)",
        },
        series: [
          {
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#ffffff",
                borderWidth: 0,
              },
            },
            type: "pie",

            stillShowZeroSum: true,
            radius: ["50%", "84%"],
            label: {
              normal: {
                position: "inner",
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 12,
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 110,
                name: "信息",
                itemStyle: {},
              },
              {
                value: 222,
                name: "灾难",
                itemStyle: {},
              },
              {
                value: 113,
                name: "严重",
                itemStyle: {},
              },
              {
                value: 122,
                name: "未分类",
                itemStyle: {},
              },
              {
                value: 122,
                name: "告警",
                itemStyle: {},
              },
              {
                value: 132,
                name: "一般严重",
                itemStyle: {},
              },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    },
    sex_echarts_fn() {
      var chartDom = document.getElementById("sex_box");
      var myChart = echarts.init(chartDom);
      var option;
      var m2R2Data = [
        {
          value: 335,
          legendname: "未知",
          name: "未知  335",
          itemStyle: { color: "#ccc" },
        },
        {
          value: 310,
          legendname: "男",
          name: "男 310",
          itemStyle: { color: "#5085f2" },
        },
        {
          value: 234,
          legendname: "女",
          name: "女  234",
          itemStyle: { color: "#e75fc3" },
        },
      ];

      option = {
        title: [
          {
            // text: "总人数",
            textStyle: {
              fontSize: 16,
              color: "black",
            },
            left: "2%",
          },
          {
            text: "合计",
            subtext: 455 + "个",
            textStyle: {
              fontSize: 20,
              color: "black",
            },
            subtextStyle: {
              fontSize: 20,
              color: "black",
            },
            textAlign: "center",
            x: "34.5%",
            y: "44%",
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: function (parms) {
            var str =
              parms.seriesName +
              "</br>" +
              parms.marker +
              "" +
              parms.data.legendname +
              "</br>" +
              "数量：" +
              parms.data.value +
              "</br>" +
              "占比：" +
              parms.percent +
              "%";
            return str;
          },
        },
        legend: {
          orient: "vertical",
          left: "70%",
          align: "left",
          top: "middle",
          textStyle: {
            color: "#8C8C8C",
          },
          height: 250,
        },
        series: [
          {
            name: "标题",
            type: "pie",
            center: ["35%", "50%"],
            radius: ["45%", "75%"],
            clockwise: false, //饼图的扇区是否是顺时针排布
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outter",
                formatter: function (parms) {
                  return parms.data.legendname;
                },
              },
            },
            labelLine: {
              show: false,
              normal: {
                length: 5,
                length2: 3,
                smooth: false,
              },
            },
            data: m2R2Data,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    contact_us_map_fn() {
      var chartDom = document.getElementById("contact_us_map");
      var myChart = echarts.init(chartDom);
      var option;
      // 中国地图 散点分布 点击散点触发 自定义样式的 tooltip
      // 借鉴 https://gallery.echartsjs.com/editor.html?c=xnmZ5X4gCz

      // 散点数据
      var data = [
        {
          name: "北京移动数据中心-马连道机房",
          value: ["116.489356", "39.94083"],
          date: "2019-10-01",
          city: "北京市",
        },
      ];
      var data2 = [
        { name: "北京", value: 177 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 66 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];
      option = {
        // backgroundColor: "#efefef",
        tooltip: {
          show: true,
          trigger: "item",
          triggerOn: "click",
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none",
          },
          formatter: function (params) {
            console.log(params);
            const { data } = params;
            const type = data.type;
            let typeName = "数据中心";
            const tipHtml = ` <div style="width: 280px; background: rgba(22, 80, 158, 0.8); border: 1px solid rgba(7, 166, 255, 0.7);">
                                <div style="color: #fff; padding: 10px; font-size: 16px; border-bottom: 2px solid #0c8bdd;">${data.name}</div>
                                <p style="color: #fff;padding: 5px 10px;font-size: 14px;">建设位置：${data.city}</p>
                                <p style="color: #fff;padding: 5px 10px;font-size: 14px;">建设时间：${data.date}</p>
                                <p style="color: #fff;padding: 5px 10px;font-size: 14px;">设施类型：${typeName}</p>
                              </div>`;
            return tipHtml;
          },
        },
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#00467F", "#A5CC82"], // 蓝绿
          },
        },
        geo: {
          show: true,
          map: "china",
          label: {
            normal: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              color: "#000000",
              fontSize: 14,
              show: true,
            },
          },
          roam: true,
          scaleLimit: {
            min: 1.2,
            max: 15,
          },
          zoom: 1.2,
          itemStyle: {
            normal: {
              borderWidth: 1, // 区域边框宽度
              borderColor: "#029fd4", // 区域边框颜色
              areaColor: "#2F639A", // 区域颜色
            },
            emphasis: {
              areaColor: "#2F639A",
            },
          },
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: data,
            symbol: "pin",
            symbolSize: 30,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "#33C481",
              },
              emphasis: {
                color: "#f00",
              },
            },
          },
          {
            type: "map",
            map: "china",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: "scale",
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: data2,
          },
        ],
      };
      myChart.on("click", (params) => {
        if (
          params.componentType === "series" &&
          params.componentSubType === "scatter"
        ) {
          const index = params.dataIndex;
          // 取消所有散点高亮
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0, //第几条series
          });
          // 显示指定data 的tooltip
          // myChart.dispatchAction({
          //     type: 'showTip',
          //     seriesIndex: 0, //第几条series
          //     dataIndex: index, //第几个tooltip
          // });
          // 高亮指定的散点
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0, //第几条series
            dataIndex: index, //第几个tooltip
          });
        }
      });

      option && myChart.setOption(option);
    },
    keyword_echarts_fn() {
      var chartDom = document.getElementById("keyword_echarts");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        /* tooltip: {
          show: true,
        }, */
        grid: {
          top: "10px",
          left: "10px",
          right: "10px",
          bottom: "10px",
        },
        toolbox: {
          feature: {
            saveAsImage: {
              iconStyle: {
                normal: {
                  color: "#FFFFFF",
                },
              },
            },
          },
        },
        series: [
          {
            name: "热点分析",
            type: "wordCloud",
            width: "98%",
            height: "98%",
            size: ["9%", "99%"],
            sizeRange: [6, 66],
            textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6,
            },
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: [],
          },
        ],
      };

      var JosnList = [
        {
          name: "Jayfee",
          value: 666,
        },
        {
          name: "Nancy",
          value: 520,
        },
        {
          name: "生活资源",
          value: "999",
        },
        {
          name: "供热管理",
          value: "888",
        },
        {
          name: "供气质量",
          value: "777",
        },
        {
          name: "生活用水管理",
          value: "688",
        },
        {
          name: "一次供水问题",
          value: "588",
        },
        {
          name: "交通运输",
          value: "516",
        },
        {
          name: "城市交通",
          value: "515",
        },
        {
          name: "环境保护",
          value: "483",
        },
        {
          name: "房地产管理",
          value: "462",
        },
        {
          name: "城乡建设",
          value: "449",
        },
        {
          name: "社会保障与福利",
          value: "429",
        },
        {
          name: "社会保障",
          value: "407",
        },
        {
          name: "文体与教育管理",
          value: "406",
        },
        {
          name: "公共安全",
          value: "406",
        },
        {
          name: "公交运输管理",
          value: "386",
        },
        {
          name: "出租车运营管理",
          value: "385",
        },
        {
          name: "供热管理",
          value: "375",
        },
        {
          name: "市容环卫",
          value: "355",
        },
        {
          name: "自然资源管理",
          value: "355",
        },
        {
          name: "粉尘污染",
          value: "335",
        },
        {
          name: "噪声污染",
          value: "324",
        },
        {
          name: "土地资源管理",
          value: "304",
        },
        {
          name: "物业服务与管理",
          value: "304",
        },
        {
          name: "医疗卫生",
          value: "284",
        },
        {
          name: "粉煤灰污染",
          value: "284",
        },
        {
          name: "占道",
          value: "284",
        },
        {
          name: "供热发展",
          value: "254",
        },
        {
          name: "农村土地规划管理",
          value: "254",
        },
        {
          name: "生活噪音",
          value: "253",
        },
        {
          name: "供热单位影响",
          value: "253",
        },
        {
          name: "城市供电",
          value: "223",
        },
        {
          name: "房屋质量与安全",
          value: "223",
        },
        {
          name: "大气污染",
          value: "223",
        },
        {
          name: "房屋安全",
          value: "223",
        },
        {
          name: "文化活动",
          value: "223",
        },
        {
          name: "拆迁管理",
          value: "223",
        },
        {
          name: "公共设施",
          value: "223",
        },
        {
          name: "供气质量",
          value: "223",
        },
        {
          name: "供电管理",
          value: "223",
        },
        {
          name: "燃气管理",
          value: "152",
        },
        {
          name: "教育管理",
          value: "152",
        },
        {
          name: "医疗纠纷",
          value: "152",
        },
        {
          name: "执法监督",
          value: "152",
        },
        {
          name: "设备安全",
          value: "152",
        },
        {
          name: "政务建设",
          value: "152",
        },
        {
          name: "县区、开发区",
          value: "152",
        },
        {
          name: "宏观经济",
          value: "152",
        },
        {
          name: "教育管理",
          value: "112",
        },
        {
          name: "社会保障",
          value: "112",
        },
        {
          name: "生活用水管理",
          value: "112",
        },
        {
          name: "物业服务与管理",
          value: "112",
        },
        {
          name: "分类列表",
          value: "112",
        },
        {
          name: "农业生产",
          value: "112",
        },
        {
          name: "二次供水问题",
          value: "112",
        },
        {
          name: "城市公共设施",
          value: "92",
        },
        {
          name: "拆迁政策咨询",
          value: "92",
        },
        {
          name: "物业服务",
          value: "92",
        },
        {
          name: "物业管理",
          value: "92",
        },
        {
          name: "社会保障保险管理",
          value: "92",
        },
        {
          name: "低保管理",
          value: "92",
        },
        {
          name: "文娱市场管理",
          value: "72",
        },
        {
          name: "城市交通秩序管理",
          value: "72",
        },
        {
          name: "执法争议",
          value: "72",
        },
        {
          name: "商业烟尘污染",
          value: "72",
        },
        {
          name: "占道堆放",
          value: "71",
        },
        {
          name: "地上设施",
          value: "71",
        },
        {
          name: "水质",
          value: "71",
        },
        {
          name: "无水",
          value: "71",
        },
        {
          name: "供热单位影响",
          value: "71",
        },
        {
          name: "人行道管理",
          value: "71",
        },
        {
          name: "主网原因",
          value: "71",
        },
        {
          name: "集中供热",
          value: "71",
        },
        {
          name: "客运管理",
          value: "71",
        },
        {
          name: "国有公交（大巴）管理",
          value: "71",
        },
        {
          name: "工业粉尘污染",
          value: "71",
        },
        {
          name: "治安案件",
          value: "71",
        },
        {
          name: "压力容器安全",
          value: "71",
        },
        {
          name: "身份证管理",
          value: "71",
        },
        {
          name: "群众健身",
          value: "41",
        },
        {
          name: "工业排放污染",
          value: "41",
        },
        {
          name: "破坏森林资源",
          value: "41",
        },
        {
          name: "市场收费",
          value: "41",
        },
        {
          name: "生产资金",
          value: "41",
        },
        {
          name: "生产噪声",
          value: "41",
        },
        {
          name: "农村低保",
          value: "41",
        },
        {
          name: "劳动争议",
          value: "41",
        },
        {
          name: "劳动合同争议",
          value: "41",
        },
        {
          name: "劳动报酬与福利",
          value: "41",
        },
        {
          name: "医疗事故",
          value: "21",
        },
        {
          name: "停供",
          value: "21",
        },
        {
          name: "基础教育",
          value: "21",
        },
        {
          name: "职业教育",
          value: "21",
        },
        {
          name: "物业资质管理",
          value: "21",
        },
        {
          name: "拆迁补偿",
          value: "21",
        },
        {
          name: "设施维护",
          value: "21",
        },
        {
          name: "市场外溢",
          value: "11",
        },
        {
          name: "占道经营",
          value: "11",
        },
        {
          name: "树木管理",
          value: "11",
        },
        {
          name: "农村基础设施",
          value: "11",
        },
        {
          name: "无水",
          value: "11",
        },
        {
          name: "供气质量",
          value: "11",
        },
        {
          name: "停气",
          value: "11",
        },
        {
          name: "市政府工作部门（含部门管理机构、直属单位）",
          value: "11",
        },
        {
          name: "燃气管理",
          value: "11",
        },
        {
          name: "市容环卫",
          value: "11",
        },
        {
          name: "新闻传媒",
          value: "11",
        },
        {
          name: "人才招聘",
          value: "11",
        },
        {
          name: "市场环境",
          value: "11",
        },
        {
          name: "行政事业收费",
          value: "11",
        },
        {
          name: "食品安全与卫生",
          value: "11",
        },
        {
          name: "城市交通",
          value: "11",
        },
        {
          name: "房地产开发",
          value: "11",
        },
        {
          name: "房屋配套问题",
          value: "11",
        },
        {
          name: "物业服务",
          value: "11",
        },
        {
          name: "物业管理",
          value: "11",
        },
        {
          name: "占道",
          value: "11",
        },
        {
          name: "园林绿化",
          value: "11",
        },
        {
          name: "户籍管理及身份证",
          value: "11",
        },
        {
          name: "公交运输管理",
          value: "11",
        },
        {
          name: "公路（水路）交通",
          value: "11",
        },
        {
          name: "房屋与图纸不符",
          value: "11",
        },
        {
          name: "有线电视",
          value: "11",
        },
        {
          name: "社会治安",
          value: "11",
        },
        {
          name: "林业资源",
          value: "11",
        },
        {
          name: "其他行政事业收费",
          value: "11",
        },
        {
          name: "经营性收费",
          value: "11",
        },
        {
          name: "食品安全与卫生",
          value: "11",
        },
        {
          name: "体育活动",
          value: "11",
        },
        {
          name: "有线电视安装及调试维护",
          value: "11",
        },
        {
          name: "低保管理",
          value: "11",
        },
        {
          name: "劳动争议",
          value: "11",
        },
        {
          name: "社会福利及事务",
          value: "11",
        },
        {
          name: "一次供水问题",
          value: "11",
        },
      ];

      option.series[0].data = JosnList;

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  padding: 20px;
  background: #f5f5f5;
  .top_conent {
    padding: 20px;
    background: #fff;
    .data_list {
      padding-top: 20px;
      .box {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: 20px;
          width: 1px;
          height: 88%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.1);
        }
        .value {
          font-size: 28px;
          font-weight: 700;
          padding: 6px 0;
        }
        .ratio {
          color: #909399;
          font-size: 12px;
          .top {
            color: #f56c6c;
          }
          .bottom {
            color: #67c23a;
          }
        }
      }
      .hide {
        &::before {
          display: none;
        }
      }
    }
  }
  .center_content {
    margin-top: 20px;
    .c_box {
      background: #fff;
      .item {

      }
      #center_echarts {
        height: 280px;
        margin-top: 20px;
      }
      .infinite-list {
        height: 300px;
        padding: 0;
        margin: 0;
        .infinite-list-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          .serial_number {
            width: 20px;
            height: 20px;
            background: #dcdfe6;
            color: #fff;
            text-align: center;
            line-height: 20px;
            border-radius: 50%;
            font-size: 12px;
          }
          .bg {
            background: #3e5263;
          }
          .name {
            width: 38%;
            font-size: 14px;
            color: #303133;
            padding: 0 8px;
            font-weight: 600;
          }
          .el_box {
            flex: 1;
          }
        }
      }
    }
  }
  .bottom_content {
    margin-top: 20px;
    .b_box {
      background: #fff;
    }
    .b_item {
      height: 300px;
    }
  }
  .contact_us_content {
    margin-top: 20px;
    .box {
      background: #fff;
      .item {
        height: 380px;
        .contact_us_top {
          padding-top: 20px;
          .code_img {
            width: 100%;
          }
          .code_text {
            text-align: center;
            margin: 0;
          }
        }
        .contact_us_content {
          text-indent: 2em;
          font-size: 14px;
          line-height: 26px;
        }
      }
    }
  }
}
</style>
