export default function room(io, socket, $, AgoraRTC) {

<<<<<<< HEAD
<<<<<<< HEAD

=======
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
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======

>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9

  // stream.init(()=>{
  //   console.log("stream initalized");
  //   stream.play('video')
  // })

  // client.subscribe(stream, function(err) {
  //   console.log("Test");
  // })


  $(document).ready(() => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
    //Get Agora Client Connected and Get their Devices
    let client = AgoraRTC.createClient({mode: 'interop'});

    let streamId = $('.roomId').text();
    let streamName = $('.roomName').text();

    let appId = "6a05c965b5644b508eae5db13c82fdba";

    console.log(streamId);

    client.init(appId, function() {
        console.log("client initialized");
        client.join(streamId, streamName , null, function(uid) {
          console.log("User " + uid + " join channel successfully");
          // let stream = AgoraRTC.createStream({streamID: uid, audio:true, video:true, screen:false})
          // stream.init(() => {
          //   console.log("Test");
          //   stream.play('video');
          // });
        }, function(err){
          console.log("join failed");
        })
        //join channel
    }, function(err) {
        console.log("client init failed ", err);
        //error handling
    });
<<<<<<< HEAD
=======
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9

  })

}
