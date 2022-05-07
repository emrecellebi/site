function pozisyon(ev) 
{ 
	var text = ""; 
	
	text += "Pencere Koordinatları (pageX, pageY): " + ev.pageX + ", " + ev.pageY + ".<br />";
	text += "Ekrana Göre Koordinatlar (screenX, screenY): " + ev.screenX + ", " + ev.screenY + ".<br />"; 
	text += "Klavye ve Fare KoRdnatları (which): " + ev.which+ ".<br />"; 
	text += "Olay Tipi (type): " + ev.type + ".<br />"; 
	
	document.getElementById("cevap").style.width = 450;
	document.getElementById("cevap").style.left = ev.pageX; 
	document.getElementById("cevap").style.top = ev.pageY; 
	document.getElementById("cevap").innerHTML = text; 
} 
document.onmouseup = pozisyon;