/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__room_js__ = __webpack_require__(2);


let socket = io();

if(location.pathname == "/"){
  Object(__WEBPACK_IMPORTED_MODULE_0__main_js__["a" /* default */])(io, socket, $, AgoraRTC);
}else if(location.pathname.includes("/rooms/")){
  Object(__WEBPACK_IMPORTED_MODULE_1__room_js__["a" /* default */])(io, socket, $, AgoraRTC);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = main;
function main(io, socket, $, AgoraRTC) {
  $(document).ready(()=>{

    //Load all the current rooms
    socket.emit("get_rooms");
    socket.on("get_rooms", (rooms) => {
      rooms.forEach((room) => {
        let newRoom = $('.roomProtoType').clone(true, true)
        newRoom.removeClass('roomProtoType');
        newRoom.appendTo('.roomsContainer');
        newRoom.addClass('room').addClass(room.owner);
        newRoom.find('.roomName').text(room.name);
        newRoom.find('.roomOwner').text(room.owner);
        newRoom.find('.roomThumbUrl').attr('src', "http://blogdailyherald.com/wp-content/uploads/2014/10/wallpaper-for-facebook-profile-photo.jpg");
        newRoom.find('.roomLikeCount').text(room.likes + " Likes");
        newRoom.find('.roomViewCount').text(room.viewCount + " Views");
        newRoom.find('.roomId').text(room.id);
      })
    });

    //Add the new rooms that get created
    socket.on('new_room', (room) => {
      let newRoom = $('.roomProtoType').clone(true, true);
      newRoom.removeClass('roomProtoType');
      newRoom.appendTo('.roomsContainer');
      newRoom.addClass('room').addClass(room.owner);
      newRoom.find('.roomName').text(room.name);
      newRoom.find('.roomOwner').text(room.owner);
      newRoom.find('.roomThumbUrl').attr('src', "http://blogdailyherald.com/wp-content/uploads/2014/10/wallpaper-for-facebook-profile-photo.jpg");
      newRoom.find('.roomLikeCount').text(room.likes + " Likes");
      newRoom.find('.roomViewCount').text(room.viewCount + " Views");
      newRoom.find('.roomId').text(room.id);
    });

    socket.on('remove_room', (owner) => {
      console.log("Remove Room");
      $('.' + owner).remove();
    });

    //Client Enters a Room
    $(document).on('click', ".room", function () {
      window.location = "/rooms/" + $(this).find('.roomOwner').text();
    });

  })


}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = room;
function room(io, socket, $, AgoraRTC) {

  $(document).ready(() => {

    //Get Agora Client Connected and Get their Devices
    var client = AgoraRTC.createLiveClient();
    AgoraRTC.getDevices((devices) =>{
      console.log(devices);
      var dev_count = devices.length;
      var id = devices[0].deviceId;
    });

    let streamId = $('.roomId').text();

    var stream = AgoraRTC.createStream({streamID: streamId, audio:true, video:true, screen:false});

    client.join(streamId, function() {
        console.log("client initialized");
        //join channel
    }, function(err) {
        console.log("client init failed ", err);
        //error handling
    });

  })

}


/***/ })
/******/ ]);