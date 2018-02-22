export default function main(io, socket, $, AgoraRTC) {
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
