<template>
  <div class="map-demo">
    <div id="player" style="width: 100%; height: 600px"></div>
    <a-button @click="cameraMove()">移动到默认位置</a-button>
    <a-button @click="addBeam()">增加线段</a-button>
    <a-button @click="hideUI()">显隐右侧导航栏</a-button>
    <!-- <a-button @click="getInfoTree()">查询图层树</a-button> -->
  </div>
</template>
<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
  },
  data() {
    return {
      // api初始化完成全局标识
      apiOnReady: false,
      hideUIFlag: false,
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    // 相机移动
    cameraMove() {
      // api已经初始化完成才可以进行接口调用！！！
      if (this.apiOnReady) {
        // 参数：x, y, z, pitch, yaw, flyTime
        __g.camera.set(495279.161875, 2490932.424688, 118.587822, -39.852509, -88.798607, 1)
      } else {
        this.$message.error('地图还未初始化，无法操作')
      }
    },
    hideUI() {
      // 隐藏界面导航UI
      if (this.hideUIFlag) {
        // 隐藏界面UI
        __g.settings.setMainUIVisibility(false)
        // 隐藏指北针
        __g.settings.setCampassVisible(false)
        this.hideUIFlag = false
      } else {
        // 显示界面UI
        __g.settings.setMainUIVisibility(true)
        // 显示指北针
        __g.settings.setCampassVisible(true)
        this.hideUIFlag = true
      }
    },
    // 查询图层树
    // getInfoTree() {
    //   if (this.apiOnReady) {
    //       //查询图层树上包含的图层信息
    //       let resultInfo = await __g.infoTree.get()
    //       console.log('查询图层树上包含的图层信息:' + JSON.stringify(resultInfo.infotree))
    //     }
    // },
    init() {
      const that = this
      // AirCloud云渲染服务器地址和端口
      var host = '10.2.41.132:8080'

      // 非常重要 这里是所有API接口调用的入口
      function _onReady() {
        that.apiOnReady = true
        // TODO 开始业务调用
      }

      // 事件交互的专题
      function _onEvent(event) {
        if (event.eventtype == 'LeftMouseButtonClick' && event.Type == 'TileLayer') {
          console.info('当前点击图层位置：' + event.MouseClickPoint)
          // 高亮actor
          __g.tileLayer.stopHighlightActor(event.Id, event.ObjectID)
        }
      }

      // 调试输出日志
      function _onLog(s, nnl) {
        var logStr = s + (nnl ? '' : '\n')
        console.info(logStr)
      }

      // 构造AirCityPlayer对象所需的参数选项，更多参数详情请参考API开发手册里AirCityPlayer对象
      var options = {
        // 必选参数，网页显示视频流的domId
        domId: 'player',

        // 必选参数，二次开发时必须指定，否则无法进行二次开发
        apiOptions: {
          // 实例id 可选参数 不传入直接连接服务端空闲实例
          iid: '1693974213824',
          // 工程id 可选参数
          pid: '1',

          // 必选参数，与云渲染主机通信成功后的回调函数
          // 注意：只有在onReady之后才可以调用AirCityAPI接口
          onReady: _onReady,

          // 可选参数，日志输出回调函数 开发调试需要
          onLog: _onLog,

          // 可选参数，三维场景交互事件回调函数

          onEvent: _onEvent,

          // 可选参数，日志颜色，默认关闭
          useColorLog: false,
        },

        //     //可选参数，是否显示页面按钮【+显示信息】，默认false
        //     'showMarker': true,
        //     //可选参数，是否显示页面加载详细信息，默认值为true
        //     'showStartupInfo': true,
        //     //可选参数，视频流加载成功回调函数
        //     'onloaded': _onLoaded,
        //     //可选参数，连接断开回调函数
        //     'onclose': _onClose,
        //     //可选参数，设置三维交互的键盘事件接收者
        //     //注意：接收类型有视频标签(video)，网页文档(document)，空(none)
        //     'keyEventReceiver': 'none',
      }
      // 构造player对象
      var demoPlayer = new AirCityPlayer(host, options)
      // 构造AirCityAPI对象并初始化
      var airCityApi = demoPlayer.getAPI()
      __g.settings.setMainUIVisibility(false)

      var __isOnlyStatus = false
      // 实例管理: 获取实例列表
      function getInstanceList() {
        var o = {
          command: ManageCommand.GetInstanceList,
          details: true,
          connections: true,
        }
        sendData(o)
      }

      // 实例管理: 获取空闲实例
      function getIdleInstance() {
        msg_GetOneFreeInstance()
      }

      // 实例管理: 踢出用户
      function kickUser() {
        var userId = document.getElementById('userId').value
        if (userId != '') {
          var o = {
            command: ManageCommand.KickPlayer,
            id: '2474994305517', // 实例id
            playerId: userId, // 客户端连接id
          }
          sendData(o)
        } else {
          alert('请输入客户端连接用户id')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
