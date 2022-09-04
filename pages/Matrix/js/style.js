const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;

let charArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "А", "В", "Г", "Д", "Є", "Ѕ", "З", "И", "Ѳ", "І", "К", "Л", "М", "Н", "Ѯ", "Ѻ", "П", "Ч", "Р", "С", "Т", "Ѵ", "Ф", "Х", "Ѱ", "Ѿ", "Ц"];
let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 13;
let maxColumns = cw / fontSize;
canvas.width = cw;
canvas.height = ch;

let frames = 0;

class FallingChar
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	
	draw(ctx)
	{
		this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
		this.speed = Math.random() * fontSize * 3 / 4 + fontSize * 3 / 4;
		
		ctx.fillStyle = "rgba(0, 255, 0)";
		ctx.font = fontSize + "px san-serif";
		ctx.fillText(this.value, this.x, this.y);
		this.y += this.speed;
		
		if(this.y > ch)
		{
			this.y = (Math.random() * ch) / 2 - 50;
			this.x = Math.floor(Math.random() * maxColumns) * fontSize;
			this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
		}
	}
}

function update()
{
	if(fallingCharArr.length < maxCharCount)
	{
		let fallingChar = new FallingChar(Math.floor(Math.random() * maxColumns) * fontSize, (Math.random() * ch) / 2 - 50);
		fallingCharArr.push(fallingChar);
	}
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, cw, ch);
	for(let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++)
	{
		fallingCharArr[i].draw(ctx);
	}
	
	requestAnimationFrame(update);
	frames++;
}

update();





























/* 
	"*"							/// Tüm elemetler seçilir.
	"p:first"					/// P elementini ilkini seçer
	"p:last"					/// P elementini son seçer

	$()							/// Element seçimi yapılır.
	.click()					/// Click olaylarında çalışır
	.ready()					/// Sayafa tamamen yüklendiğinde çalışır
	.focusin()					/// Odaklanma olayı
	.blur()						/// Bulanıklaştırma olayı
	
	.length						/// Uzunlukğu döner.
	
	
	.hide()						/// Ögeleri gizler.
	.fadeIn()					/// Ögeleri opak halde görüntüle
	.find()						/// Ögeleri bulur.
	.val()						/// Ögelerin geçerli değerini alır.
	.text()						/// Ögelerin metin içeriğini alır veya değiştirir.
	.attr()						/// Ögelerin attributes değerlerini değiştirir.
	.css()						/// Ögelere css özelliği giydirir. 
	
*/

// https://www.youtube.com/watch?v=Op1gV4xZjfM&list=PL1-boLQD9cuIJxsAj0QsAAA0nEpVt8I4_&index=12&ab_channel=OğuzhanMemiş