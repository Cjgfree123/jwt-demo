<template>
  <div class="login">
    <h1>登录</h1>
    <el-input style="width: 200px;" v-model="username"></el-input>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { login }from "../api/index.js";
export default {
  name: 'Login',
  data() {
    return {
      username: '',
    };
  },
  methods: {
    login(){
      this.$store.dispatch("login", this.username).then(data =>{
        this.$router.push("/profile");
      })
    }
  },
};
</script>
