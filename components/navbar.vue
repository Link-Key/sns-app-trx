<template>
  <nav class="nav-container">
    <div class="logoContainer">
      <img class="tronLogo" src="../assets/tronLogo.svg" />
      <span class="combition">X</span>
      <img class="snsLogo" src="../assets/linkkeyFavicon1.png" />
    </div>
    <ul class="nav-menu">
      <li>
        <a @click="dispalyMycount">My Account</a>
      </li>
    </ul>
    <div class="burger">
      <div class="top-line"></div>
      <div class="middle-line"></div>
      <div class="bottom-line"></div>
    </div>
    <el-dialog
      title="My Account"
      :visible.sync="myAccountVisible"
      width="300px"
      top="40vh"
      center
      :before-close="closeMyAcctDialog"
      custom-class="myAcctDialog"
    >
      <div v-loading="myAcctLoading">
        <el-input v-model="myName" :disabled="true"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-link
          type="primary"
          href="https://baidu.com"
          target="_blank"
          @click="dialogVisible = false"
          >View on APENFT</el-link
        >
      </span>
    </el-dialog>
  </nav>
</template>

<script>
import BookForm from "~/components/bookForm.vue";
import { accountAddress } from "~/plugins/utils";
import { initWalletConnect, recordExists } from "~/plugins/walletConnect";

export default {
  data() {
    return {
      address: null,
      myAccountVisible: false,
      myAcctLoading: false,
      myName: "No domain name",
    };
  },
  mounted() {
    // get hambuger btn
    const burger = document.querySelector(".burger");
    // get navbar menu
    const navMenu = document.querySelector(".nav-menu");

    // get menu element
    const navMenuItems = document.querySelectorAll(".nav-menu li");

    // listener click
    burger.addEventListener("click", () => {
      // hambuger btn
      burger.classList.toggle("active");
      // navbar menu switch
      navMenu.classList.toggle("open");

      // animation
      navMenuItems.forEach((item, index) => {
        // If animation is added, cancel it first.
        if (item.style.animation) {
          item.style.animation = "";
        } else {
          item.style.animation = `0.3s ease-in slideIn forwards ${
            index * 0.1 + 0.3
          }s`;
        }
      });
    });
  },
  components: {
    BookForm,
  },
  methods: {
    walletConnect() {
      // TODO: connect to walletconnect
      initWalletConnect();
    },
    dispalyMycount() {
      this.myAccountVisible = true;
      this.closeMenu();
    },
    closeMenu() {
      // get hambuger btn
      const burger = document.querySelector(".burger");
      // get navbar menu
      const navMenu = document.querySelector(".nav-menu");

      // hambuger btn
      burger.classList.remove("active");
      // navbar menu switch
      navMenu.classList.remove("open");
    },
    closeMyAcctDialog() {
      this.myAcctLoading = false;
      this.myAccountVisible = false;
    },
  },
};
</script>

<style scoped>
nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 左右padding */
  padding: 0 5vw;
  height: 60px;
  background: linear-gradient(to right, #430905, #0f020a);
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
}

.logoContainer {
  position: relative;
  /* 占一半宽度 */
  flex: 1;
}

.snsLogo {
  width: 45;
  height: 41px;
}

.combition {
  position: absolute;
  top: 5px;
  left: 79px;
  color: #fff;
  font-weight: 400;
  font-size: 24px;
}

.tronLogo {
  width: 100px;
  height: 50px;
}

.nav-menu {
  /* 占令一半宽度 */
  flex: 1;
  display: flex;
  justify-content: flex-end;

  /* 最宽550px */
  max-width: 550px;
}

.nav-menu li {
  list-style: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.nav-menu li > a:hover {
  color: #c63127;
}

.burger div {
  /* 设置汉堡按钮三层条 */
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin: 4px;
}

.burger {
  display: none;
}

/* 屏幕适配 */
@media screen and (max-width: 768px) {
  .burger {
    display: block;
    z-index: 999;
  }

  /* 小屏幕菜单显示位置为右侧抽屉形式 */
  .nav-menu {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;

    background-color: #151515;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    /* 动画 */
    transform: translateX(100%);
    z-index: 999;
  }

  /* 菜单打开时，滑到初始位置 */
  .nav-menu.open {
    display: flex;
    transform: translateX(0);
    transition: 0.4s ease-in-out;
  }

  /* 每个菜单项默认看不到，向右移动20象素 */
  .nav-menu li {
    /* 上下间距 */
    margin: 3vh;
    opacity: 1;
  }

  .nav-menu li:first-child {
    margin-top: 60px;
  }

  /* 汉堡按钮被点开时，设置按钮过渡 */
  .burger.active div {
    transition: 0.3s ease-in-out 0.3s;
  }

  /* 第一条线旋转45度 */
  .burger.active .top-line {
    transform: rotate(45deg) translate(4px, 6px);
  }

  /* 第三条线旋转-45度 */
  .burger.active .bottom-line {
    transform: rotate(-45deg) translate(4px, -6px);
  }

  /* 中间线向右移动并变为透明 */
  .burger.active .middle-line {
    opacity: 0;
    transform: translateX(10px);
    transition: 0.3s ease-in-out;
  }

  .myAcctDialog .el-input .el-input__inner.is-disabled {
    color: rgba(198, 49, 39, 0.5);
  }

  /* 菜单项滑入动画 */
  @keyframes slideIn {
    from {
      transform: translateX(20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>
