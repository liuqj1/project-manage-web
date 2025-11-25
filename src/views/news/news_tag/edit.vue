
<template>
  <div>
    <el-page-header @back="goBack" content="编辑新闻详情">
    </el-page-header>
    <el-form ref="form" :model="newsTag" label-width="80px">
      <el-form-item label="标签编号">
        <el-input v-model="newsTag.id"></el-input>
      </el-form-item>
      <el-form-item label="标签名称">
        <el-input v-model="newsTag.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="newsTag.status">
          <el-radio label="已发布"></el-radio>
          <el-radio label="未发布"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="newsTag.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="newsTag.creator"></el-input>
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
      newsTag: {
        date: '2016-05-02',
        id: '1',
        name: '类型1',
        status: '正常',
        creator: 'admin',
        note: '测试'
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