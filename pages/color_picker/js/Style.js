//changeRed(255)
//changeGreen(0)
//changeBlue(0)

changeRGB("r");
function changeRGB(x) {
  var col, r, g, b;
  r = document.getElementById("slideRed").value;
  g = document.getElementById("slideGreen").value;
  b = document.getElementById("slideBlue").value;
/*
  if (x == "r") {value = r;col = w3color("rgb(" + value + ", " + g + ", " + b + ")");}
  if (x == "g") {col = w3color("rgb(" + r + ", " + g + ", " + b + ")");}
  if (x == "b") {col = w3color("rgb(" + value + ", " + g + ", " + b + ")");}
    if (col.isDark()) {
      document.getElementById('valRed2').style.color = "#ffffff";
      document.getElementById('valRed2').style.opacity = "0.6";
    } else {
      document.getElementById('valRed2').style.color = "#1f2d3d";
      document.getElementById('valRed2').style.opacity = "0.4";
    }*/
  col = w3color("rgb(" + r + "," + g + "," + b + ")");
    document.getElementById('valRed2').innerHTML = r;
    document.getElementById('valGreen2').innerHTML = g;
    document.getElementById('valBlue2').innerHTML = b;
    document.getElementById('rgbresult').style.backgroundColor = col.toRgbString();
    document.getElementById('rgbresulttext').innerHTML = col.toRgbString();
  if (col.isDark(150)) {
    document.getElementById('rgbresulttext').style.color = "#ffffff";
  } else {
    document.getElementById('rgbresulttext').style.color = "#1f2d3d";
  }


//    document.getElementById('valRed').innerHTML = value;
//    changeAll();
}
function changeGreen(value) {
    document.getElementById('valGreen').innerHTML = value;
    changeAll();
}
function changeBlue(value) {
    document.getElementById('valBlue').innerHTML = value;
    changeAll();
}
function changeAll() {
    var r = document.getElementById('valRed').innerHTML;
    var g = document.getElementById('valGreen').innerHTML;
    var b = document.getElementById('valBlue').innerHTML;
    document.getElementById('change').style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById('changetxt').innerHTML = "rgb(" + r + ", " + g + ", " + b + ")";
}