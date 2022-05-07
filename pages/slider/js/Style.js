$(document).ready(function(){
	$(".paging_btrix").show();
	$(".paging_btrix a:first").addClass("active");
	
	var imageWidth = $(".window").width();
	var imageSum = $(".image_reel img").size();
	var imageReelWidth = imageWidth * imageSum;
	
	$(".image_reel").css({
		'width':imageReelWidth
	});
	
	rotate = function(){
		var triggerID = $active.attr("rel")-1;
		var image_reelPosition = triggerID * imageWidth;
		$(".paging_btrix a").removeClass('active');
		$active.addClass('active');
		$(".image_reel").animate({
			left:-image_reelPosition
		},500)
	};
	
	rotateSwitch = function(){
		play = setInterval(function(){
			$active=$('.paging_btrix a.active').next();
			if($active.length===0)
			{
				$active=$('.paging_btrix a:first')
			}
			rotate()
		},5000)
	};
	
	rotateSwitch();
	
	$(".image_reel a").hover(function(){
		clearInterval(play)
	},function(){
		rotateSwitch()
	});
	
	$(".paging_btrix a").click(function(){
		$active = $(this);
		clearInterval(play);
		rotate();
		rotateSwitch();
		return false
	})
});