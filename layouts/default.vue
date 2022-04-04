<template>
  <el-container>
    <el-header>
      <NavbarSection />
    </el-header>
    <el-main class="main-container">
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import NavbarSection from "~/components/navbar.vue";

export default {
  components: {
    NavbarSection,
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.el-main {
  overflow: hidden !important;
  padding: 0 !important;
}
.el-dialog {
  border-radius: 16px !important;
}
.el-dialog__body {
  padding: 10px 25px !important;
}
.el-dialog__title {
  font-weight: bold;
  color: #c63127 !important;
}
.el-input.is-disabled .el-input__inner {
  color: rgba(198, 49, 39, 0.50196) !important;
}
</style>
