/* eslint-disable */
//管理命令
const ManageCommand = {
    Login: -1,                          //登录，只有登录成功以后，下面的命令才能调用

    GetPorts: 0,                        //获取端口号、版本号
    GetStatus: 1,                       //实时获取运行状态

    GetInstanceList: 100,               //获取实例列表
    GetInstanceInformation: 101,        //获取指定实例的详细信息
    GetOneFreeInstance: 102,            //获取一个空闲的实例信息（正在运行或者尚未启动）
    GetOneFreeInstanceRunning: 103,	    //获取一个空闲的实例信息（正在运行的实例）
    SetInstanceParams: 104,             //设置实例运行参数并启动    
    StopInstance: 105,				    //停止实例运行
    UnlockInstance: 106,                //取消锁定

    KickPlayer: 200,                    //踢出
    GetProjectList: 201,                //获取工程列表
}



//管理命令的执行结果
const ManageResult = {
    OK: 0,
    PermissionDenied: 1,            //没有权限
    NoFreeInstance: 2,				//没有可用的实例
    InstanceNotFound: 3,		    //没有找到指定的实例
    InstanceNotRunning: 4,		    //指定的实例没有在运行
    InvalidParameters: 5,           //参数无效
    ManagerNotFound: 6,             //没有找到实例所属的管理工具
    PlayerNotFound: 7,              //没有找到指定的Player    

    StartInstance_ExeNotExist: 800,             //可执行文件不存在
    StartInstance_ProjectPathNotExist: 801,	    //工程文件不存在
    StartInstance_NoChange: 802,                //没有改变
    StartInstance_ProcessStartFailed: 803,      //进程启动失败
    StartInstance_Locked: 804,                  //无法修改已锁定的实例
}


function setText(domId, text) {
    document.getElementById(domId).innerText = text;
}

function showInfo(s) {
    setText(__isOnlyStatus ? 'e_Status' : 'e_Info', s);
}

function getValue(domId) {
    return document.getElementById(domId).value;
}

function getChecked(domId) {
    return document.getElementById(domId).checked;
}


var __ws;
var __index = 0;
var __bConnected = false;

//保存登录成功以后服务器返回的授权信息
var __authorization;

function connect() {

    let strURL = `ws://${HostConfig.Manager}/manager`;
    showInfo(`connecting (${strURL}) ...${++__index}`);
    __ws = new WebSocket(strURL);

    __ws.onopen = function () {
        __bConnected = true;
        showInfo('Connected!');

        if (__isOnlyStatus)
            msg_GetStatus();
    }

    __ws.onmessage = function (event) {
        let str = event.data;
        let o = JSON.parse(event.data);

        //检查登录是否过期
        if (o.result == ManageResult.PermissionDenied) {
            alert('登录失败或者登录信息已过期，请重新登录！')
            return;
        }

        switch (o.command) {

            case ManageCommand.Login: {
                let strResult = '服务器返回信息：\n' + str;
                if (o.result == ManageResult.OK) {
                    __authorization = o.authorization;  //保存

                    strResult += '\n登录成功!';

                    if (__isOnlyStatus)
                        msg_GetStatus();
                }
                else
                    strResult += '\n登录失败!';
                setText(__isOnlyStatus ? 'e_Status' : 'e_LoginResult', strResult);
            } break;

            case ManageCommand.GetStatus: {
                setText('e_Status', str);
            } break;

            case ManageCommand.GetPorts: setText('e_GetPortsResult', str); break;
            case ManageCommand.GetInstanceList: setText('e_InstanceList', str); break;
            case ManageCommand.GetInstanceInformation: setText('e_InstanceInformation', str); break;
            case ManageCommand.GetOneFreeInstance: setText('e_FreeInst', str); break;
            case ManageCommand.GetOneFreeInstanceRunning: setText('e_FreeRunningInst', str); break;
            case ManageCommand.SetInstanceParams: alert(str); break;
            case ManageCommand.StopInstance: alert(str); break;
            case ManageCommand.UnlockInstance: alert(str); break;
            case ManageCommand.GetProjectList: setText('e_ProjectList', str); break;
            case ManageCommand.KickPlayer: setText('e_KickPlayerResult', str); break;
        }

    }

    __ws.onclose = function () {
        showInfo("socket closed.");
        __ws = null;
        __bConnected = false;
        setText('e_Status', '');

        connect();
    }

    __ws.onerror = function (event) {
        showInfo("socket error.");
        __ws = null;
    };
}


