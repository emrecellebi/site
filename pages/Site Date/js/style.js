function setcountup(theyear,themonth,theday)
{
	yr = theyear;
	mo = themonth;
	da = theday;
}
	
setcountup(2022, 07, 24);
	
var displaymessage = "(we are growing every second)";
var countupwidth = '95%';
var countupheight = '20px';
var countupbgcolor = 'alt1';
var opentags = '<span class="smallfont">';
var closetags = '</span>';

var montharray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var crosscount = '';

function start_countup()
{
	if(document.layers)
		document.countupnsmain.visibility = "show";
	else if(document.all || document.getElementById)
		crosscount = document.getElementById && !document.all ? document.getElementById("countupie") : countupie;
	countup();
}

if(document.all || document.getElementById)
	document.write('<span id="countupie" style="width:' + countupwidth + '; background-color:' + countupbgcolor + '"></span>')
window.onload = start_countup;

function countup()
{
	var today = new Date();
	var todayy = today.getYear();
	if(todayy < 1000)
	todayy += 1900;
	var todaym = today.getMonth();
	var todayd = today.getDate();
	var todayh = today.getHours();
	var todaymin = today.getMinutes();
	var todaysec = today.getSeconds();
	var todaystring = montharray[todaym] + " " + todayd + ", " + todayy + " " + todayh + ":" + todaymin + ":" + todaysec;
	paststring = montharray[mo-1] + " " + da + ", " + yr;
	dd = Date.parse(todaystring) - Date.parse(paststring);
	dday = Math.floor(dd / (60 * 60 * 1000 * 24) * 1);
	dhour = Math.floor((dd % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
	dmin = Math.floor(((dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
	dsec = Math.floor((((dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000))/ 1000 * 1);
	if(document.layers)
	{
		document.countupnsmain.document.countupnssub.document.write(opentags + dday+ " Day, " + dhour + " Hour, " + dmin + " Minutes, " + dsec + " Seconds " + displaymessage + closetags);
		document.countupnsmain.document.countupnssub.document.close();
	}
	else if(document.all || document.getElementById)
		crosscount.innerHTML = opentags + dday + " Day, "+dhour+" Hour, "+dmin+" Minutes "+ dsec + " Seconds " + displaymessage + closetags;
	setTimeout("countup()", 1000);
}