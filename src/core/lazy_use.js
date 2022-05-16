import Vue from 'vue'

// base library
import { Layout, Input, Button, Checkbox, Form, Row, Col, Modal, Tabs, Icon, Dropdown, Breadcrumb, Spin, Menu, Alert, PageHeader, Result, message, notification } from 'ant-design-vue'

// ext library
import MultiTab from '@/components/Common/MultiTab'
import PermissionHelper from '@/core/permission/permission'
import './directives/action'

Vue.use(Layout)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(Breadcrumb)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Alert)
Vue.use(PageHeader)
Vue.use(Result)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

Vue.use(MultiTab)
Vue.use(PermissionHelper)

process.env.NODE_ENV !== 'production' && console.warn('NOTICE: Antd use lazy-load.')
