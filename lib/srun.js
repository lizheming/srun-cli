var querystring = require('querystring'),
    parse = require('url').parse,
    http =require('http');

var server = require("../config.json").server;

function post(url, data, callback) { 
    data = querystring.stringify( data );
    url = parse(url);
    var postOpt = {
        host: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };
 
    var postReq = http.request( postOpt, function(res) {
        res.setEncoding("utf-8");
        res.on('data', function(data) {
            callback = callback || function() {};
            callback(data)
        });
    });
 
    postReq.write(data);
    postReq.end();
}

function get(url, callback) {
    http.get(url, function(res) {
        var content = "";
        res.on("data", function(d) { content += d });
        res.on("end", function() {
            callback(content)
        })
    })
}

function info(text) {
    if( !/[a-z_0-9@]+/.test(text) ) return console.log(text);
    
    var arr = {};
    arr['user_tab_error'] = '认证程序未启动';
    arr['username_error'] = '用户名错误';
    arr['non_auth_error'] = '您无须认证，可直接上网';
    arr['password_error'] = '密码错误';
    arr['status_error'] = '用户已欠费，请尽快充值。';
    arr['available_error'] = '用户已禁用';
    arr['ip_exist_error'] = '您的IP尚未下线，请等待2分钟再试。';
    arr['usernum_error'] = '用户数已达上限';
    arr['online_num_error'] = '该帐号的登录人数已超过限额\n如果怀疑帐号被盗用，请联系管理员。';
    arr['mode_error'] = '系统已禁止WEB方式登录，请使用客户端';
    arr['time_policy_error'] = '当前时段不允许连接';
    arr['flux_error'] = '您的流量已超支';
    arr['minutes_error'] = '您的时长已超支';
    arr['ip_error'] = '您的IP地址不合法';
    arr['mac_error'] = '您的MAC地址不合法';
    arr['sync_error'] = '您的资料已修改，正在等待同步，请2分钟后再试。';
    arr['logout_ok'] = '注销成功，请等1分钟后登录。';
    arr['logout_error'] = '您不在线上';

    if(text.indexOf("password_error") !== -1) return console.log( arr.password_error );
    return console.log( /[0-9,]+/.test(text) ? "登录成功" : arr[text] );
}

function login( username, password ) {
    function encrypt( password, time ) {
        var key = ''+ Math.floor(time / 60);
        return password.substring(0, 16).split("").map(function(p, i) {
            var k = key[ key.length - i%key.length - 1].charCodeAt() ^ p.charCodeAt(),
                l = String.fromCharCode( (k&0x0f) + 0x36 ),
                h = String.fromCharCode( ((k>>4)&0x0f) + 0x63 );
            return i%2 ? h+l : l+h;
        }).join("");
    }
 
    var serverUrl = 'http://'+server+'/cgi-bin/do_login',
        postData = {
            username: username,
            password: encrypt( password, 12321321),
            drop: 0,
            type: 10,
            n: 117,
            pop: 0,
            ac_type: "h3c",
            mac: ""
        };
 
    post( serverUrl, postData, function(data) {
        if( data.indexOf("password_error") !== -1 ) {
            postData.password = encrypt( password, data.split("@")[1] )
            post( serverUrl, postData, info)
        }
    })
 
}

function forceLogout() {
    var url = "http://"+server+"/cgi-bin/do_logout";
    get(url, info)
}

function logout(username, password) {
    var serverUrl = 'http://'+server+'/cgi-bin/force_logout',
        postData = {
            username: username,
            password: password,
            drop: 0,
            type: 10,
            n: 117,
            pop: 0,
            ac_type: "h3c",
            mac: ""
        };
 
    post( serverUrl, postData, info )
}

function who() {
    var url = "http://"+server+"/cgi-bin/keeplive";
    get(url, function(data) {
    	if(data.indexOf("error") !== -1) return console.log("当前无账号登陆");
    	return console.log( data.split(",").pop() );
    })
}

module.exports = {
    login: login,
    forceLogout: forceLogout,
    logout: logout,
    who: who
}