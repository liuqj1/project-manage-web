
<template>
  <div>
    <el-page-header @back="goBack" content="新增新闻详情">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="新闻编号">
        <el-input v-model="news.id"></el-input>
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-input v-model="news.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻标签">
        <el-checkbox-group v-model="news.tag">
          <el-checkbox label="美食/餐厅线上活动" name="tag"></el-checkbox>
          <el-checkbox label="地推活动" name="tag"></el-checkbox>
          <el-checkbox label="线下主题活动" name="tag"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="tag"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="news.content"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="news.picture"></el-input>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio-group v-model="news.status">
          <el-radio label="已发布"></el-radio>
          <el-radio label="未发布"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="news.releaseTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="news.creator"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
        <el-button>重置</el-button>
        <el-button>关闭</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
export default {
  data() {
    return {
      news: {
        id: '',
        title: '',
        tag: [],
        content: '',
        picture: '',
        status: '',
        releaseTime: '',
        creator: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    goBack() {
      this.$router.go(-1); // 返回上一个页面
    }
  }
}
</script>