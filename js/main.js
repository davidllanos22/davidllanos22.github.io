$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "data/posts.xml",
		datatype: "xml",
		success: function(xml){
				console.log(xml);
				var output = "";
				$(xml).find("post").each(function(){
					var title = $(this).find("title").text();
					var content = $(this).find("content").text();

					output +='<div class="post">';
					output +='<h2 class="post-title"><a href="#">'+title+'</a></h2>';
					output +='<p class="post-content">'+content+'</p>';
					output += '</div>';
				});

				$("#content").append(output);
		},
		error: function(){
			console.log("error");
		}
	});
});
