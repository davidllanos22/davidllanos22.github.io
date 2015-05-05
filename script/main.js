$(document).ready(function(){
  addMedia("Twitter", "https://twitter.com/davidllanos22", "twitter");
  addMedia("Github", "https://github.com/davidllanos22", "github");
  addMedia("LinkedIn", "https://www.linkedin.com/in/davidllanos22", "linkedin");
  addMedia("Itch.io", "http://davidllanos22.itch.io/", "itch-io");
  addMedia("Email", "mailto:davidllanos22@gmail.com", "email");
});

function addMedia(name, url, imageName){
  $('#media ul').append("<li><a title=\"" + name + "\" target=\"_blank\" href=\"" + url + "\">"+
                              "<img src=\"../media/img/" + imageName + ".png\"></a> </li>");
}

/*--Google Analytics-*/

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-51688702-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();