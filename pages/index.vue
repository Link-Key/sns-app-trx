<template>
  <div class="container">
    <div style="padding: 15px" class="input-container">
      <el-input
        placeholder="Please input your search name"
        v-model="inputName"
        class="input-with-select"
      >
      </el-input>

      <el-button
        :loading="false"
        slot="append"
        @click="searchDomainName"
        icon="el-icon-search"
      >
        Search
      </el-button>
    </div>
  </div>
</template>

<script>
import "~/static/reset.css";
import card from "~/components/card.vue";
import {
  setupTronWeb,
} from "../plugins/utils";
import { recordExists, registry } from "../plugins/sns";
import { sampleTx } from "../plugins/walletConnect";

export default {
  components: {
    card,
  },

  async mounted() {
    // get tronWeb object
    setupTronWeb();
  },
  data() {
    return {
      posts: [],
      inputName: "",
    };
  },
  methods: {
    async sendTx() {
      await sampleTx();
    },
    async searchDomainName() {
      let existStatus;
      existStatus = await recordExists(this.inputName);
      console.log("exist", existStatus);
    },
    async registry() {
      let mintStatus;
      mintStatus = await registry(this.inputName + ".key");
      console.log("mint status", mintStatus);
    },
  },
};
</script>

<style>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 150;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-white {
  background: #fff;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 200px;
  display: block;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.input-container {
  display: flex;
  max-width: 60vw;
  margin: 0 auto;
}

.input-with-select {
  height: 60px;
  margin-right: 10px;
}

.input-with-select > input {
  width: 40vw;
  height: 60px;
  color: #c63127;
  font-size: 16px;
  font-weight: 500;
  border-radius: 16px;
}

.el-input__inner:focus {
  border: 1px solid #c63127;
}

.el-input__inner::placeholder {
  font-size: 16px;
  font-weight: 500;
  color: rgba(198, 49, 39, 0.5);
}
/* 谷歌 */
.el-input__inner::-webkit-input-placeholder {
  color: rgba(198, 49, 39, 0.5);
}
/* 火狐 */
.el-input__inner:-moz-placeholder {
  color: rgba(198, 49, 39, 0.5);
}
/*ie*/
.el-input__inner:-ms-input-placeholder {
  color: rgba(198, 49, 39, 0.5);
}

.el-input__inner::placeholder:focus {
  color: rgb(198, 49, 39);
}

.el-button {
  width: 150px;
  height: 60px;
  border-radius: 16px;
}

.el-button:hover {
  
}
</style>
