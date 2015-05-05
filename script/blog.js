$(document).ready(function(){
  var id = getURLParameter("id");
  var n = 2;
  if(id){
    readPost(id, function(text){
      if(text == null)
        window.open("./", "_self");
      else
        $("#content").append(markdown.toHTML(text))
    }); 

  }else{
    for(var i = n; i > 0; i--){
      readPost(i, function(text){
        if(text != null)$("#content").append(markdown.toHTML(text))
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
        callback(req.responseText);
      else
        callback(null);
    }
  };
  req.send(null);
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')) || null;
}

