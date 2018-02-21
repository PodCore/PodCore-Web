export default function main(io, socket, $) {
  $(document).ready(()=>{
    socket.emit("get_rooms");
    socket.on("get_rooms", (rooms) => {
      rooms.forEach((room) => {
        let newRoom = $('.roomProtoType').clone()
        newRoom.removeClass('roomProtoType');
        newRoom.appendTo('.roomsContainer');
        newRoom.addClass('room');
        newRoom.find('.roomName').text(room.name);
        newRoom.find('.roomOwner').text(room.owner);
        newRoom.find('.roomThumbUrl').attr('src', "http://blogdailyherald.com/wp-content/uploads/2014/10/wallpaper-for-facebook-profile-photo.jpg");
        newRoom.find('.roomLikeCount').text(room.likes + " Likes");
        newRoom.find('.roomViewCount').text(room.viewCount + " Views");
      })
    })
  })
}
