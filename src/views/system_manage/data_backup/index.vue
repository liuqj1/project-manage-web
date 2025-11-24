<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-row style="padding-left: 20px; margin-top: 20px; margin-bottom: 30px">
          <div style="display: flex; align-items: center;">
            <span class="function-title">自动备份</span>
            <el-switch v-model="isAuto" active-color="#13ce66" @change="handleChange" style="margin-left: 30px"></el-switch>
          </div>
          <p class="desc-title" style="margin-top: 30px; margin-bottom: 30px;">开启后每24小时自动备份一次</p>

        </el-row>
        <el-row style="padding-left: 20px; margin-bottom: 30px; margin-top: 30px">
          <div style="display: flex; align-items: center;">
            <span class="function-title">手动备份</span>
            <el-button type="primary" @click="handleClick" style="margin-left: 20px">导 出</el-button>
          </div>
          <p class="desc-title" style="margin-top: 30px; margin-bottom: 30px;">对数据库的结构和数据备份</p>

        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {addUserRole, dataBackup} from "@/api/role";
import {format} from "date-fns";

export default {
  data() {
    return {
      isAuto: true,
    }
  },
  methods: {
    handleChange() {
      if(this.isAuto==true)
      {
        this.$message({
          type: 'success',
          message: '已开启'
        })
      }
      else
      {
        this.$message({
          type: 'warning',
          message: '已关闭'
        })
      }
    },
    handleClick()
    {
      dataBackup()
          .then(response => {
            const now = new Date();
            const { format } = require('date-fns');
            var formattedDate = format(now, "yyyy-MM-dd-HH-mm-ss");
            // 创建一个临时 URL 用于下载
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // 创建一个隐藏的 <a> 标签
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // 设置文件名
            a.download = 'keshe'+formattedDate+'.sql';
            // 将 <a> 标签添加到文档中
            document.body.appendChild(a);
            // 模拟点击 <a> 标签以触发下载
            a.click();
            // 移除 <a> 标签
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          })
          .catch(error => {
            console.error('Error downloading file:', error);
          });
    }

  },
}
</script>

<style scoped>
.function-title {
  font-size: 24px;
  font-weight: 400;
}
.desc-title {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}
</style>