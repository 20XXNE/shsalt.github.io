!function(t,n,o){"use strict";if(!history.pushState)return t.fn.smoothState=function(){return this},void(t.fn.smoothState.options={});if(!t.fn.smoothState){var e=t("html, body"),r=n.console||!1,a={anchors:"a",prefetch:!1,blacklist:".no-smoothstate, [target]",development:!1,pageCacheSize:0,alterRequestUrl:function(t){return t},onStart:{duration:0,render:function(){e.scrollTop(0)}},onProgress:{duration:0,render:function(){e.css("cursor","wait"),e.find("a").css("cursor","wait")}},onEnd:{duration:0,render:function(t,n,o){e.css("cursor","auto"),e.find("a").css("cursor","auto"),n.html(o)}},callback:function(){}},i={isExternal:function(t){var o=t.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);return"string"==typeof o[1]&&o[1].length>0&&o[1].toLowerCase()!==n.location.protocol?!0:"string"==typeof o[2]&&o[2].length>0&&o[2].replace(new RegExp(":("+{"http:":80,"https:":443}[n.location.protocol]+")?$"),"")!==n.location.host?!0:!1},isHash:function(t){var o=t.indexOf(n.location.pathname)>0?!0:!1,e=t.indexOf("#")>0?!0:!1;return o&&e?!0:!1},shouldLoad:function(t,n){var o=t.prop("href");return!i.isExternal(o)&&!i.isHash(o)&&!t.is(n)},htmlDoc:function(n){var o,e=t(),r=/<(\/?)(html|head|body|title|base|meta)(\s+[^>]*)?>/gi,a="ss"+Math.round(1e5*Math.random()),i=n.replace(r,function(n,o,r,i){var s={};return o||(t.merge(e,t("<"+r+"/>")),i&&t.each(t("<div"+i+"/>")[0].attributes,function(t,n){s[n.name]=n.value}),e.eq(-1).attr(s)),"<"+o+"div"+(o?"":" id='"+a+(e.length-1)+"'")+">"});return e.length?(o||(o=t("<div/>")),o.html(i),t.each(e,function(t){var n=o.find("#"+a+t).before(e[t]);e.eq(t).html(n.contents()),n.remove()}),o.children().unwrap()):t(n)},clearIfOverCapacity:function(t,n){return Object.keys||(Object.keys=function(t){var n,o=[];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&o.push(n);return o}),Object.keys(t).length>n&&(t={}),t},getContentById:function(n,o){o=o instanceof jQuery?o:i.htmlDoc(o);var e=o.find(n),r=e.length?t.trim(e.html()):o.filter(n).html(),a=r.length?t(r):null;return a},storePageIn:function(t,n,o){return o=o instanceof jQuery?o:i.htmlDoc(o),t[n]={status:"loaded",title:o.find("title").text(),html:o},t},triggerAllAnimationEndEvent:function(n,o){o=" "+o||"";var e=0,r="animationstart webkitAnimationStart oanimationstart MSAnimationStart",a="animationend webkitAnimationEnd oanimationend MSAnimationEnd",s="allanimationend",c=function(o){t(o.delegateTarget).is(n)&&(o.stopPropagation(),e++)},u=function(o){t(o.delegateTarget).is(n)&&(o.stopPropagation(),e--,0===e&&n.trigger(s))};n.on(r,c),n.on(a,u),n.on("allanimationend"+o,function(){e=0,i.redraw(n)})},redraw:function(t){t.height()}},s=function(o){if(null!==o.state){var e=n.location.href,r=t("#"+o.state.id),a=r.data("smoothState");a.href===e||i.isHash(e)||a.load(e,!0)}},c=function(e,a){var s=t(e),c={},u=n.location.href,l=function(t,o){o=o||!1;var e=!1,r=!1,i={loaded:function(){var a=e?"ss.onProgressEnd":"ss.onStartEnd";r&&e?r&&d(t):s.one(a,function(){d(t)}),o||n.history.pushState({id:s.prop("id")},c[t].title,t)},fetching:function(){e||(e=!0,s.one("ss.onStartEnd",function(){a.onProgress.render(t,s,null),setTimeout(function(){s.trigger("ss.onProgressEnd"),r=!0},a.onStart.duration)})),setTimeout(function(){c.hasOwnProperty(t)&&i[c[t].status]()},10)},error:function(){n.location=t}};c.hasOwnProperty(t)||h(t),a.onStart.render(t,s,null),setTimeout(function(){s.trigger("ss.onStartEnd")},a.onStart.duration),i[c[t].status]()},d=function(t){var e="#"+s.prop("id"),u=c[t]?i.getContentById(e,c[t].html):null;u?(o.title=c[t].title,s.data("smoothState").href=t,a.onEnd.render(t,s,u),s.one("ss.onEndEnd",function(){a.callback(t,s,u)}),setTimeout(function(){s.trigger("ss.onEndEnd")},a.onEnd.duration)):!u&&a.development&&r?r.warn("No element with an id of "+e+" in response from "+t+" in "+c):n.location=t},h=function(n){if(!c.hasOwnProperty(n)){c=i.clearIfOverCapacity(c,a.pageCacheSize),c[n]={status:"fetching"};var o=a.alterRequestUrl(n)||n,e=t.ajax(o);e.success(function(t){i.storePageIn(c,n,t),s.data("smoothState").cache=c}),e.error(function(){c[n].status="error"})}},f=function(n){var o=t(n.currentTarget),e=o.prop("href");i.shouldLoad(o,a.blacklist)&&(n.stopPropagation(),h(e))},m=function(n){var o=t(n.currentTarget),e=o.prop("href");n.metaKey||n.ctrlKey||!i.shouldLoad(o,a.blacklist)||(n.stopPropagation(),n.preventDefault(),l(e))},p=function(t){t.on("click",a.anchors,m),a.prefetch&&t.on("mouseover touchstart",a.anchors,f)},g=function(t){var n=s.addClass(t).prop("class");s.removeClass(n),setTimeout(function(){s.addClass(n)},0),s.one("ss.onStartEnd ss.onProgressEnd ss.onEndEnd",function(){s.removeClass(t)})};return a=t.extend({},t.fn.smoothState.options,a),null===n.history.state&&n.history.replaceState({id:s.prop("id")},o.title,u),i.storePageIn(c,u,o.documentElement.outerHTML),i.triggerAllAnimationEndEvent(s,"ss.onStartEnd ss.onProgressEnd ss.onEndEnd"),p(s),{href:u,cache:c,load:l,fetch:h,toggleAnimationClass:g}},u=function(n){return this.each(function(){this.id&&!t.data(this,"smoothState")?t.data(this,"smoothState",new c(this,n)):!this.id&&r&&r.warn("Every smoothState container needs an id but the following one does not have one:",this)})};n.onpopstate=s,t.smoothStateUtility=i,t.fn.smoothState=u,t.fn.smoothState.options=a}}(jQuery,window,document);