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
					var date = $(this).find("date").text();
					
					output +='<div class="post">';
					output +='<h2 class="post-title"><a href="#">'+title+'</a></h2>';
					output +='<p class="post-date">'+date+'</p>';
					output +='<p class="post-content">'+content+'</p>';
					output +='<ul class="post-tags">';
					
					var tags = $(this).find("tags");

					$(tags).find("tag").each(function(){
						var color = "gray";
						if($(this).text()=="gamedev"){
							color = "purple" 
						}else if($(this).text()=="webdev"){
							color = "blue" 
						}else if($(this).text()=="pixelart"){
							color = "red" 
						}else if($(this).text()=="tutorial"){
							color = "green" 
						}
						output +='<li class="'+color+'">'+$(this).text()+'</li>';
					});
					
					output += '</ul></div>';
				});

				$("#content").append(output);
		},
		error: function(){
			console.log("error");
		}
	});
});
