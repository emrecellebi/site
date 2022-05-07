﻿/****************************************************
* Cross Browser Snake game- By Brady Mulhollem- http://www.webtech101.com
*This game is available at http://www.dynamicdrive.com
****************************************************/
               function cbsnake(){
               
                    //Pixels to move at once
                    this.jump = 8;
                    //Size of snake. Make this one less than jump. Doesn't have to be,but adds good effect
                    this.sos = 7;
                    //Size of board
                    //DANGER!!! this.sofb must be EVENLY dividable by this.jump DANGER!!!!
                    this.sofb = 400;
                    //Set things up
                    this.daway = this.sofb - this.jump;
                    this.correct = new Array();
                    this.correct[0] = 0;
                    while(this.correct[this.correct.length -1] != this.daway){
                         this.correct[this.correct.length] = this.correct[this.correct.length -1]+this.jump
                    }
                    this.zero = 0;
                    var gameboard = ' <div class="board" id="board"> <div id="i2"> This is a simple game of Snake. Select a speed then use your arrow keys to attempt and eat the apple(red block), but watch out for the walls and yourself. At any time you can pause the game by pressing the space bar.This game is available at <a href="http://www.webtech101.com">Web Tech 101</a> and <a href="http://www.dynamicdrive.com">Dynamic Drive</a> </div> </div><div class="board" id="score"> <span id="cscore">0</span> <span id="buttons"> <button type="button" id="slow" onClick="snake.slow()">Slow</button> <button type="button" id="medium"  onClick="snake.medium()">Medium</button> <button type="button" id="fast"  onClick="snake.fast()">Fast</button> </span></div>';
                    document.write(gameboard);
               }
               
                    cbsnake.prototype.setup = function(setspeed){
                         var thisObj = this;
                         //Score...
                         this.score = 0;
                         //Snake Direction
                         this.sdir = 'none';
                         this.sdirb = 'none'; 
                         this.sdirp = 'none';
                         //Snake arrays
                         this.ctop = new Array();
                         this.cleft = new Array();
                         //Top of snake class
                         this.ctop[0] = 200;
                         this.ctop[1] = -8;
                         //Left of Snake class
                         this.cleft[0] = 200;
                         this.cleft[1] = -8;
                         //current top of apple
                         this.atop = 0;
                         //current left of apple
                         this.aleft = 0;
                         //Milliseconds between move
                         this.speed = setspeed;
                         document.getElementById('board').innerHTML = '<div id="apple"></div><div id="snake0" class="snake"></div><div id="snake1" class="snake"></div>';
                         this.moveapple();
                         this.stopgame = false;
                         setTimeout(function(){ thisObj.msnake() },this.speed);
                         document.onkeydown = function(e){ return thisObj.snakedir(e); };
                    }
                    cbsnake.prototype.slow = function(){
                         this.setup(100);
                         this.buttons('true');
                         document.getElementById('slow').blur();
                    }
                    cbsnake.prototype.medium = function(){
                         this.setup(70);
                         this.buttons('true');
                         document.getElementById('medium').blur();
                    }
                    cbsnake.prototype.fast = function(){
                         this.setup(30);
                         this.buttons('true');
                         document.getElementById('fast').blur();
                    }
                    cbsnake.prototype.rannum = function(num1,num2){
                         num1 = parseInt(num1);
                         num2 = parseInt(num2);
                         var generator = Math.random()*(Math.abs(num2-num1));
                         generator = Math.round(num1+generator);
                         return generator;
                    }
                    cbsnake.prototype.moveapple = function(){
                         var usethis = false;
                         while(!usethis){
                              this.atop = this.correct[this.rannum(0,this.correct.length-1)];
                              this.aleft = this.correct[this.rannum(0,this.correct.length-1)];
                              if(this.numInArray(this.ctop,this.cleft,this.atop,this.aleft) == 0){
                                   usethis = true;
                              }               
                         }
                         document.getElementById('apple').style.top = this.atop+"px";
                         document.getElementById('apple').style.left = this.aleft+"px";
                    }
                    cbsnake.prototype.snakedir = function(e){  
                              if(!e){
                                   //IE...
                                   e = window.event;
                              }
                              switch(e.keyCode){
                                   case 38:
                                        if(this.sdir != 'down' && this.sdirp != 'down'){
                                             this.sdirb = 'up';
                                             this.sdirp = 'up';
                                        }
                                        break;
                                   case 40:
                                        if(this.sdir != 'up' && this.sdirp != 'up'){
                                        this.sdirb = 'down';
                                        this.sdirp = 'down';
                                        }
                                        break;
                                   case 37:
                                        if(this.sdir != 'right' && this.sdirp != 'right'){
                                        this.sdirb = 'left';
                                        this.sdirp = 'left';
                                        }
                                        break;
                                   case 39:
                                        if(this.sdir != 'left' && this.sdirp != 'left'){
                                        this.sdirb = 'right';
                                        this.sdirp = 'right';
                                        }
                                        break;
                                   case 32:
                                        if(this.sdir == 'none' && this.sdirp != 'none'){
                                             this.sdirb = this.sdirp;
                                             this.sdirp = 'none';
                                        }
                                        else{
                                        this.sdirp = this.sdir;
                                        this.sdirb = 'none';
                                        }
                                        break;
                              }
                              return this.stopgame;
                              
                    }
                    cbsnake.prototype.msnake = function(){
                         if(this.stopgame === false){
                              if(this.sdir != 'none'){
                                   this.moveall();
                              }
                              var thisObj = this;
                              switch(this.sdir){
                                        case 'up':
                                             this.ctop[0] = this.ctop[0] - this.jump;
                                             document.getElementById('snake0').style.top = this.ctop[0]+"px";
                                             if((this.ctop[0] == this.zero && this.sdirb == 'up') || this.ctop[0] < this.zero){
                                                  this.gover();
                                             }
                                             break;
                                        case 'down':
                                             this.ctop[0] = this.ctop[0] + this.jump;
                                             document.getElementById('snake0').style.top = this.ctop[0]+"px";
                                             if((this.ctop[0] == this.daway && this.sdirb == 'down') || this.ctop[0] > this.daway){
                                                  this.gover();
                                             }
                                             break;
                                        case 'left':
                                             this.cleft[0] = this.cleft[0] - this.jump;
                                             document.getElementById('snake0').style.left = this.cleft[0]+"px";
                                             if((this.cleft[0] == this.zero && this.sdirb == 'left') || this.cleft[0] < this.zero){
                                                  this.gover();
                                             }
                                             break;
                                        case 'right':
                                             this.cleft[0] = this.cleft[0] + this.jump;
                                             document.getElementById('snake0').style.left = this.cleft[0]+"px";
                                             if((this.cleft[0] == this.daway && this.sdirb == 'right') || this.cleft[0] > this.daway){
                                                  this.gover();
                                             }
                                             break;
                              }
                              if(this.sdir != 'none'){
                                   this.hitself();
                                   this.happle();
                              }
                         this.sdir = this.sdirb
                         setTimeout(function(){ thisObj.msnake() },this.speed);
                         }
                    }
                    cbsnake.prototype.gover = function(){
                         if(!this.stopgame){
                              this.stopgame = true;
                              var inner = document.getElementById('board').innerHTML;
                              document.getElementById('board').innerHTML = inner+'<div id="notice">Game Over! Your Score was '+this.score+'</div><div id="i2">This is a simple game of Snake. Select a speed then use your arrow keys to attempt and eat the apple(red block), but watch out for the walls and yourself. At any time you can pause the game by pressing the space bar.This game is available at <a href="http://www.webtech101.com">Web Tech 101</a> and <a href="http://www.dynamicdrive.com">Dynamic Drive</a></div>';
                              document.getElementById('apple').style.backgroundColor = '#D7BEBE';
                              for(i=0;i<this.cleft.length;i++){
                                   document.getElementById('snake'+i).style.backgroundColor = '#BEBEBE';
                              }
                              this.buttons('');
                         }
                    }
                    cbsnake.prototype.happle = function(){
                         if(this.atop == this.ctop[0] && this.aleft == this.cleft[0]){
                              //HIT!!!
                              this.score++;
                              document.getElementById('cscore').innerHTML = this.score;
                              this.moveapple();
                              this.addsnake();
                         }
                    }
                    cbsnake.prototype.addsnake = function(){
                    var newsnake = document.createElement('div');
                    var newid = 'snake'+this.cleft.length;
                    newsnake.setAttribute('id',newid);
                    //this crap is for IE. I would rather add the class name.
                    newsnake.style.position = 'absolute';
                    newsnake.style.top = '-10px';
                    newsnake.style.left = '-10px';
                    newsnake.style.display = 'none';
                    newsnake.style.backgroundColor = 'black';
                    newsnake.style.height = '7px';
                    newsnake.style.width = '7px';
                    newsnake.style.overflow = 'hidden';
                    document.getElementById('board').appendChild(newsnake);
                    this.cleft[this.cleft.length] = -10;
                    this.ctop[this.ctop.length] = -10;
                    }
                    cbsnake.prototype.moveall = function(){
                         var i = this.ctop.length - 1;
                         while(i != 0){
                              document.getElementById('snake'+i).style.top = document.getElementById('snake'+(i-1)).style.top;
                              document.getElementById('snake'+i).style.left = document.getElementById('snake'+(i-1)).style.left;
                              document.getElementById('snake'+i).style.display = 'block';
                              this.ctop[i] = this.ctop[i-1];
                              this.cleft[i] = this.cleft[i-1];
                              i = i - 1;
                         }
                    }
                    cbsnake.prototype.numInArray = function(array,array2,value,value2){
                         var n = 0;
                         for (var i=0; i < array.length; i++) {
                              if (array[i] === value && array2[i] === value2) {
                                   n++;
                              }
                         }
                         return n;
                    }
                    cbsnake.prototype.hitself = function(){
                         if(this.numInArray(this.ctop,this.cleft,this.ctop[0],this.cleft[0]) > 1){
                              this.gover();
                         }
                    }
                    cbsnake.prototype.buttons = function(setto){
                         document.getElementById('slow').disabled = setto;
                         document.getElementById('medium').disabled = setto;
                         document.getElementById('fast').disabled = setto;
                    }