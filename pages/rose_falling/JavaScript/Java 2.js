﻿if(!image_urls)
{
	var image_urls=Array()
}
if(!flash_urls)
{	var flash_urls=Array()
}
	//image_urls['rain1']="http://2.bp.blogspot.com/-IQXNv-_CBLE/TpWcK7LL4VI/AAAAAAAAG0I/bcxYcqc_uI0/pinkpetal1.png";
	//image_urls['rain2']="http://4.bp.blogspot.com/-teXCIicWPF4/TpWcLLg0A2I/AAAAAAAAG0U/IPPCr1gponc/pinkpetal2.png";
	//image_urls['rain3']="http://3.bp.blogspot.com/-3JG9HLECCRU/TpWcLZGSYtI/AAAAAAAAG0g/zIJINua93TE/redpetal1.png";
	//image_urls['rain4']="http://2.bp.blogspot.com/-BByhQEK5E24/TpWcLux4xRI/AAAAAAAAG0s/x2hIr1AV_Ac/redpetal2.png";
	
	image_urls['rain1']="Images/pinkpetal1.png";
	image_urls['rain2']="Images/pinkpetal2.png";
	image_urls['rain3']="Images/redpetal1.png";
	image_urls['rain4']="Images/redpetal2.png";
	$(document).ready(function()
{
	var c=$(window).width();
	var d=$(window).height();
	var e=function(a,b)
	{
		return Math.round(a+(Math.random()*(b-a)))
	};
		var f=function(a){setTimeout(function()
		{
			a.css({left:e(0,c)+'px',top:'-30px',display:'block',opacity:'0.'+e(10,100)
		})
		.animate(
		{
			top:(d-10)+'px'
		}
			,e(7500,8000),function()
			{
				$(this).fadeOut('slow',function()
				{
					f(a)})})},e(1,8000))
				};
				$('<div></div>').attr('id','rainDiv')
.css(
{
	position:'fixed',
	width:(c-20)+'px',
	height:'1px',
	left:'0px',
	top:'-5px',
	display:'block'
})
.appendTo('body');
for(var i=1;i<=20;i++)
{
	var g=$('<img/>')
	.attr('src',
	image_urls['rain'+e(1,4)])

.css(
{
	position:'absolute',
	left:e(0,c)+'px',
	top:'-30px',
	display:'block',
	opacity:'0.'
	+e(10,100),'margin-left':0
})
.addClass('rainDrop')
.appendTo('#rainDiv');
f(g);g=null};
var h=0;
var j=0;
$(window)
.resize(function()
{
	c=$(window)
	.width();
	d=$(window)
	.height()
})});