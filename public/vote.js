$( ".button-container button" ).on( "click", function( event ) {
    event.preventDefault();
    var bId = $( this ).attr("id");
    var self = this;
    $(self).prop('disabled', true);
    var id = parseInt(bId.substr(5));
    if (id < 18)
      $.post( "/vote", {id}, function( data ) {
        $(self).prop('disabled', false);
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
document.getElementById("table").webkitRequestFullscreen();
