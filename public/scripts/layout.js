import main from './main.js';
let socket = io();

if(location.pathname == "/"){
  main(io, socket, $, AgoraRTC);
}
