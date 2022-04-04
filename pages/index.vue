<template>
  <div class="container">
    <div style="padding: 15px" class="input-container">
      <el-input
        placeholder="请输入内容"
        v-model="inputName"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchDomainName"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import "~/static/reset.css";
import card from "~/components/card.vue";
import { fetchAllBooks, setLibraryContract, getTronWeb } from "~/plugins/utils";
import { sampleTx } from "~/plugins/walletConnect";
import {} from "~/plugins/sns";

export default {
  components: {
    card,
  },

  async mounted() {
    // get tronWeb object
    this.posts = getTronWeb();
    // init contract object
    // await setLibraryContract();
    // fetch all books
    // const books = await fetchAllBooks();
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
      await queryDomainName(this.inputName);
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
  max-width: 400px;
  margin: 0 auto;
}
</style>
