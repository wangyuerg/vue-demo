import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  console.log('options', options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '你好你好',
    username: 'admin',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {},
  }
  // role
  const roleObj = {
    id: 'admin',
    name: '管理员',
    describe: '拥有所有权限',
    status: 1,
    creatorId: 'system',
    createTime: 1497160610259,
    deleted: 0,
    permissions: [
      {
        roleId: 'admin',
        permissionId: 'dashboard',
        permissionName: '仪表盘',
        actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'exception',
        permissionName: '异常页面权限',
        actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
    ],
  }

  roleObj.permissions.push({
    roleId: 'admin',
    permissionId: 'support',
    permissionName: '超级模块',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false,
      },
      {
        action: 'import',
        describe: '导入',
        defaultCheck: false,
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false,
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false,
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false,
      },
      {
        action: 'export',
        describe: '导出',
        defaultCheck: false,
      },
    ],
    actionList: null,
    dataAccess: null,
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

/**
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 * @param {*} options
 * @returns
 */
const userNav = (options) => {
  const nav = [
    // dashboard
    {
      name: 'dashboard',
      parentId: 0,
      id: 1,
      meta: {
        icon: 'lgModular',
        title: '仪表盘',
        show: true,
      },
      component: 'RouteView',
      redirect: '/dashboard/workplace',
    },
    {
      name: 'workplace',
      parentId: 1,
      id: 7,
      meta: {
        title: '工作台',
        show: true,
      },
      component: 'Workplace',
    },
    // Exception
    {
      name: 'exception',
      parentId: 0,
      id: 10024,
      // show: false,
      meta: {
        title: '异常页',
        icon: 'warning',
        show: true,
      },
      redirect: '/exception/403',
      component: 'RouteView',
    },
    {
      name: '403',
      parentId: 10024,
      id: 10025,
      meta: {
        title: '403',
        show: true,
        hiddenHeaderContent: true,
      },
      component: 'Exception403',
    },
    {
      name: '404',
      parentId: 10024,
      id: 10026,
      meta: {
        title: '404',
        show: true,
        hiddenBread: true,
      },
      component: 'Exception404',
    },
    {
      name: '500',
      parentId: 10024,
      id: 10027,
      meta: {
        title: '500',
        show: true,
      },
      component: 'Exception500',
    },
  ]
  const json = builder(nav)
  console.log('json', json)
  return json
}

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
