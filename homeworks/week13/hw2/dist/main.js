/* eslint-disable */
var commentPlugin=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n){e.exports=jQuery},function(e,n,t){"use strict";t.r(n),t.d(n,"init",(function(){return i}));var r=t(0),o=t.n(r);function a(e){return e.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&#x27").replace(/\//g,"&#x2F")}function c(e,n,t){const r=`\n    <div class="card">\n      <div class="card-body">\n        <h5 class="card-title">${n.id} ${a(n.nickname)}</h5>\n        <p class="card-text">${a(n.content)}</p>\n      </div>\n    </div>\n  `;t?e.prepend(r):e.append(r)}function i(e){let n="",t="",r=null,a=null,i=null,l=!1;n=e.siteKey,t=e.apiUrl;const u=n+"-load-more",s=n+"-comments",d=n+"-add-comment-form",p="."+s,f="."+d;function m(){a=o()(p),o()("."+u).hide(),l||function(e,n,t,r){let a=`${e}/api_comments.php?site_key=${n}`;t&&(a+="&before="+t),o.a.ajax({url:a}).done(e=>{r(e)})}(t,n,i,e=>{if(!e.ok)return void alert(e.message);const n=e.discussions;for(const e of n)c(a,e);const{length:t}=n;if(0===t)l=!0,o()("."+u).hide();else{i=n[t-1].id;const e=`<button class="${u} btn btn-primary">載入更多</button>`;o()(p).append(e)}})}r=o()(e.containerSelector),r.append(function(e,n){return`\n    <div>\n      <form class="${e}">\n        <div class="form-group">\n          <label>暱稱</label>\n          <input name="nickname" type="text" class="form-control">\n        </div>\n        <div class="form-group">\n          <label>留言內容</label>\n          <textarea name='content' class="form-control" rows="3"></textarea>\n        </div>\n        <button type="submit" class="btn btn-primary">送出</button>\n      </form>\n      <div class="${n}">\n      </div>\n    </div>\n  `}(d,s)),function(e){const n=document.createElement("style");n.type="text/css",n.appendChild(document.createTextNode(e)),document.head.appendChild(n)}(".card {margin-top: 12px;}"),a=o()(p),m(),o()(p).on("click","."+u,()=>{m()}),o()(f).submit(e=>{e.preventDefault();const r=o()(f+" input[name=nickname]"),i=o()(f+" textarea[name=content]"),l={site_key:n,nickname:r.val(),content:i.val()};!function(e,n,t,r){o.a.ajax({type:"POST",url:e+"/api_add_comments.php",data:t}).done(e=>{r(e)})}(t,0,l,e=>{e.ok?(r.val(""),i.val(""),c(a,l,!0)):alert(e.message)})})}}]);