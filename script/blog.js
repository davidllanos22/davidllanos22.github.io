$(document).ready(function(){
  console.log(getURLParameter("id"));
  readPost(1, function(text){
    $("#content").append(markdown.toHTML(text))
  });
});

function readPost(id, callback){
  var req = new XMLHttpRequest();
  req.open('GET', 'posts/'+id+'.md', true); 
  req.onreadystatechange = function (e) {
    if (req.readyState == 4) {
       if(req.status == 200)
        callback(req.responseText);
       else
        console.log("Error loading page\n");
    }
  };
  req.send(null);
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

