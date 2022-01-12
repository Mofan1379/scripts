let inviteCodes = ["PKASTT0205KkcBVxhpiaVXVKv3bBXCTdWnIaRzTIjeQOc"]

const $ = new Env('膨胀红包助力');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

let cookiesArr = [], cookie = '', message;
let secretp='',inviteId=[]
var num = 0
var difference = 60

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  
  $.inviteIdCodesArr = {}
  for (let i = 0; i < cookiesArr.length && true; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      await getUA()
    }
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
		cookie = cookiesArr[i];
		$.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
		$.index = i + 1;
		$.isLogin = true;
		$.nickName = '';
		message = '';
		//console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
		try {
			await get_secretp()
			for (let i = 0; i < inviteCodes.length; i++) {
				tigernian_collectScore123(inviteCodes[i]);
				await $.wait(2000)
			}
			
		}catch(e){
			$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
		}
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
function transform(str){
            var REQUEST = new Object, 
            data=str.slice(str.indexOf("?")+1,str.length-1),
            aParams = data.substr(1).split("&");
            for (i = 0; i < aParams.length; i++) {
　　                var aParam = aParams[i].split("=");
　　                REQUEST[aParam[0]] = aParam[1]
            }
			return REQUEST
        }
function get_secretp(){
	let body={};
	return new Promise((resolve) => {$.post(taskPostUrl("tigernian_getHomeData",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              if (data.data && data['data']['bizCode'] === 0) {
					secretp = data.data.result.homeMainInfo.secretp
					
              } 
            } else {
              console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}

function tigernian_collectScore123(inviteId){
	let body={"ss":{"extraData":{"log":`${new Date().getTime()}~1ARjT8NVAEPMDFGVUN2RDAxMQ%3D%3D.d2N3R3x3YXBCfHdsdggnKQJ7JXFwBAQ7Ond5dFp9amQ9RDp3Ky45AQskKkcsKSMxBH0iF3EYET5%2BBCcVe2g9.be2eb0ba~9%2C1~415495754757AB0E512E9033D8603E60D018508E~1keu22p~C~TRNHWhMKbGQYFEZdWkAPbRdRAhwFdR92aBwDDmYaAx0HUgUaQRcbE1IGHgR1HHZgGAIKZxtTGwYFBRtFFB0RUwAdBH0Yd2sfAyMAGkAZQxNrHRFQQ14VAwUaEEBEQA8UBAMDAA4ABwQFCAANDAcLCg9AGRRCUFMTDBNHQ0VEQ19BUBAfFRVQVxcPFVdQRUdDRUVWGxgUQldZQA9tDBkDABoDHwQdARsMaRoQWV1ADwcZF1RCFAsRUlUJUwBQVVEHUgZRAAIEVFIGBgEHVQBTCwwCBQoDWwcUGRdZQRQLEXtYXkJBFFdTQVQKAwIXGRVFFAsCAQUBDwgABQcCAlIBGhdfXBMMEx4DUgQOXAdQV1AGAAQbDQYEVFcABg5UVVELAVIFABVOF1BFVxULFFx8cnxBXghcWURBRVtRdAdbYkkddmJmDA0VFRZYRBENQHJZWlJbVBZ4XVQfEhsbWldEEQ1ADAcAAwQTGhNAVEMSDWICAgIfBFQFaxkXRV4UC2gVfHkXDxYaEFJZBkdZXFEVHRQIERsTAQcXBhgEERtADAcAAwQTGhMLBAcDAgoABQYABlEFBQYGAAIGAgYEAgMCCgYFHwQEJgcCBgYBBQUIAAIHAwQPAgMEAAFTBgQDBAQTGhMCFWwcFVBbVxAJFQRTUFNTUUVCEx8VUFoVAxZDEB8VAVwUDxdAAhgFHQcTHBVaUmlEEQ1ABQcXGRVTUhMJFUNRWV1bWw8BB1sDBgQMDxMaE15dEwpsCBgGHgNqThdUWVpQEwwTAgEFAQ8IAAUBCwBVA0gEYH96AnBrZ1VIZ3RwcEtkWgZBZF90T3xRDA4ZYAJPbWx%2BB3dVDmdVUWBlQmNjfU5zWFQLfXRWdVUVRWB6dGUDfmR1RGldRGNjTFp3fSNvUnNnWFdgS0B2d3FbYXN3XXJ5U2RjfmFAR3VYRA98SQ9TcE5%2Fe2cxfA5lXH1CYGdUVHpyVEt3bnR3eVN4AncFRFJ8YgdPcndcX39MUXRxM0JUeV1yU3VYUERzWURDfF9zAFUbUn9RTHpLY1sHUHZyQGl%2FcnN4dg5kUXRcU0l7SUBmeV5xX3sFfwdTM01UcAUPWhgBAVUEVAIKUUhLHwYcS0h3S2RZeHJ2UFpjYggBUnoCBgBnYFpQYGcPUmZ1eFVyCHVlcVtxNm0HQlBiXQ9UZmUAZW9SYmJlZWImdHR4VnJdd2JwX39ickFDZ2cCYRRnTnx5cUZ3dXZPAWNle3F9d1RcKndRbGR%2Fc3BrYk94fHFOcVNzcXoBcFoAdHJWRWJyZnRzdntxVXcCeTtzQVpkYlZ%2FVHJfAXNyUkMLTAJRUVBcQ0wVHRRcQFATChUbSQ%3D%3D~1lm1ahf`,"sceneid":"ZNSZLh5"},"secretp":secretp,"random":randomString(6)},"inviteId":inviteId};
	
	return new Promise((resolve) => {
		$.post(taskPostUrl("tigernian_pk_collectPkExpandScore",body), async (err, resp, data) => {
      try {
			//console.log(data)
			var name = data
			this.result = name.substring( name.lastIndexOf('bizMsg') + 9, name.lastIndexOf('bizMsg') + 16);
			if (this.result == "success"){
				num = ++num
				difference = --difference
			}else if((this.result = name.substring( name.lastIndexOf('bizMsg') + 9, name.lastIndexOf('false')  -  12)) == "TA已经获得足够的助力了"||(this.result = name.substring( name.lastIndexOf('bizMsg') + 9, name.lastIndexOf('false')  -  12)) == "助力已结束|下次早点来吧"||(this.result = name.substring( name.lastIndexOf('bizMsg') + 9, name.lastIndexOf('false')  -  12)) == "TA已经获得足够的助力了|不需要助力啦~"){
				difference = 0
			}else{
				this.result = name.substring( name.lastIndexOf('bizMsg') + 9, name.lastIndexOf('false')  -  12);
			}
			console.log(`【账号${$.index}】${$.nickName || $.UserName}\n` + '【结果】☞ ' + this.result + '\n【成功数】☞ ' + num + ' 个' + '【还缺】☞ ' + difference + ' 个\n');
					
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              if (data.data && data['data']['bizCode'] === 0) {
					//console.log(data.msg)
              } 
            } else {
              console.log(`\n\n 失败:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}

function taskPostUrl(functionId,body) {
  return {
    url: `${JD_API_HOST}`,
    body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      "User-Agent": $.UA,
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}
function taskPostUrl2(functionId,body) {
  return {
    url: `${JD_API_HOST}?functionId=${functionId}&client=wh5`,
    body: `body=${escape(JSON.stringify(body))}`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      "User-Agent": $.UA,
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}

function getUA(){
	$.UA = `jdapp;android;10.2.6;;;appBuild/91563;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1641814343287%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ENCzZWOnDJvvZWYyDWG3Cm%3D%3D%22%2C%22od%22%3A%22DJUmDWVtCtrrENYyZQS0%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ENY1DNGnCNC3CNUzDJS3BJHtDNvvC2ZvYzPsCG%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045913 Mobile Safari/537.36`
}
function randomString(e) {
	e = e || 32;
	let t = "abcdef0123456789", a = t.length, n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}
function randomNum(e) {
	e = e || 32;
	let t = "0123456789", a = t.length, n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`！${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============#系统通知#=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`！${this.name}, 错误!`,t.stack):this.log("",`！${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`！${this.name}, 结束! ？ ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}