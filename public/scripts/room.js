export default function room(io, socket, $, AgoraRTC) {

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

    client.join(streamId, undefined, function(uid) {
        console.log("client initialized");
        //join channel
    }, function(uid) {
        console.log("client init failed ");
        //error handling
    });

  })

}
