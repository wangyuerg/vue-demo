<h1 align="center">lego-framework</h1>
<div align="center">
基于  <a href="https://pro.ant.design/">Ant Design Vue Pro</a>
</div>

<div align="center">

[![Support Vue Version](https://img.shields.io/badge/Support-Vue2-green?style=flat)](https://github.com/vueComponent/ant-design-vue-pro/releases/latest)

</div>

## 环境和依赖

- node
- yarn
- webpack
- eslint
- @vue/cli
- [ant-design-vue@1.x](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现

## 项目下载和运行

- 拉取项目代码，后面补充

- 安装依赖

```
npm install
```

- 开发模式运行

```
npm run serve
```

- mock 模式运行

```
npm run mock
```

- 测试环境编译打包

```
npm run build
```

- 省公司编译打包示例

```
npm run build:jiangsu
```

- Lints 及 fix

```
npm run lint
```

## 其他说明

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请确保你所使用的 vue-cli 是新版，并且已经学习 cli 官方文档使用教程

- 组件按需加载相关代码 `import './core/lazy_use'`
- 开发环境默认不加载 `mock`，mock 模式需要运行 npm run mock
- 项目提供顶部多标签功能，在 config/defaultSettings 中可改成 false 关闭
- 本项目提供主页面三种布局，1. 顶部有标题+面包屑 2. 顶部只有面包屑 3.顶部无顶部无面包屑。 可在 router 的 meta 中设置，详见 router/README.md
- 本项目 icon 在 assets/icons 中统一管理，需统一命名为 lgxxx.svg
- 本项目动态路由有两种方式，详见 router/README.md
- login 密码使用 md5 加密

##  开发说明

- 增加省公司部署文件：参考.env.jisngsu 新增文件 .env.xxx，在 package.json 中参考 buid:jiangsu 命名新增命令 build:xxx，即可运行 npm run build:xxx 一键为新省份打部署包。
- 本框架支持携带自定义 token 头，名为 **Access-Token**, 可依据需求自行在 src/store/mutation-types.js 修改。

## 浏览器兼容

Modern browsers and IE10.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |
