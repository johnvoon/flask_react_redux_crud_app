webpackJsonp([9,15],{1193:function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),c=r.n(i),u=r(32),s=(r.n(u),r(242)),f=r.n(s),l=r(2),p=r.n(l),h=r(541),v=r(243),y=(r.n(v),r(53)),d=r(1415),b=function(){function t(t,e){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{!n&&c.return&&c.return()}finally{if(o)throw a}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),m=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),_=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},g=function(t){var e=t.practiceArea,r=t.entities;return _({},e,r)},j=function(t){return{onFetchPracticeAreas:function(){t(r.i(d.a)())},onFetchPracticeArea:function(e){t(r.i(d.b)(e))}}},w=function(t){function e(t){n(this,e);var r=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return r.handleChange=r.handleChange.bind(r),r}return a(e,t),m(e,[{key:"componentDidMount",value:function(){var t=this.props,e=t.onFetchPracticeAreas,r=t.onFetchPracticeArea,n=t.params;e(),r(n.slug)}},{key:"handleChange",value:function(t){var e=t.target.value,r=this.props,n=r.onFetchPracticeArea,o=r.practiceAreas,a=r.router,i=o[e];n(i.slug),a.push("/practice-areas/"+i.slug)}},{key:"render",value:function(){var t=this.props,e=t.practiceAreas,n=t.currentPracticeArea,o=n.area,a=(n.slug||"").split("-")[0],i=r.i(h.c)(e,"area"),u=(n.description||[]).map(function(t,e){return n.description.length>1?c.a.createElement("p",{key:e},t):c.a.createElement("div",{key:e,dangerouslySetInnerHTML:{__html:u}})});return c.a.createElement("main",{className:"practice-area"},c.a.createElement(f.a,{title:o,meta:[{name:"description",content:o}]}),c.a.createElement("div",{className:"jumbotron hidden-md hidden-lg",style:{backgroundImage:"url("+n.imgSrc+")"}},c.a.createElement("div",{className:"container text-center"},c.a.createElement("h1",{className:"text-uppercase"},o),c.a.createElement("select",{className:p()("form-control","select","bg-"+a),onChange:this.handleChange},c.a.createElement("option",{className:"text-uppercase ",value:""},"Select Practice Area"),i.map(function(t){var e=t.split(" - "),r=b(e,2),n=r[0],o=r[1];return c.a.createElement("option",{key:n,value:n},o)})))),c.a.createElement("div",{className:"container-fluid visible-sm visible-xs"},u),c.a.createElement("div",{className:"row practice-area-container visible-md visible-lg"},c.a.createElement("div",{className:"col-md-5 practice-area-image",style:{backgroundImage:"url('https://www.conceptlawfirm.xyz/static/images/2000/"+a+".jpg')"}},c.a.createElement("div",{className:"select-absolute"},c.a.createElement("h1",{className:"text-uppercase text-left"},o),c.a.createElement("select",{className:p()("form-control","select","bg-"+a),onChange:this.handleChange},c.a.createElement("option",{className:"text-uppercase ",value:""},"Select Practice Area"),i.map(function(t){var e=t.split(" - "),r=b(e,2),n=r[0],o=r[1];return c.a.createElement("option",{key:n,value:n},o)})))),c.a.createElement("div",{className:"col-md-7 practice-area-content"},c.a.createElement(v.Scrollbars,{style:{width:"80%",height:"70%",marginTop:"70px",marginLeft:"auto",marginRight:"auto"}},u))),c.a.createElement("footer",{className:"footer text-center"},c.a.createElement("div",{className:"container"},c.a.createElement("ul",{className:"list-inline"},c.a.createElement("li",{className:"text-muted"},"Concept Law Firm © 2017"),c.a.createElement("li",null,c.a.createElement(y.Link,{to:"#"},"Contact")),c.a.createElement("li",null,c.a.createElement(y.Link,{to:"#"},"Privacy Policy")),c.a.createElement("li",null,c.a.createElement(y.Link,{to:"#"},"Terms of Service"))))))}}]),e}(i.Component);e.default=r.i(y.withRouter)(r.i(u.connect)(g,j)(w)),w.propTypes={onFetchPracticeAreas:i.PropTypes.func.isRequired,onFetchPracticeArea:i.PropTypes.func.isRequired,currentPracticeArea:i.PropTypes.object.isRequired,params:i.PropTypes.object.isRequired,practiceAreas:i.PropTypes.object.isRequired,router:i.PropTypes.object.isRequired}},1315:function(t,e,r){var n=r(1332),o="object"==typeof self&&self&&self.Object===Object&&self,a=n||o||Function("return this")();t.exports=a},1316:function(t,e,r){function n(t,e){var r=a(t,e);return o(r)?r:void 0}var o=r(1360),a=r(1373);t.exports=n},1317:function(t,e,r){"use strict";function n(t){return{type:m.f,value:t}}function o(t){return{type:m.g,value:t}}function a(t){return{type:m.h,value:t}}function i(t){return{type:m.i,value:t}}function c(t){return{type:m.j,sortBy:t}}function u(t){return{type:m.k,value:t}}function s(t,e){return{type:m.l,records:t,recordIds:e}}function f(t,e,r){return{type:m.m,entities:t,addedRecord:e,addedRecordId:r}}function l(t,e,r){return{type:m.n,entities:t,editedRecord:e,editedRecordId:r}}function p(t,e,r){return{type:m.o,entities:t,records:e,recordIds:r}}function h(t,e){return{type:m.p,entities:t,commentId:e}}function v(t){return{type:m.q,formData:t}}function y(){return{type:m.r}}function d(){return{type:m.s}}function b(){return{type:m.t}}var m=r(33);e.h=n,e.i=o,e.n=a,e.l=i,e.g=c,e.f=u,e.a=s,e.b=f,e.c=l,e.e=p,e.d=h,e.o=v,e.j=y,e.k=d,e.m=b},1318:function(t,e){function r(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=r},1319:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e,r){t[e]=r}function a(t,e,r,n,a){var i=n.assignEntity,c=void 0===i?o:i,u=e&&e.getDefaults&&e.getDefaults(),s=e&&e.getAssignEntity&&e.getAssignEntity(),f=(0,S.default)(u)?m({},u):{};for(var l in t)if(t.hasOwnProperty(l)){var h="function"==typeof e[l]?e[l].call(null,t):e[l],v=p(t[l],h,r,n,a);c.call(null,f,l,v,t,e),s&&s.call(null,f,l,v,t,e)}return f}function i(t,e,r,n){return function(t,o){return p(t,e,r,n,o)}}function c(t,e,r,n){return function(o,a){var i=t.getSchemaKey(o),c=p(o,e[i],r,n,a);return{id:c,schema:i}}}function u(t,e,r,n){var o=e.getItemSchema(),a=i(e,o,r,n);return Array.isArray(t)?t.map(a):Object.keys(t).reduce(function(e,r){return e[r]=a(t[r],r),e},{})}function s(t,e,r,n){var o=e.getItemSchema();return c(e,o,r,n)(t)}function f(t,e,r){for(var n in e)e.hasOwnProperty(n)&&(t.hasOwnProperty(n)&&!(0,E.default)(t[n],e[n])?console.warn("When merging two "+r+', found unequal data in their "'+n+'" values. Using the earlier value.',t[n],e[n]):t[n]=e[n])}function l(t,e,r,n,o){var i=n.mergeIntoEntity,c=void 0===i?f:i,u=e.getKey(),s=e.getId(t,o);r.hasOwnProperty(u)||(r[u]={}),r[u].hasOwnProperty(s)||(r[u][s]={});var l=r[u][s],p=a(t,e,r,n,o);return c(l,p,u),s}function p(t,e,r,n,o){return(0,S.default)(t)&&(0,S.default)(e)?e instanceof g.default?l(t,e,r,n,o):e instanceof w.default?u(t,e,r,n):e instanceof O.default?s(t,e,r,n):a(t,e,r,n,o):t}function h(t){return(0,S.default)(t)&&(0,E.default)(Object.keys(t),Object.keys(t).map(function(e){return t[e]}))?Object.keys(t):t}function v(t,e){return new w.default(t,e)}function y(t,e){return new w.default(t,e)}function d(t,e){return new O.default(t,e)}function b(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,S.default)(t))throw new Error("Normalize accepts an object or an array as its input.");if(!(0,S.default)(e)||Array.isArray(e))throw new Error("Normalize accepts an object for schema.");var n={},o=p(t,e,n,r);return{entities:n,result:h(o)}}Object.defineProperty(e,"__esModule",{value:!0}),e.Schema=void 0;var m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};e.arrayOf=v,e.valuesOf=y,e.unionOf=d,e.normalize=b;var _=r(1412),g=n(_),j=r(1413),w=n(j),x=r(1339),O=n(x),A=r(1408),E=n(A),P=r(1318),S=n(P);e.Schema=g.default},1320:function(t,e,r){function n(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}var o=r(1383),a=r(1384),i=r(1385),c=r(1386),u=r(1387);n.prototype.clear=o,n.prototype.delete=a,n.prototype.get=i,n.prototype.has=c,n.prototype.set=u,t.exports=n},1321:function(t,e,r){function n(t,e){for(var r=t.length;r--;)if(o(t[r][0],e))return r;return-1}var o=r(1334);t.exports=n},1322:function(t,e,r){function n(t){return null==t?void 0===t?u:c:s&&s in Object(t)?a(t):i(t)}var o=r(1328),a=r(1370),i=r(1396),c="[object Null]",u="[object Undefined]",s=o?o.toStringTag:void 0;t.exports=n},1323:function(t,e,r){function n(t,e){var r=t.__data__;return o(e)?r["string"==typeof e?"string":"hash"]:r.map}var o=r(1380);t.exports=n},1324:function(t,e,r){var n=r(1316),o=n(Object,"create");t.exports=o},1325:function(t,e){function r(t){return null!=t&&"object"==typeof t}t.exports=r},1326:function(t,e,r){"use strict";var n=r(1319);r.n(n);r.d(e,"a",function(){return h}),r.d(e,"c",function(){return v}),r.d(e,"b",function(){return y}),r.d(e,"i",function(){return d}),r.d(e,"g",function(){return b}),r.d(e,"h",function(){return m}),r.d(e,"e",function(){return _}),r.d(e,"f",function(){return g}),r.d(e,"d",function(){return j});var o=new n.Schema("practiceAreas"),a=new n.Schema("posts"),i=new n.Schema("comments"),c=new n.Schema("users"),u=new n.Schema("staff"),s=new n.Schema("staffUsers",{idAttribute:"userId"}),f=new n.Schema("clients"),l=new n.Schema("clientUsers",{idAttribute:"userId"}),p=new n.Schema("matters"),h=(new n.Schema("currentUser"),o),v=a,y=i,d=c,b=u,m=s,_=f,g=l,j=p},1327:function(t,e,r){var n=r(1316),o=r(1315),a=n(o,"Map");t.exports=a},1328:function(t,e,r){var n=r(1315),o=n.Symbol;t.exports=o},1329:function(t,e){var r=Array.isArray;t.exports=r},1330:function(t,e,r){function n(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}var o=r(1388),a=r(1389),i=r(1390),c=r(1391),u=r(1392);n.prototype.clear=o,n.prototype.delete=a,n.prototype.get=i,n.prototype.has=c,n.prototype.set=u,t.exports=n},1331:function(t,e,r){function n(t,e,r,n,s,f){var l=r&c,p=t.length,h=e.length;if(p!=h&&!(l&&h>p))return!1;var v=f.get(t);if(v&&f.get(e))return v==e;var y=-1,d=!0,b=r&u?new o:void 0;for(f.set(t,e),f.set(e,t);++y<p;){var m=t[y],_=e[y];if(n)var g=l?n(_,m,y,e,t,f):n(m,_,y,t,e,f);if(void 0!==g){if(g)continue;d=!1;break}if(b){if(!a(e,function(t,e){if(!i(b,e)&&(m===t||s(m,t,r,n,f)))return b.push(e)})){d=!1;break}}else if(m!==_&&!s(m,_,r,n,f)){d=!1;break}}return f.delete(t),f.delete(e),d}var o=r(1348),a=r(1355),i=r(1365),c=1,u=2;t.exports=n},1332:function(t,e,r){(function(e){var r="object"==typeof e&&e&&e.Object===Object&&e;t.exports=r}).call(e,r(21))},1333:function(t,e){function r(t){if(null!=t){try{return o.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var n=Function.prototype,o=n.toString;t.exports=r},1334:function(t,e){function r(t,e){return t===e||t!==t&&e!==e}t.exports=r},1335:function(t,e,r){(function(t){var n=r(1315),o=r(1411),a="object"==typeof e&&e&&!e.nodeType&&e,i=a&&"object"==typeof t&&t&&!t.nodeType&&t,c=i&&i.exports===a,u=c?n.Buffer:void 0,s=u?u.isBuffer:void 0,f=s||o;t.exports=f}).call(e,r(106)(t))},1336:function(t,e,r){function n(t){if(!a(t))return!1;var e=o(t);return e==c||e==u||e==i||e==s}var o=r(1322),a=r(1318),i="[object AsyncFunction]",c="[object Function]",u="[object GeneratorFunction]",s="[object Proxy]";t.exports=n},1337:function(t,e){function r(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=n}var n=9007199254740991;t.exports=r},1338:function(t,e,r){var n=r(1361),o=r(1364),a=r(1395),i=a&&a.isTypedArray,c=i?o(i):n;t.exports=c},1339:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(1318),c=n(i),u=function(){function t(e,r){if(o(this,t),!(0,c.default)(e))throw new Error("UnionSchema requires item schema to be an object.");if(!r||!r.schemaAttribute)throw new Error("UnionSchema requires schemaAttribute option.");this._itemSchema=e;var n=r.schemaAttribute;this._getSchema="function"==typeof n?n:function(t){return t[n]}}return a(t,[{key:"getItemSchema",value:function(){return this._itemSchema}},{key:"getSchemaKey",value:function(t){return this._getSchema(t)}}]),t}();e.default=u},1344:function(t,e,r){var n=r(1316),o=r(1315),a=n(o,"DataView");t.exports=a},1345:function(t,e,r){function n(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}var o=r(1374),a=r(1375),i=r(1376),c=r(1377),u=r(1378);n.prototype.clear=o,n.prototype.delete=a,n.prototype.get=i,n.prototype.has=c,n.prototype.set=u,t.exports=n},1346:function(t,e,r){var n=r(1316),o=r(1315),a=n(o,"Promise");t.exports=a},1347:function(t,e,r){var n=r(1316),o=r(1315),a=n(o,"Set");t.exports=a},1348:function(t,e,r){function n(t){var e=-1,r=null==t?0:t.length;for(this.__data__=new o;++e<r;)this.add(t[e])}var o=r(1330),a=r(1398),i=r(1399);n.prototype.add=n.prototype.push=a,n.prototype.has=i,t.exports=n},1349:function(t,e,r){function n(t){var e=this.__data__=new o(t);this.size=e.size}var o=r(1320),a=r(1401),i=r(1402),c=r(1403),u=r(1404),s=r(1405);n.prototype.clear=a,n.prototype.delete=i,n.prototype.get=c,n.prototype.has=u,n.prototype.set=s,t.exports=n},1350:function(t,e,r){var n=r(1315),o=n.Uint8Array;t.exports=o},1351:function(t,e,r){var n=r(1316),o=r(1315),a=n(o,"WeakMap");t.exports=a},1352:function(t,e){function r(t,e){for(var r=-1,n=null==t?0:t.length,o=0,a=[];++r<n;){var i=t[r];e(i,r,t)&&(a[o++]=i)}return a}t.exports=r},1353:function(t,e,r){function n(t,e){var r=i(t),n=!r&&a(t),f=!r&&!n&&c(t),p=!r&&!n&&!f&&s(t),h=r||n||f||p,v=h?o(t.length,String):[],y=v.length;for(var d in t)!e&&!l.call(t,d)||h&&("length"==d||f&&("offset"==d||"parent"==d)||p&&("buffer"==d||"byteLength"==d||"byteOffset"==d)||u(d,y))||v.push(d);return v}var o=r(1363),a=r(1406),i=r(1329),c=r(1335),u=r(1379),s=r(1338),f=Object.prototype,l=f.hasOwnProperty;t.exports=n},1354:function(t,e){function r(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}t.exports=r},1355:function(t,e){function r(t,e){for(var r=-1,n=null==t?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}t.exports=r},1356:function(t,e,r){function n(t,e,r){var n=e(t);return a(t)?n:o(n,r(t))}var o=r(1354),a=r(1329);t.exports=n},1357:function(t,e,r){function n(t){return a(t)&&o(t)==i}var o=r(1322),a=r(1325),i="[object Arguments]";t.exports=n},1358:function(t,e,r){function n(t,e,r,i,c){return t===e||(null==t||null==e||!a(t)&&!a(e)?t!==t&&e!==e:o(t,e,r,i,n,c))}var o=r(1359),a=r(1325);t.exports=n},1359:function(t,e,r){function n(t,e,r,n,d,m){var _=s(t),g=s(e),j=_?v:u(t),w=g?v:u(e);j=j==h?y:j,w=w==h?y:w;var x=j==y,O=w==y,A=j==w;if(A&&f(t)){if(!f(e))return!1;_=!0,x=!1}if(A&&!x)return m||(m=new o),_||l(t)?a(t,e,r,n,d,m):i(t,e,j,r,n,d,m);if(!(r&p)){var E=x&&b.call(t,"__wrapped__"),P=O&&b.call(e,"__wrapped__");if(E||P){var S=E?t.value():t,k=P?e.value():e;return m||(m=new o),d(S,k,r,n,m)}}return!!A&&(m||(m=new o),c(t,e,r,n,d,m))}var o=r(1349),a=r(1331),i=r(1367),c=r(1368),u=r(1372),s=r(1329),f=r(1335),l=r(1338),p=1,h="[object Arguments]",v="[object Array]",y="[object Object]",d=Object.prototype,b=d.hasOwnProperty;t.exports=n},1360:function(t,e,r){function n(t){if(!i(t)||a(t))return!1;var e=o(t)?v:s;return e.test(c(t))}var o=r(1336),a=r(1381),i=r(1318),c=r(1333),u=/[\\^$.*+?()[\]{}|]/g,s=/^\[object .+?Constructor\]$/,f=Function.prototype,l=Object.prototype,p=f.toString,h=l.hasOwnProperty,v=RegExp("^"+p.call(h).replace(u,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=n},1361:function(t,e,r){function n(t){return i(t)&&a(t.length)&&!!I[o(t)]}var o=r(1322),a=r(1337),i=r(1325),c="[object Arguments]",u="[object Array]",s="[object Boolean]",f="[object Date]",l="[object Error]",p="[object Function]",h="[object Map]",v="[object Number]",y="[object Object]",d="[object RegExp]",b="[object Set]",m="[object String]",_="[object WeakMap]",g="[object ArrayBuffer]",j="[object DataView]",w="[object Float32Array]",x="[object Float64Array]",O="[object Int8Array]",A="[object Int16Array]",E="[object Int32Array]",P="[object Uint8Array]",S="[object Uint8ClampedArray]",k="[object Uint16Array]",z="[object Uint32Array]",I={};I[w]=I[x]=I[O]=I[A]=I[E]=I[P]=I[S]=I[k]=I[z]=!0,I[c]=I[u]=I[g]=I[s]=I[j]=I[f]=I[l]=I[p]=I[h]=I[v]=I[y]=I[d]=I[b]=I[m]=I[_]=!1,t.exports=n},1362:function(t,e,r){function n(t){if(!o(t))return a(t);var e=[];for(var r in Object(t))c.call(t,r)&&"constructor"!=r&&e.push(r);return e}var o=r(1382),a=r(1394),i=Object.prototype,c=i.hasOwnProperty;t.exports=n},1363:function(t,e){function r(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}t.exports=r},1364:function(t,e){function r(t){return function(e){return t(e)}}t.exports=r},1365:function(t,e){function r(t,e){return t.has(e)}t.exports=r},1366:function(t,e,r){var n=r(1315),o=n["__core-js_shared__"];t.exports=o},1367:function(t,e,r){function n(t,e,r,n,o,x,A){switch(r){case w:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case j:return!(t.byteLength!=e.byteLength||!x(new a(t),new a(e)));case p:case h:case d:return i(+t,+e);case v:return t.name==e.name&&t.message==e.message;case b:case _:return t==e+"";case y:var E=u;case m:var P=n&f;if(E||(E=s),t.size!=e.size&&!P)return!1;var S=A.get(t);if(S)return S==e;n|=l,A.set(t,e);var k=c(E(t),E(e),n,o,x,A);return A.delete(t),k;case g:if(O)return O.call(t)==O.call(e)}return!1}var o=r(1328),a=r(1350),i=r(1334),c=r(1331),u=r(1393),s=r(1400),f=1,l=2,p="[object Boolean]",h="[object Date]",v="[object Error]",y="[object Map]",d="[object Number]",b="[object RegExp]",m="[object Set]",_="[object String]",g="[object Symbol]",j="[object ArrayBuffer]",w="[object DataView]",x=o?o.prototype:void 0,O=x?x.valueOf:void 0;t.exports=n},1368:function(t,e,r){function n(t,e,r,n,i,u){var s=r&a,f=o(t),l=f.length,p=o(e),h=p.length;if(l!=h&&!s)return!1;for(var v=l;v--;){var y=f[v];if(!(s?y in e:c.call(e,y)))return!1}var d=u.get(t);if(d&&u.get(e))return d==e;var b=!0;u.set(t,e),u.set(e,t);for(var m=s;++v<l;){y=f[v];var _=t[y],g=e[y];if(n)var j=s?n(g,_,y,e,t,u):n(_,g,y,t,e,u);if(!(void 0===j?_===g||i(_,g,r,n,u):j)){b=!1;break}m||(m="constructor"==y)}if(b&&!m){var w=t.constructor,x=e.constructor;w!=x&&"constructor"in t&&"constructor"in e&&!("function"==typeof w&&w instanceof w&&"function"==typeof x&&x instanceof x)&&(b=!1)}return u.delete(t),u.delete(e),b}var o=r(1369),a=1,i=Object.prototype,c=i.hasOwnProperty;t.exports=n},1369:function(t,e,r){function n(t){return o(t,i,a)}var o=r(1356),a=r(1371),i=r(1409);t.exports=n},1370:function(t,e,r){function n(t){var e=i.call(t,u),r=t[u];try{t[u]=void 0;var n=!0}catch(t){}var o=c.call(t);return n&&(e?t[u]=r:delete t[u]),o}var o=r(1328),a=Object.prototype,i=a.hasOwnProperty,c=a.toString,u=o?o.toStringTag:void 0;t.exports=n},1371:function(t,e,r){var n=r(1352),o=r(1410),a=Object.prototype,i=a.propertyIsEnumerable,c=Object.getOwnPropertySymbols,u=c?function(t){return null==t?[]:(t=Object(t),n(c(t),function(e){return i.call(t,e)}))}:o;t.exports=u},1372:function(t,e,r){var n=r(1344),o=r(1327),a=r(1346),i=r(1347),c=r(1351),u=r(1322),s=r(1333),f="[object Map]",l="[object Object]",p="[object Promise]",h="[object Set]",v="[object WeakMap]",y="[object DataView]",d=s(n),b=s(o),m=s(a),_=s(i),g=s(c),j=u;(n&&j(new n(new ArrayBuffer(1)))!=y||o&&j(new o)!=f||a&&j(a.resolve())!=p||i&&j(new i)!=h||c&&j(new c)!=v)&&(j=function(t){var e=u(t),r=e==l?t.constructor:void 0,n=r?s(r):"";if(n)switch(n){case d:return y;case b:return f;case m:return p;case _:return h;case g:return v}return e}),t.exports=j},1373:function(t,e){function r(t,e){return null==t?void 0:t[e]}t.exports=r},1374:function(t,e,r){function n(){this.__data__=o?o(null):{},this.size=0}var o=r(1324);t.exports=n},1375:function(t,e){function r(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}t.exports=r},1376:function(t,e,r){function n(t){var e=this.__data__;if(o){var r=e[t];return r===a?void 0:r}return c.call(e,t)?e[t]:void 0}var o=r(1324),a="__lodash_hash_undefined__",i=Object.prototype,c=i.hasOwnProperty;t.exports=n},1377:function(t,e,r){function n(t){var e=this.__data__;return o?void 0!==e[t]:i.call(e,t)}var o=r(1324),a=Object.prototype,i=a.hasOwnProperty;t.exports=n},1378:function(t,e,r){function n(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=o&&void 0===e?a:e,this}var o=r(1324),a="__lodash_hash_undefined__";t.exports=n},1379:function(t,e){function r(t,e){return e=null==e?n:e,!!e&&("number"==typeof t||o.test(t))&&t>-1&&t%1==0&&t<e}var n=9007199254740991,o=/^(?:0|[1-9]\d*)$/;t.exports=r},1380:function(t,e){function r(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}t.exports=r},1381:function(t,e,r){function n(t){return!!a&&a in t}var o=r(1366),a=function(){var t=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();t.exports=n},1382:function(t,e){function r(t){var e=t&&t.constructor,r="function"==typeof e&&e.prototype||n;return t===r}var n=Object.prototype;t.exports=r},1383:function(t,e){function r(){this.__data__=[],this.size=0}t.exports=r},1384:function(t,e,r){function n(t){var e=this.__data__,r=o(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():i.call(e,r,1),--this.size,!0}var o=r(1321),a=Array.prototype,i=a.splice;t.exports=n},1385:function(t,e,r){function n(t){var e=this.__data__,r=o(e,t);return r<0?void 0:e[r][1]}var o=r(1321);t.exports=n},1386:function(t,e,r){function n(t){return o(this.__data__,t)>-1}var o=r(1321);t.exports=n},1387:function(t,e,r){function n(t,e){var r=this.__data__,n=o(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var o=r(1321);t.exports=n},1388:function(t,e,r){function n(){this.size=0,this.__data__={hash:new o,map:new(i||a),string:new o}}var o=r(1345),a=r(1320),i=r(1327);t.exports=n},1389:function(t,e,r){function n(t){var e=o(this,t).delete(t);return this.size-=e?1:0,e}var o=r(1323);t.exports=n},1390:function(t,e,r){function n(t){return o(this,t).get(t)}var o=r(1323);t.exports=n},1391:function(t,e,r){function n(t){return o(this,t).has(t)}var o=r(1323);t.exports=n},1392:function(t,e,r){function n(t,e){var r=o(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var o=r(1323);t.exports=n},1393:function(t,e){function r(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r}t.exports=r},1394:function(t,e,r){var n=r(1397),o=n(Object.keys,Object);t.exports=o},1395:function(t,e,r){(function(t){var n=r(1332),o="object"==typeof e&&e&&!e.nodeType&&e,a=o&&"object"==typeof t&&t&&!t.nodeType&&t,i=a&&a.exports===o,c=i&&n.process,u=function(){try{return c&&c.binding&&c.binding("util")}catch(t){}}();t.exports=u}).call(e,r(106)(t))},1396:function(t,e){function r(t){return o.call(t)}var n=Object.prototype,o=n.toString;t.exports=r},1397:function(t,e){function r(t,e){return function(r){return t(e(r))}}t.exports=r},1398:function(t,e){function r(t){return this.__data__.set(t,n),this}var n="__lodash_hash_undefined__";t.exports=r},1399:function(t,e){function r(t){return this.__data__.has(t)}t.exports=r},1400:function(t,e){function r(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}t.exports=r},1401:function(t,e,r){function n(){this.__data__=new o,this.size=0}var o=r(1320);t.exports=n},1402:function(t,e){function r(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}t.exports=r},1403:function(t,e){function r(t){return this.__data__.get(t)}t.exports=r},1404:function(t,e){function r(t){return this.__data__.has(t)}t.exports=r},1405:function(t,e,r){function n(t,e){var r=this.__data__;if(r instanceof o){var n=r.__data__;if(!a||n.length<c-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new i(n)}return r.set(t,e),this.size=r.size,this}var o=r(1320),a=r(1327),i=r(1330),c=200;t.exports=n},1406:function(t,e,r){var n=r(1357),o=r(1325),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,u=n(function(){return arguments}())?n:function(t){return o(t)&&i.call(t,"callee")&&!c.call(t,"callee")};t.exports=u},1407:function(t,e,r){function n(t){return null!=t&&a(t.length)&&!o(t)}var o=r(1336),a=r(1337);t.exports=n},1408:function(t,e,r){function n(t,e){return o(t,e)}var o=r(1358);t.exports=n},1409:function(t,e,r){function n(t){return i(t)?o(t):a(t)}var o=r(1353),a=r(1362),i=r(1407);t.exports=n},1410:function(t,e){function r(){return[]}t.exports=r},1411:function(t,e){function r(){return!1}t.exports=r},1412:function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),a=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(n(this,t),!e||"string"!=typeof e)throw new Error("A string non-empty key is required");this._key=e,this._assignEntity=r.assignEntity;var o=r.idAttribute||"id";this._getId="function"==typeof o?o:function(t){return t[o]},this._idAttribute=o,this._meta=r.meta,this._defaults=r.defaults}return o(t,[{key:"getAssignEntity",value:function(){return this._assignEntity}},{key:"getKey",value:function(){return this._key}},{key:"getId",value:function(t,e){return this._getId(t,e)}},{key:"getIdAttribute",value:function(){return this._idAttribute}},{key:"getMeta",value:function(t){if(!t||"string"!=typeof t)throw new Error("A string non-empty property name is required");return this._meta&&this._meta[t]}},{key:"getDefaults",value:function(){return this._defaults}},{key:"define",value:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e])}}]),t}();e.default=a},1413:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(1318),c=n(i),u=r(1339),s=n(u),f=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o(this,t),!(0,c.default)(e))throw new Error("ArraySchema requires item schema to be an object.");if(r.schemaAttribute){var n=r.schemaAttribute;this._itemSchema=new s.default(e,{schemaAttribute:n})}else this._itemSchema=e}return a(t,[{key:"getItemSchema",value:function(){return this._itemSchema}}]),t}();e.default=f},1415:function(t,e,r){"use strict";function n(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(e){return f.a.get("https://www.conceptlawfirm.xyz/api/practice-areas").then(function(n){var o=n.data.practiceAreas,a=r.i(l.normalize)(o,r.i(l.arrayOf)(p.a));e(t?r.i(h.a)(a.entities.practiceAreas,a.result):c(a.entities,a.result))})}}function o(t){return function(e){return f.a.get("https://www.conceptlawfirm.xyz/api/practice-areas/"+t).then(function(t){var n=t.data.practiceArea,o=r.i(l.normalize)(n,p.a);return e(u(o.entities.practiceAreas,n.id))})}}function a(t,e){return function(n){return f.a.post("https://www.conceptlawfirm.xyz/api/practice-areas",e,t).then(function(t){var e=t.data.practiceArea,o=r.i(l.normalize)(e,p.a);n(r.i(h.b)(o.entities,o.entities.practiceAreas,e.id))})}}function i(t,e,n){return function(o){return f.a.put("https://www.conceptlawfirm.xyz/api/practice-areas/"+n,e,t).then(function(t){var e=t.data.practiceArea,n=r.i(l.normalize)(e,p.a);o(r.i(h.c)(n.entities,n.entities.practiceAreas,e.id))})}}function c(t,e){return{type:v.d,entities:t,practiceAreaIds:e}}function u(t,e){return{type:v.e,practiceArea:t,practiceAreaId:e}}var s=r(105),f=r.n(s),l=r(1319),p=(r.n(l),r(1326)),h=r(1317),v=r(33);e.a=n,e.b=o,e.d=a,e.c=i}});