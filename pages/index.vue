<template>
  <div class="container">
    <div class="bigLogoContainer">
      <el-alert
        class="alert"
        title="Please connect to TRON Shasta test network !"
        type="warning"
      >
      </el-alert>
      <div class="bigLogo"></div>
      <div class="bigLogoText">EVERYONE NEEDS TO REGISTER FOR THE WEB3.0</div>
    </div>

    <div style="padding: 15px" class="input-container">
      <el-input
        placeholder="Search name"
        v-model="inputName"
        class="input-with-select"
      >
      </el-input>

      <el-button
        :loading="false"
        slot="append"
        @click="searchDomainName"
        icon="el-icon-search"
        :disabled="inputName.length === 0"
      >
        Search
      </el-button>
    </div>

    <el-dialog
      title="Register Name"
      :visible.sync="dialogVisible"
      width="300px"
      center
      :before-close="handleClose"
      top="30vh"
      custom-class="modalContainer"
    >
      <el-input v-model="inputName" disabled>{{ this.inputName }}</el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registry" :loading="mintLoading">
          Mint
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "~/static/reset.css";
import card from "~/components/card.vue";
import { setupTronWeb } from "../plugins/utils";
import { recordExists, registry } from "../plugins/sns";
import { sampleTx } from "../plugins/walletConnect";

export default {
  components: {
    // card,
  },

  async mounted() {
    // get tronWeb object
    setupTronWeb();
  },
  data() {
    return {
      posts: [],
      inputName: "",
      dialogVisible: false,
      mintLoading: false,
    };
  },
  methods: {
    async sendTx() {
      await sampleTx();
    },
    async searchDomainName() {
      let existStatus;
      try {
        existStatus = await recordExists(this.inputName);
        console.log("exist", existStatus);
        if (existStatus) {
          this.$message({
            message: "Name registered",
            center: true,
            type: "warning",
          });
        } else {
          this.dialogVisible = true;
        }
      } catch (e) {
        console.log("recordExists:", e);
      }
    },
    async registry() {
      this.mintLoading = true;
      let mintStatus;
      try {
        mintStatus = await registry(this.inputName + ".key");
        console.log("mint status", mintStatus);
      } catch (e) {
        console.log("registry error:", e);
      }
      this.mintLoading = false;
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
.container {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.bigLogoContainer {
  position: absolute;
  top: 20vh;
}

.bigLogoContainer .alert {
  position: absolute;
  top: -250px;
}

.bigLogoContainer .bigLogoText {
  font-family: Overpass;
  font-weight: 800;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  letter-spacing: 1.8px;
}

.bigLogoContainer .bigLogo {
  width: 223px;
  height: 164px;
  margin: 20px auto;
  background-image: url("../assets/SNSHomeImg.svg");
}

.el-button {
  border-radius: 16px;
}

/* input container styles */
.input-container {
  display: flex;
  max-width: 60vw;
  margin: 0 auto;
  justify-content: center;
}

/* input styles */
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
  transition: all 0.3s ease;
}
.el-input__inner:focus::placeholder {
  color: transparent;
  transition: all 0.3s ease;
}
.el-input__inner::placeholder {
  font-size: 16px;
  font-weight: 500;
  color: rgba(198, 49, 39, 0.5);
}
/* 谷歌 */
.el-input__inner::-webkit-input-placeholder {
  font-size: 16px;
  font-weight: 500;
  color: rgba(198, 49, 39, 0.5);
}
/* 火狐 */
.el-input__inner:-moz-placeholder {
  font-size: 16px;
  font-weight: 500;
  color: rgba(198, 49, 39, 0.5);
}
/*ie*/
.el-input__inner:-ms-input-placeholder {
  font-size: 16px;
  font-weight: 500;
  color: rgba(198, 49, 39, 0.5);
}
.el-input__inner::placeholder:focus {
  font-size: 16px;
  font-weight: 500;
  color: rgb(198, 49, 39);
}

/* button styles */
.input-container .el-button {
  width: 150px;
  height: 60px;
  border-radius: 16px;
  font-weight: bold;
  color: #c63127;
  border: 1px solid #fff;
  background-color: #fff;
}
.input-container .el-button[disabled="disabled"] {
  border: 1px solid #fff;
  color: #c6312780;
}
.input-container .el-icon-search {
  font-weight: bold;
}
.input-container .el-button:hover {
  color: #fff;
  border: 1px solid #c63127;
  background-color: #c63127;
  transition: all 0.3s ease;
}
.input-container .el-button[disabled="disabled"]:hover {
  color: #c0c4cc;
  border: 1px solid #ebeef5;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

/* modal styles */
.modalContainer {
  border-radius: 16px;
}
.modalContainer .el-dialog__title {
  font-weight: bold;
  color: #c63127;
}
.modalContainer .el-dialog__body {
  padding: 10px 25px;
}
.modalContainer .el-input.is-disabled .el-input__inner {
  color: #c6312780;
}

@media screen and (max-width: 768px) {
  .bigLogoContainer {
    position: absolute;
    top: 2vh;
  }
  .bigLogoContainer .alert {
    top: -12px;
  }
  .input-container {
    width: 60vw;
  }
  .input-with-select > input {
    width: 50vw;
    height: 6vh;
  }
  .el-input__inner::placeholder {
    font-size: 14px;
    font-weight: 500;
    color: rgba(198, 49, 39, 0.5);
  }
  /* 谷歌 */
  .el-input__inner::-webkit-input-placeholder {
    font-size: 14px;
    font-weight: 500;
    color: rgba(198, 49, 39, 0.5);
  }
  /* 火狐 */
  .el-input__inner:-moz-placeholder {
    font-size: 14px;
    font-weight: 500;
    color: rgba(198, 49, 39, 0.5);
  }
  /*ie*/
  .el-input__inner:-ms-input-placeholder {
    font-size: 14px;
    font-weight: 500;
    color: rgba(198, 49, 39, 0.5);
  }

  .el-input__inner::placeholder:focus {
    font-size: 14px;
    font-weight: 500;
    color: rgb(198, 49, 39);
  }
  .input-container .el-button {
    height: 6vh;
    font-size: 13px;
  }
}
</style>
