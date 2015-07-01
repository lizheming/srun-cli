var querystring = require('querystring'),
    parse = require('url').parse,
    http =require('http'),
    colors = require('colors');

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
    arr['user_tab_error'] = '认证程序未启动'.red;
    arr['username_error'] = '用户名错误'.red;
    arr['non_auth_error'] = '您无须认证，可直接上网'.green;
    arr['password_error'] = '密码错误'.red;
    arr['status_error'] = '用户已欠费，请尽快充值。'.red;
    arr['available_error'] = '用户已禁用'.red;
    arr['ip_exist_error'] = '您的IP尚未下线，请等待2分钟再试。'.red;
    arr['usernum_error'] = '用户数已达上限'.red;
    arr['online_num_error'] = '该帐号的登录人数已超过限额\n如果怀疑帐号被盗用，请联系管理员。'.red;
    arr['mode_error'] = '系统已禁止WEB方式登录，请使用客户端'.red;
    arr['time_policy_error'] = '当前时段不允许连接'.red;
    arr['flux_error'] = '您的流量已超支'.red;
    arr['minutes_error'] = '您的时长已超支'.red;
    arr['ip_error'] = '您的IP地址不合法'.red;
    arr['mac_error'] = '您的MAC地址不合法'.red;
    arr['sync_error'] = '您的资料已修改，正在等待同步，请2分钟后再试。'.red;
    arr['logout_ok'] = '注销成功，请等1分钟后登录。'.green;
    arr['logout_error'] = '您不在线上'.red;

    if(text.indexOf("password_error") !== -1) return console.log( arr.password_error );
    return console.log( /[0-9,]+/.test(text) ? "登录成功".green : arr[text] );
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
        if(data.indexOf("error") !== -1) return console.log("当前无账号登陆".red);
        return console.log( data.split(",").pop() );
    })
}

function status() {
    var url = "http://"+server+"/cgi-bin/keeplive";
    get(url, function(data) {
        if( data.indexOf("error") !== -1) return console.log("当前无账号登陆".red);
        var data = data.split(",");
        state({
            "time": data[0]/1,
            "used": data[4]/1,
            "available": data[3]/1
        })
    })
    function state(data) {
        var timeTips = ["天", "时", "分", "秒"],
            time = [
                Math.floor(data.time/60/60/24),
                Math.floor(data.time/60/60) % 24,
                Math.floor(data.time/60) % 60,
                data.time % 60
            ],
            timeRes = "";
        timeTips.forEach(function(tip, i) {
            if( time[i] != 0 ) timeRes += time[i]+tip
        });
        console.log("登陆时间: ", timeRes.green);
        console.log("已用流量: ", flux(data.used).green);
        console.log("剩余流量: ", data.available != 0 ? flux(data.available) : "无限".green);
        function flux(data) {
            return data<1024*1024*1024?(data/1024/1024).toFixed(2)+" MB":(data/1024/1024/1024).toFixed(2)+" GB"
        }
    }
}

module.exports = {
    login: login,
    forceLogout: forceLogout,
    logout: logout,
    who: who,
    status: status
}



