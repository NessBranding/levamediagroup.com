// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-50
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          };
        });
      }
    }
  });


//Instagram Plugin
$(document).ready(function() {
   

    var userFeed = new Instafeed({
        get: 'user',
        userId: '6864543261',
        limit: 1,
        resolution: 'standard_resolution',
        /*success: function(response){
            response.data.forEach(function(e){
              // Now insert the 'square' size into each image's data:
              e.images.square = {
                url: e.images.thumbnail.url.replace(/vp.*\/.{32}\/.{8}\//, '').replace('150x150', '600x600'),
                width: 600,
                height: 600,
              };
            });
          },*/
        accessToken: '6864543261.1677ed0.047f5bd50b3c4c96b7fed8fc491a9537',
        sortBy: 'most-recent',
            filter: function(image) {
              var MAX_LENGTH = 70;
               

              // here we create a property called "short_caption"
              // on the image object, using the original caption
              if (image.caption && image.caption.text) {
                image.short_caption = image.caption.text.slice(0, MAX_LENGTH)+"...";
              } else {
                image.short_caption = "";
              }

              // ensure the filter doesn't reject any images
              return true;
            },
        template: 
       '<a href="{{link}}" target="_blank"><div class="insta-widget"><img class="d-block img-fluid mx-auto ig-hover" src="{{image}}" alt="{{user.full_name}}"/><div class="likes"><div class="likes-box"><div class="row text-left px-2 py-2"><div class="col-12"><p><img class="profile" src="{{model.user.profile_picture}}"/><span class="fas fa-heart"></span>{{likes}}<span class="fas fa-comment"></span>{{comments}}</p></div><div class="col-12"><p class="caption">{{model.short_caption}}</p></div></div></div></div></div></a>',
    });


    userFeed.run();

});

 
$(document).ready(function() {

// Gets the video src from the data-src on each button

var $videoSrc;  
$('.video-btn').click(function() {
    $videoSrc = $(this).data( "src" );
});


  
  
// when the modal is opened autoplay it  
$('#myModal').on('shown.bs.modal', function (e) {
    
// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
$("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
})
  
  
// stop playing the youtube video when I close the modal
$('#myModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src',$videoSrc); 
}) 

// document ready  
});

var heroEl = document.getElementById('home');

var windowWidth = 0;
var heroHieght = 0;

var extraHeight = 0;

var scrollPosition = 0;

var scrolling = document.getElementById('scrolling');
var ratio = 1; // w/h of image
var lag = 4; // scroll speed. min val 3;

function windowSize(){
	windowWidth = window.innerWidth;
	heroHieght = heroEl.offsetHeight;
	
	extraHeight = (windowWidth/ratio) - heroHieght;
};

function scroll(){
	scrollPosition = window.pageYOffset;
	
	if (scrollPosition <= heroHieght - extraHeight) {
		scrolling.style.top = -scrollPosition/lag + "px";
	}
};

window.onload = windowSize;
window.onresize = windowSize;
window.onscroll = scroll;