$(document).ready(function(){
  var id = getURLParameter("id");
  var markdown = new Markdown.Converter();
  var n = 2;
  if(id){
    readPost(id, function(text, id){
      if(text == null)
        window.open("./", "_self");
      else
        $("#content").prepend("<div class='post'>" + markdown.makeHtml(text) + "</div>")
    }); 

  }else{
    for(var i = 1; i < n + 1; i++){
      readPost(i, function(text, id){
        if(text != null)$("#content").prepend("<div class='post'><a href='./?id="+id+"'>" + markdown.makeHtml(text) + "</a></div>")
      }); 
    }
  }
});

function readPost(id, callback){
  var req = new XMLHttpRequest();
  req.open('GET', 'posts/'+id+'.md', true); 
  req.onreadystatechange = function (e) {
    if (req.readyState == 4) {
      if(req.status == 200)
        callback(req.responseText, id);
      else
        callback(null, 0);
    }
  };
  req.send(null);
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')) || null;
}

