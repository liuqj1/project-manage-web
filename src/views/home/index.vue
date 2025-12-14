<template>
  <div>
    <el-divider content-position="left">项目信息统计</el-divider>
    <el-row type="flex" :gutter="100" >

      <el-col :span="14" >
        <h4 style="text-align: center">成果状态及其数量：{{ achievementCount }}</h4>
        <ve-pie :data="achievementAndStatus"  :extend="chartExtend"/>
      </el-col>
      <el-col :span="14" >
        <h4 style="text-align: center">项目状态及其数量：{{ projectCount }}</h4>
        <ve-pie :data="ProjectAndStatus"  :extend="chartExtend"/>
      </el-col>
      <el-col :span="14" >
        <h4 style="text-align: center">经费概览（单位/元）：{{ expendCount }}</h4>
        <ve-pie :data="expendOverview"  :extend="chartExtend"/>
      </el-col>
    </el-row>
    <el-divider content-position="left">人员信息统计</el-divider>
    <el-row style="display: flex;justify-content: center">
      <el-col :span="9" >
        <h4 style="text-align: center">科研人员总人数：{{ userCount }}</h4>
        <ve-pie :data="userConsist"  :extend="chartExtend"/>
      </el-col>
      <el-col :span="7">
        <h4 style="text-align: center">成员参与的项目数量</h4>
        <ve-bar  :data="userInvolvedProjectNum"/>
      </el-col>
      <el-col :span="7">
        <h4 style="text-align: center">成员负责的项目数量</h4>
        <ve-bar  :data="userChargeProjectNum"/>
      </el-col>
    </el-row>
    <el-divider content-position="left">项目成果信息统计</el-divider>
    <el-row style="display: flex;justify-content: center;">
      <el-col :span="9" >
        <h4 style="text-align: center">已取得成果类型及其数量</h4>
        <ve-pie :data="achievementAndCount"  :extend="chartExtend"/>
      </el-col>
      <el-col :span="9" >
        <h4 style="text-align: center">成果质量及类型</h4>
        <ve-histogram
            :data="achievementAndQuality"
            :setting="columnarSet"
        ></ve-histogram>
      </el-col>
    </el-row>
  </div>
</template>

<script>


import {
  fetchAchievementAndCount, fetchAchievementAndQuality, fetchAchievementWithStatus, fetchExpendOverview,
  fetchLastGoldData, fetchPeopleChargeProjectNum, fetchPeopleProjectNum, fetchProjectWithStatus, fetchUserCount,
  fetchWeekActualPrice, fetchWeekForecastPrice
} from "@/api/home";
import {fetchData} from "@/api/test";
import mapGetters from "vuex/dist/vuex.mjs";

