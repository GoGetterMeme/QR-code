parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"efGe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.cardData=void 0;var e=[{id:0,name:"Strawberry",image:"028-strawberry.png",price:1},{id:1,name:"Banana",image:"006-bananas.png",price:2},{id:2,name:"Pear",image:"024-pear.png",price:2},{id:3,name:"Dragon Fruit",image:"015-dragon fruit.png",price:7},{id:4,name:"Orange",image:"022-orange.png",price:1},{id:5,name:"Mango",image:"021-mango.png",price:5},{id:6,name:"Lemon",image:"020-lemon.png",price:1},{id:7,name:"Watermelon",image:"030-watermelon.png",price:2},{id:8,name:"Berry",image:"008-berry.png",price:2},{id:9,name:"Pomegranate",image:"025-pomegranate.png",price:3},{id:10,name:"Blueberry",image:"009-blueberry.png",price:2},{id:11,name:"Rose Apple",image:"027-rose apple.png",price:4}];exports.cardData=e;
},{}],"toNQ":[function(require,module,exports) {
"use strict";function e(){document.addEventListener("DOMContentLoaded",function(){var e=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0);e.length>0&&e.forEach(function(e){e.addEventListener("click",function(){var t=e.dataset.target,n=document.getElementById(t);e.classList.toggle("is-active"),n.classList.toggle("is-active")})})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.burgerComponent=e;
},{}],"Rt62":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.serialComponent=n,exports.serial=void 0;var e={};function n(){e.getPorts=function(){return navigator.usb.getDevices().then(function(n){return n.map(function(n){return new e.Port(n)})})},e.requestPort=function(){return navigator.usb.requestDevice({filters:[{vendorId:9025,productId:32822},{vendorId:9025,productId:32823},{vendorId:9025,productId:32845},{vendorId:9025,productId:32846},{vendorId:9025,productId:32847},{vendorId:9025,productId:32848},{vendorId:9025,productId:32850},{vendorId:9025,productId:32851},{vendorId:9025,productId:32852},{vendorId:9025,productId:32853},{vendorId:9025,productId:32854},{vendorId:9025,productId:32855},{vendorId:6790,productId:29987},{vendorId:4292,productId:6e4},{vendorId:9114}]}).then(function(n){return new e.Port(n)})},e.Port=function(e){this.device_=e,this.interfaceNumber_=2,this.endpointIn_=5,this.endpointOut_=4},e.Port.prototype.connect=function(){var e=this;return this.device_.open().then(function(){if(null===e.device_.configuration)return e.device_.selectConfiguration(1)}).then(function(){e.device_.configuration.interfaces.forEach(function(n){n.alternates.forEach(function(t){255==t.interfaceClass&&(e.interfaceNumber_=n.interfaceNumber,t.endpoints.forEach(function(n){"out"==n.direction&&(e.endpointOut_=n.endpointNumber),"in"==n.direction&&(e.endpointIn_=n.endpointNumber)}))})})}).then(function(){return e.device_.claimInterface(e.interfaceNumber_)}).then(function(){return e.device_.selectAlternateInterface(e.interfaceNumber_,0)}).then(function(){return e.device_.controlTransferOut({requestType:"class",recipient:"interface",request:34,value:1,index:e.interfaceNumber_})}).then(function(){!function n(){e.device_.transferIn(e.endpointIn_,64).then(function(t){e.onReceive(t.data),n()},function(n){e.onReceiveError(n)})}()})},e.Port.prototype.disconnect=function(){var e=this;return this.device_.controlTransferOut({requestType:"class",recipient:"interface",request:34,value:0,index:this.interfaceNumber_}).then(function(){return e.device_.close()})},e.Port.prototype.send=function(e){return this.device_.transferOut(this.endpointOut_,e)}}exports.serial=e;
},{}],"O8X7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.deviceComponent=o,exports.withdrawFruit=c;var e,n=require("./serial");function o(){document.addEventListener("DOMContentLoaded",function(o){var c=document.querySelector("#connect");function r(){console.log("Connecting to "+e.device_.productName+"..."),e.connect().then(function(){console.log(e),console.log("Connected."),c.textContent="Disconnect Device",e.onReceive=function(e){var n=new TextDecoder;t.io.print(n.decode(e))},e.onReceiveError=function(e){console.log("Receive error: "+e)}},function(e){console.log("Connection error: "+e)})}c.addEventListener("click",function(){e?(e.disconnect(),c.textContent="Connect Device",e=null):n.serial.requestPort().then(function(n){e=n,r()}).catch(function(e){console.log("Connection error: "+e)})}),n.serial.getPorts().then(function(n){0==n.length?console.log("No devices found."):(e=n[0],r())})})}function c(n){if(void 0!==e){var o=new TextEncoder;e.send(o.encode(n)).catch(function(e){console.log("Send error: "+e)})}}
},{"./serial":"Rt62"}],"RSqK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.modalComponent=i,exports.amountToPay=void 0;var e=require("./web3entry");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function o(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}var a,l=function(){function e(n){t(this,e),this.elem=document.querySelector(n),this.close_data()}return o(e,[{key:"show",value:function(){this.elem.classList.toggle("is-active"),this.on_show()}},{key:"close",value:function(){this.elem.classList.toggle("is-active"),this.on_close()}},{key:"close_data",value:function(){var e=this.elem.querySelectorAll("[data-bulma-modal='close']"),t=this;e.forEach(function(e){e.addEventListener("click",function(){t.elem.classList.toggle("is-active");var e=new Event("modal:close");t.elem.dispatchEvent(e)})})}},{key:"on_show",value:function(){var e=new Event("modal:show");this.elem.dispatchEvent(e)}},{key:"on_close",value:function(){var e=new Event("modal:close");this.elem.dispatchEvent(e)}},{key:"addEventListener",value:function(e,t){this.elem.addEventListener(e,t)}}]),e}();function i(){var t=new l("#myModal");document.querySelectorAll(".card-content").forEach(function(n){n.addEventListener("click",function(o){t.show(),console.log(n);var l=n.getAttribute("name");console.log(l),document.getElementsByClassName("modal-card-title")[0].innerText=l;var i=n.getAttribute("data-img");console.log(i),document.getElementById("fimg").src=i;var c=n.getAttribute("data-price");exports.amountToPay=a=Number.parseFloat(c/e.ethPrice).toPrecision(2),document.getElementById("fruit-price").innerText="COST $"+c+" - PAY "+a+" ETH"})}),t.addEventListener("modal:show",function(){console.log("opened")}),t.addEventListener("modal:close",function(){console.log("closed")})}exports.amountToPay=a;
},{"./web3entry":"QgS7"}],"QgS7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.web3entryComponent=r,exports.ethPrice=void 0;var e=require("./device"),n=require("./modal"),t=new Web3("wss://kovan.infura.io/ws/v3/".concat("48d55356a0d24b91855f633e8cf4b197")),s=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"",type:"address"},{indexed:!1,internalType:"uint256",name:"",type:"uint256"}],name:"Received",type:"event"},{inputs:[],name:"getLatestPrice",outputs:[{internalType:"int256",name:"",type:"int256"}],stateMutability:"view",type:"function"},{stateMutability:"payable",type:"receive"}],a="0xf506771A3FB4386CC192ffF6B8534cDF084c3a6B";document.getElementById("address").innerText=a;var i,c=new t.eth.Contract(s,a);function r(){c.methods.getLatestPrice().call().then(function(e){exports.ethPrice=i=e/1e8,console.log("Ethereum Price: ",e/1e8)}),c.events.Received(function(t,s){if(s){var a=s.returnValues[1];console.log(a),console.log(1e18*n.amountToPay),a>=1e18*n.amountToPay?((0,e.withdrawFruit)("H"),document.getElementsByClassName("modal-card-body")[0].innerHTML='\n        <center>\n        <div class="columns is-vcentered has-background-primary">\n            <div class="column">\n                <strong class="has-text-black">\n                Payment Succeeded\n                </strong>\n                <br>\n            </div>\n        </div>\n        <div class="columns is-vcentered">\n            <div class="column">\n                <figure class="image is-128x128">\n                <img src="basket.png" alt="">\n                </figure>\n            </div>\n        </div>\n        <div class="columns is-vcentered has-background-info-light">\n            <div class="column">\n               <strong class="has-text-black">You can now withdraw your purchase</strong> \n            </div>\n        </div>\n\n    </center>\n        '):document.getElementsByClassName("modal-card-body")[0].innerHTML='\n        <center>\n        <div class="columns is-vcentered has-background-danger">\n            <div class="column">\n                <strong class="has-text-black">\n                Failed to proceed: Insufficient funds sent\n                </strong>\n                <br>\n            </div>\n        </div>\n        <div class="columns is-vcentered">\n            <div class="column">\n                <figure class="image is-128x128">\n                <img src="cashier.png" alt="">\n                </figure>\n            </div>\n        </div>\n        <div class="columns is-vcentered has-background-info-light">\n            <div class="column">\n               <strong class="has-text-black">Please remake your purchase</strong> \n            </div>\n        </div>\n\n    </center>\n        '}})}exports.ethPrice=i;
},{"./device":"O8X7","./modal":"RSqK"}],"epB2":[function(require,module,exports) {
"use strict";var e=require("./js/card"),r=require("./js/burger"),a=require("./js/web3entry"),n=require("./js/modal"),o=require("./js/serial"),t=require("./js/device");new Vue({el:"#app",data:{cardData:e.cardData}}),(0,r.burgerComponent)(),(0,a.web3entryComponent)(),(0,n.modalComponent)(),(0,o.serialComponent)(),(0,t.deviceComponent)();
},{"./js/card":"efGe","./js/burger":"toNQ","./js/web3entry":"QgS7","./js/modal":"RSqK","./js/serial":"Rt62","./js/device":"O8X7"}]},{},["epB2"], null)
//# sourceMappingURL=main.acc486d7.js.map