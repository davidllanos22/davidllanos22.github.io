
/*--Hover Effect-*/


$('.project').hover(function(){
	$(this).css( 'cursor', 'pointer' );
	$(this).find('.project-img').stop(true, true).fadeTo(300, 0.5);
}, function(){
	$(this).css( 'cursor', 'default' );
	$(this).find('.project-img').stop(true, true).fadeTo(200, 1);
});

/*--On click events-*/

$('.project-id-1').click(function(){
	window.open("http://ludumdare.com/compo/minild-34/?action=preview&uid=10692", '_blank');
});
$('.project-id-2').click(function(){
	window.open("http://ludumdare.com/compo/ludum-dare-24/?action=preview&uid=10692", '_blank');
});
$('.project-id-3').click(function(){
	window.open("http://ludumdare.com/compo/ludum-dare-28/?action=preview&uid=10692", '_blank');
});
$('.project-id-4').click(function(){
	window.open("http://ludumdare.com/compo/ludum-dare-29/?action=preview&uid=10692", '_blank');
});
$('.project-id-5').click(function(){
	window.open("http://globalgamejam.org/2014/games/dragon-vs-princess", '_blank');
});


/*--Google Analytics-*/

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-51688702-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();