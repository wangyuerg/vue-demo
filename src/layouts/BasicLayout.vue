<template>
  <pro-layout :menus="menus" :collapsed="collapsed" :mediaQuery="query" :isMobile="isMobile" :handleMediaQuery="handleMediaQuery" :handleCollapse="handleCollapse" v-bind="settings" :siderWidth="siderWidth">
    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <template v-slot:menuHeaderRender>
      <div :class="!collapsed ? 'menu-title-info' : 'menu-title-info menu-title-info-collapse'">
        <div class="title-info-cmcc">
          <img
            class="logo-img"
            alt="中国移动"
            src="~@/assets/img/cmcc.png"
            :style="
              collapsed
                ? {
                    position: 'absolute',
                    clip: 'rect(0px 29px 29px 0)',
                    left: '10px',
                  }
                : null
            "
          />
        </div>
        <img class="title-info-jiutian" src="~@/assets/img/jiutian.png" alt="九天" v-show="!collapsed" />
        <div class="title-info-text" v-show="!collapsed">
          <span>{{ title }}</span>
        </div>
      </div>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义
    -->
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <multi-tab v-if="multiTab"></multi-tab>
    <!-- 隐藏顶部 -->
    <router-view v-if="hiddenHeaderContent" />
    <!-- 展示顶部 -->
    <page-header-wrapper v-if="!hiddenHeaderContent && !hiddenBread">
      <router-view />
    </page-header-wrapper>
    <!-- 展示顶部但隐藏面包屑 -->
    <page-header-wrapper v-if="!hiddenHeaderContent && hiddenBread" :breadcrumb="false">
      <router-view />
    </page-header-wrapper>
  </pro-layout>
</template>

<script>
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/Layout/GlobalHeader/RightContent'
import GlobalFooter from '@/components/Layout/GlobalFooter'

export default {
  name: 'BasicLayout',
  components: {
    RightContent,
    GlobalFooter,
  },
  data() {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      multiTab: defaultSettings.multiTab,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false,
      },
      siderWidth: 208,
      // 媒体查询
      query: {},
      // 是否手机模式
      isMobile: false,
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.addRouters,
    }),
    hiddenHeaderContent() {
      let res = false
      if (typeof this.$route.meta.hiddenHeaderContent !== 'undefined' && this.$route.meta.hiddenHeaderContent === true) {
        res = true
      }
      return res
    },
    hiddenBread() {
      let res = false
      if (typeof this.$route.meta.hiddenBread !== 'undefined' && this.$route.meta.hiddenBread === true) {
        res = true
      }
      return res
    },
  },
  created() {
    const routes = this.mainMenu.find((item) => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    handleMediaQuery(val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse(val) {
      this.collapsed = val
    },
  },
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
