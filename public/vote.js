$( ".button-container button" ).on( "click", function( event ) {
    event.preventDefault();
    var bId = $( this ).attr("id");
    var self = this;
    $(self).prop('disabled', true);
    self.innerHTML = "<div class='loader'>Voting...</div>";
    var id = parseInt(bId.substr(5));
    if (id < 18)
      $.post( "/vote", {id}, function( data ) {
        $(self).prop('disabled', false);
        self.innerHTML = "";
      });

});
var w = window.innerWidth;
for (let i=1; i < 19; i++) {
  let style = document.getElementById("grid-" + i).style;
  style = Object.assign(style, {
    backgroundImage: "url('/images/"+ i +".png')",
    height: w/6 + 'px',
    backgroundSize: 'cover',
    margin: '2px'
  });
 // style.backgroundImage = "url('/images/"+ i +".png')";
 // document.getElementById("grid-" + i).style.height = w/6 + 'px';
}
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  $("#fullscreen").hide()
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
