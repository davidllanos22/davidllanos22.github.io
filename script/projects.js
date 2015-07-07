$(document).ready(function(){
  addProject(1, "Save the tiny world!", "A game made for Ludum Dare 23. (2012)", "http://ludumdare.com/compo/ludum-dare-23/?action=preview&uid=10692");
  addProject(2, "Zombie Dungeon", "A game made for mini Ludum Dare 34. (2012)", "http://ludumdare.com/compo/minild-34/?action=preview&uid=10692");
  addProject(3, "I want this face!", "A game made for mini Ludum Dare 35. (2012)", "http://ludumdare.com/compo/minild-35/?action=preview&uid=10692");
  addProject(4, "Island", "A game made for Ludum Dare 24. (Warmup) (2012)", "http://ludumdare.com/compo/ludum-dare-24-warmup/?action=preview&uid=10692");
  addProject(5, "Caveman Evolution", "A game made for Ludum Dare 24. (2012)", "http://ludumdare.com/compo/ludum-dare-24/?action=preview&uid=10692");
  addProject(6, "Who is the villain?", "A game made for Ludum Dare 25. (2012)", "http://ludumdare.com/compo/ludum-dare-25/?action=preview&uid=10692");
  addProject(7, "Balloon", "A game made for Ludum Dare 28. (2013)", "http://ludumdare.com/compo/ludum-dare-28/?action=preview&uid=10692");
  addProject(8, "Cave Beneath the Surface", "A game made for Ludum Dare 29. (2014)", "http://ludumdare.com/compo/ludum-dare-29/?action=preview&uid=10692");
  addProject(9, "Dragon vs Princess", "A game made for Global Game Jam 2014.", "http://globalgamejam.org/2014/games/dragon-vs-princess");
  addProject(10, "Piano Racer", "A game made for Ludum Dare 31. (2014)", "http://ludumdare.com/compo/ludum-dare-31/?action=preview&uid=33989");
  addProject(11, "A Sheepdog's Arcade", "A game made for Global Game Jam 2015.", "http://globalgamejam.org/2015/games/sheepdogs-arcade");
  addProject(12, "Match 2", "A game made to test my engine. (2015)", "http://davidllanos22.itch.io/match-2");
  addProject(13, "Tower of the Screaming Bullets", "A game made for Ludum Dare 32. (2015)", "http://ludumdare.com/compo/ludum-dare-32/?action=preview&uid=52427");

  /*--Hover Effect-*/

  $('.project').hover(function(){
    $(this).css( 'cursor', 'pointer' );
    $(this).find('.project-img').stop(true, true).fadeTo(300, 0.5);
  }, function(){
    $(this).css( 'cursor', 'default' );
    $(this).find('.project-img').stop(true, true).fadeTo(200, 1);
  });

});

function addProject(id, name, description, url){
  $('#projects-list').prepend("<div class=\"project project-id-"+ id + "\">"+
                      "<div class=\"project-img-container\">"+
                      "<div class=\"project-img\" style=\"background: url('media/img/projects/"+ id + ".png');\"></div>"+
                      "</div>"+
                      "<p class=\"project-title\">" + name + "</p>"+
                      "<p class=\"project-description\">" + description + "</p>"+
                      "</div>");
  $('.project-id-' + id).click(function(){
    window.open(url, '_blank');
  });
}