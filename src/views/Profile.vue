<template>
  <div class="profile">
    <h2>用户名: {{this.$store.state.username}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Profile',
};
</script>
