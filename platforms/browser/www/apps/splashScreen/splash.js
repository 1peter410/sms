var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', function (evt) {
			  //do nothing on Back Presss
        }, false);


    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    }

};

$(function() {
$(window).on('resize', function resize()  {
    $(window).off('resize', resize);
    setTimeout(function () {
        var content = $('#content');
        var top = (window.innerHeight - content.height()) / 2;
        content.css('top', Math.max(0, top) + 'px');
        $(window).on('resize', resize);
    }, 50);
}).resize();
});

function loginCheck(){
  document.body.style.opacity='1';

  if(localStorage.getItem("login")!=null){

    setTimeout(function(){
      window.location.href='../menuScreen/menu.html'
    }, 9000);

  }else{
    setTimeout(function(){
      window.location.href='../loginScreen/login.html'
    }, 9000);
  }

}
