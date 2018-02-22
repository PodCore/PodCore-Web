export default function room(io, socket, $, AgoraRTC) {

  console.log(AgoraRTC);
  //Get Agora Client Connected and Get their Devices
  let client = AgoraRTC.createClient({mode: 'interop'});
  // AgoraRTC.getDevices((devices) =>{
  //   console.log(devices);
  //   var dev_count = devices.length;
  //   var id = devices[0].deviceId;
  // });

  let streamId = $('.roomId').text();

  //var stream = AgoraRTC.createStream({streamID: streamId, audio:true, video:true, screen:false});

  let appId = "6a05c965b5644b508eae5db13c82fdba";

  client.init(appId, function() {
      console.log("client initialized");
      client.join(streamId, null, function(uid) {
        console.log("User " + uid + " join channel successfully");
      }, function(err){
        console.log("join failed");
      })
      //join channel
  }, function(err) {
      console.log("client init failed ", err);
      //error handling
  });

  // client.subscribe(stream, function(err) {
  //   console.log("Test");
  // })


  $(document).ready(() => {

  })

}