export default {

  name: "home",

  data() {
    return {
      goldData: [],
      userCount:'',
      achievementCount:'',
      projectCount:'',
      expendCount:'',

      forecastDeviation:{
        columns: ['日期', '误差值'],
        rows:[ { "日期": '1月1日', '误差值': 123 }],
      },
      achievementAndStatus:{
        columns: ['成果状态','数量'],
        rows:[]
      },
      ProjectAndStatus:{
        columns: ['项目状态','数量'],
        rows:[]
      },
      achievementAndCount:{
        columns:['成果类型','数量'],
        rows:[],
      },
      expendOverview:{
        columns:['经费','元'],
        rows:[],
      },
      userConsist:{
        columns:['性别','数量'],
        rows:[]
      },
      achievementAndQuality:{
        columns:['类型','劣','一般','良','优','卓越'],
        rows:[],
      },
      userChargeProjectNum:{
        columns:['姓名','数量'],
        rows:[]
      },
      userInvolvedProjectNum:{
        columns:['姓名','数量'],
        rows:[],
      },
      chartSettings: {
        // title: '近7日黄金价格预测图',
        // type: 'pie'

      },
      columnarSet: {
        //堆叠
        stack: { columnar: ["劣", "一般", "良","优","卓越"] },
        // 添加 series 配置项
        series: [
          { name: '劣', type: 'bar' },
          { name: '一般', type: 'bar' },
          { name: '良', type: 'bar' },
          { name: '优', type: 'bar' },
          { name: '卓越', type: 'bar' }
        ],
        yAxis: {
          min: 0,
          max: 100,
          interval: 10
        },
      },
      weekPredPrice: {
        columns: ['日期', 'Au(T+D)','Au100g','Au99.95','Au99.99','mAu(T+D)'],
        rows: [],
      },
      weekActPrice: {
        columns: ['日期', 'Au(T+D)','Au100g','Au99.95','Au99.99','mAu(T+D)'],
        rows: [],
      },

      chartData: {
        columns: ['日期', '销售额'],
        rows: []
      },
      chartExtend : {
        series: {
          smooth: false,
        },
        // legend: {
        //   bottom: 0,
        //   icon: 'line',
        //   itemGap: 30,
        // },
      },
    };
  },
  created() {

    fetchExpendOverview()
        .then(res=>{
          var data=res.data.data;
          this.expendOverview.rows.push({'经费':'剩余经费','元':data.expend});
          this.expendOverview.rows.push({'经费':'已使用经费','元':data.usedExpend});
          this.expendCount=Number(this.expendCount)+Number(data.expend)+Number(data.usedExpend);
        })
    fetchProjectWithStatus()
        .then(res=>{
          var data=res.data.data;
          for(let i=0;i<data.length;i++)
          {
            //console.log(data[i].statusCount);
            // 将字符串转换为整数后再相加
            this.projectCount = Number(this.projectCount) + Number(data[i].statusCount);
            if(data[i].status==='0')
              this.ProjectAndStatus.rows.push({'项目状态':'不通过','数量':data[i].statusCount});
            if(data[i].status==='1')
              this.ProjectAndStatus.rows.push({'项目状态':'申报中','数量':data[i].statusCount});
            if(data[i].status==='2')
              this.ProjectAndStatus.rows.push({'项目状态':'已立项','数量':data[i].statusCount});
            if(data[i].status==='3')
              this.ProjectAndStatus.rows.push({'项目状态':'已结题','数量':data[i].statusCount});
          }
          console.log(this.ProjectAndStatus);
        })
    fetchAchievementWithStatus()
        .then(res=>{
          var data=res.data.data;
          for(let i=0;i<data.length;i++)
          {
            //console.log(data[i].statusCount);
            // 将字符串转换为整数后再相加
            this.achievementCount = Number(this.achievementCount) + Number(data[i].statusCount);
            if(data[i].status==='0')
              this.achievementAndStatus.rows.push({'成果状态':'待审核','数量':data[i].statusCount});
            if(data[i].status==='1')
              this.achievementAndStatus.rows.push({'成果状态':'通过','数量':data[i].statusCount});
            if(data[i].status==='2')
              this.achievementAndStatus.rows.push({'成果状态':'不通过','数量':data[i].statusCount});
          }

        })
    fetchUserCount()
        .then(res=>{
          var data=res.data.data[0];
          this.userCount=data.userNum;
          this.userConsist.rows.push({'性别':'男','数量':data.manNum});
          this.userConsist.rows.push({'性别':'女','数量':data.womanNum});
        })
    fetchPeopleProjectNum()
        .then(res=>{
          var data=res.data.data;
          this.userInvolvedProjectNum.rows=data.map(item=>({
            '姓名': item.nickname,
            '数量': item.involvedProjectNum,
          }));
        })
    fetchPeopleChargeProjectNum()
        .then(res=>{
          var data=res.data.data;
          this.userChargeProjectNum.rows=data.map(item=>({
            '姓名': item.nickname,
            '数量': item.chargeProjectNum,
          }));
        })
    fetchAchievementAndCount()
        .then(res=>{
          var data=res.data.data;
          this.achievementAndCount.rows=data.map(item=>({
            '成果类型': item.typename,
            '数量': item.count,
          }));
        })
    fetchAchievementAndQuality()
        .then(res=>{
          var data=res.data.data;
          console.log(data);
          let data00=0,data01=0,data02=0,data03=0,data04=0,data10=0,data11=0,data12=0,data13=0,data14=0,
              data20=0,data21=0,data22=0, data23=0,data24=0,data30=0,data31=0,data32=0,data33=0,data34=0,
              data40=0,data41=0,data42=0,data43=0,data44=0;
          for(let i=0;i<data.length;i++)
          {
            switch (data[i].typename)
            {
              case "软件著作权":
                if(data[i].quality==0)
                  data00+=data[i].count;
                if(data[i].quality==1)
                  data01+=data[i].count;
                if(data[i].quality==2)
                  data02+=data[i].count;
                if(data[i].quality==3)
                  data03+=data[i].count;
                if(data[i].quality==4)
                  data04+=data[i].count;
                break;
              case "发明型专利":
                if(data[i].quality==0)
                  data10+=data[i].count;
                if(data[i].quality==1)
                  data11+=data[i].count;
                if(data[i].quality==2)
                  data12+=data[i].count;
                if(data[i].quality==3)
                  data13+=data[i].count;
                if(data[i].quality==4)
                  data14+=data[i].count;
                break;
              case "外观型专利":
                if(data[i].quality==0)
                  data20+=data[i].count;
                if(data[i].quality==1)
                  data21+=data[i].count;
                if(data[i].quality==2)
                  data22+=data[i].count;
                if(data[i].quality==3)
                  data23+=data[i].count;
                if(data[i].quality==4)
                  data24+=data[i].count;
                break;
              case "实用型专利":
                if(data[i].quality==0)
                  data30+=data[i].count;
                if(data[i].quality==1)
                  data31+=data[i].count;
                if(data[i].quality==2)
                  data32+=data[i].count;
                if(data[i].quality==3)
                  data33+=data[i].count;
                if(data[i].quality==4)
                  data34+=data[i].count;
                break;
              case "论文":
                if(data[i].quality==0)
                  data40+=data[i].count;
                if(data[i].quality==1)
                  data41+=data[i].count;
                if(data[i].quality==2)
                  data42+=data[i].count;
                if(data[i].quality==3)
                  data43+=data[i].count;
                if(data[i].quality==4)
                  data44+=data[i].count;
                break;
            }
          }

          this.achievementAndQuality.rows = [
            { '类型': '软件著作权', '劣': data00, '一般': data01, '良': data02,'优':data03 ,'卓越':data04 },
            { '类型': '发明型专利', '劣': data10, '一般': data11, '良': data12,'优':data13 ,'卓越':data14 },
            { '类型': '外观型专利', '劣': data20, '一般': data21, '良': data22,'优':data23 ,'卓越':data24 },
            { '类型': '实用型专利', '劣': data30, '一般': data31, '良': data32,'优':data33 ,'卓越':data34 },
            { '类型': '论文', '劣': data40, '一般': data41, '良': data42,'优':data43 ,'卓越':data44 },
          ];
        })

  },
  mounted() {
    let roleLevel = this.$store.getters.roleLevel
    if(roleLevel==='科研人员'){
      this.$router.push('/my_home')
    }
    if(roleLevel==='项目负责人'){
      this.$router.push('/my_home')
    }
  },
  methods: {}

}
</script>

<style scoped>
.closing-price {

  flex: 1;
  line-height: 90px;
  height: 90px;
  background-color: #05f805;
  text-align: center;
  /*margin: 5px;*/
  margin: 7px auto;
  border-radius: 7px;
}
</style>
