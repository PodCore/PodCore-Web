import main from './main.js';
import room from './room.js';
let socket = io();

if(location.pathname == "/"){
  main(io, socket, $, AgoraRTC);
}else if(location.pathname.includes("/rooms/")){
  room(io, socket, $, AgoraRTC);
}
