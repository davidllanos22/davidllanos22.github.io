$(document).ready(function(){
  var id = getURLParameter("id");
  var markdown = new Markdown.Converter();
  var totalPosts = 1;

  if(id){
    readPost(id, function(text, id){
      if(text == null)
        window.open("./", "_self");
      else{
        $("#content").prepend("<div class='post'>" + markdown.makeHtml(text) + "</div>");
        document.title = $(".post-title").text();
        $(".post").append("<div id=\"disqus_thread\"></div>"+
                          "<script type=\"text/javascript\">"+
                              "var disqus_shortname = 'davidllanos22';"+
                              "(function() {"+
                                  "var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;"+
                                  "dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';"+
                                  "(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);"+
                              "})();"+
                          "</script>"+
                          "<noscript>Please enable JavaScript to view the <a href=\"https://disqus.com/?ref_noscript\" rel=\"nofollow\">comments powered by Disqus.</a></noscript>");
      } 
      
    });
  }else{
    for(var i = 1; i < totalPosts + 1; i++){
      readPost(i, function(text, id){
        if(text != null)$("#content").prepend("<div class='post'><a href='./?id="+id+"'>" + markdown.makeHtml(text) + "</a><br><a class='post-more' href='./?id=" + id + "#disqus_thread'>Read Comments (0)<div class='disqus-comment-count' data-disqus-url='./?id=" + id +"'></div></a></div>");

      }); 
    }
  }

  $(document.body).append("<script type=\"text/javascript\">"+
                              "var disqus_shortname = 'davidllanos22';"+
                              "(function () {"+
                                    "var s = document.createElement('script'); s.async = true;"+
                                    "s.type = 'text/javascript';"+
                                    "s.src = '//' + disqus_shortname + '.disqus.com/count.js';"+
                                    "(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);"+
                                "}());"+
                            "</script>");
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

