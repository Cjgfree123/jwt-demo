<template>
  <div class="login">
    <h1>登录</h1>
    <el-input style="width: 200px;" v-model="username"></el-input>
    <el-button>登录</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Login',
  data() {
    return {
      username: '',
    };
  },
};
</script>
