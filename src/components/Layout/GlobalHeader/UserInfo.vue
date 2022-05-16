<template>
  <div>
    <div class="user-info">
      <div class="info-divide"></div>
      <!-- 此处自定义 -->
      <a class="info-title" @click="goToUserManage">用户管理</a>
      <div class="info-divide"></div>
      <a-dropdown :trigger="['hover']" v-if="currentUser && currentUser.name" placement="bottomRight">
        <div class="info-title">
          <div class="title-text">{{ currentUser.name }}</div>
          <a-icon style="padding-left: 16px" type="caret-down" />
        </div>
        <template v-slot:overlay>
          <a-menu slot="overlay" class="info-menu">
            <a-menu-item>
              <a href="javascript:;" @click="handleLogout">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <span v-else>
        <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
      </span>
      <div class="info-divide"></div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'UserInfo',
  props: {
    currentUser: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleLogout(e) {
      Modal.confirm({
        title: '信息',
        content: '您确定要注销吗？',
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel() {},
      })
    },
    goToUserManage() {
      console.log('进入用户管理')
    },
  },
}
</script>

<style lang="less" scoped>
.user-info {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  line-height: 16px;
  color: #333333;
  display: flex;
  align-items: center;
}
.user-info .info-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333333;
}
.user-info .info-title .title-text {
  max-width: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-info .info-divide {
  height: 56px;
  background: #f4f4f4;
  width: 1px;
  margin: 0 16px;
}
.ant-dropdown-menu-item > a,
.ant-dropdown-menu-submenu-title > a {
  font-size: 12px !important;
  font-family: PingFangSC-Regular !important;
}
// .ant-pro-drop-down {
//   /deep/ .action {
//     margin-right: 8px;
//   }
//   /deep/ .ant-dropdown-menu-item {
//     min-width: 160px;
//   }
// }
</style>