window.onload = connect;




function checkConnection() {
    if (!__bConnected) {
        alert('WebSocket尚未连接！');
        return false;
    }
    return true;
}

function sendData(o) {
    if (!checkConnection())
        return;

    //在发送之前需要附加上授权信息以进行权限验证
    o.authorization = __authorization;

    __ws.send(JSON.stringify(o));
}


//Message: 登录
function msg_Login() {

    var o = {
        command: ManageCommand.Login,
        userName: getValue('e_UserName'),
        password: getValue('e_Password')
    }
    sendData(o);
}


//Message: 获取端口信息
function msg_GetPorts() {
    sendData({
        command: ManageCommand.GetPorts
    });
}

//Message: 获取实例列表
function msg_GetInstanceList() {

    let bIncludeInstDetails = getChecked('e_IncludeInstInfo');
    let bIncludeConnectionDetails = getChecked('e_IncludeConnInfo');

    var o = {
        command: ManageCommand.GetInstanceList,
        details: bIncludeInstDetails,
        connections: bIncludeConnectionDetails
    }
    sendData(o);
}


//Message: 获取指定实例的详细信息
function msg_GetInstanceInformation() {

    var o = {
        command: ManageCommand.GetInstanceInformation,
        id: getValue('e_IID_GetInstanceInformation')
    }
    sendData(o);
}


//Message: 获取一个空闲的实例信息（正在运行或者尚未启动）
function msg_GetOneFreeInstance() {
    var o = {
        command: ManageCommand.GetOneFreeInstance
    }
    sendData(o);
}


//Message: 获取一个空闲的实例信息（正在运行的实例）
function msg_GetOneFreeInstanceRunning() {
    var o = {
        command: ManageCommand.GetOneFreeInstanceRunning
    }
    sendData(o);
}


//Message: 设置实例运行参数并启动
function msg_SetInstanceParams() {

    let bAsync = !getChecked('e_WaitInstance');
    let bQuiet = getChecked('e_Quiet');

    var o = {
        command: ManageCommand.SetInstanceParams,
        quiet: bQuiet ? bQuiet : null,     //传递null，生成 JSON字符串的时候就不会有quiet属性
        async: bAsync,                     //async参数是可选的，如果设置为true，那么立即返回结果，如果设置为false或者没有此参数，会等待实例启动结果，然后再返回
        startup: getChecked('e_Startup'),  //是否启动实例 
        staticInstance: {
            id: getValue('e_IID_SetInstanceStartupInfo'),
            adjustResolution: getChecked('e_AdjustResolution'),
            limitOneClient: getChecked('e_LimitOneClient'),
            locked: getChecked('e_Locked'),
            pauseWhenIdle: getChecked('e_PauseWhenIdle'),
            websocketPort: getValue('e_WebSocketPort')
        }
    }

    //单独处理工程文件
    let project = getValue('e_Project');
    let projectId = parseInt(project);
    if (isNaN(projectId))
        o.staticInstance.project = project;
    else
        o.staticInstance.projectId = projectId;

    sendData(o);
}


//Message: 取消锁定
function msg_UnlockInstance() {

    var o = {
        command: ManageCommand.UnlockInstance,
        id: getValue('e_IID_UnlockInstance')
    }
    sendData(o);
}


//Message: 停止实例运行
function msg_StopInstance() {

    var o = {
        command: ManageCommand.StopInstance,
        id: getValue('e_IID_StopInstance')
    }
    sendData(o);
}


//Message: 获取工程列表
function msg_GetProjectList() {

    var o = {
        command: ManageCommand.GetProjectList,
    }
    sendData(o);
}

//Message: 踢出用户
function msg_KickPlayer() {

    var o = {
        command: ManageCommand.KickPlayer,
        id: getValue('e_IID_KickPlayer')
    }

    if (getValue('e_PlayerId').trim() != '')
        o.playerId = getValue('e_PlayerId');

    sendData(o);
}


function msg_GetStatus() {

    let o = {
        command: ManageCommand.GetStatus
    }
    sendData(o);

    __index = 0;
    setText('e_Status', 'Waiting...');
}