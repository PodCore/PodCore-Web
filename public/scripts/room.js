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

  let appId = "6a05c965b5644b508eae5db13c82fdba";

  client.init(appId, function() {
      console.log("client initialized");
      client.join(streamId, appId, null, function(uid) {
        console.log("User " + uid + " join channel successfully");
      }, function(err){
        console.log("join failed");
      })
      //join channel
  }, function(err) {
      console.log("client init failed ", err);
      //error handling
  });

  let stream = AgoraRTC.createStream({streamID: streamId, audio:true, video:true, screen:false})

  // stream.init(()=>{
  //   console.log("stream initalized");
  //   stream.play('video')
  // })

  // client.subscribe(stream, function(err) {
  //   console.log("Test");
  // })


  $(document).ready(() => {

  })

}
