var letter="abcdefghijklmnopqrstuvwxyz0123456789.,?!-";
var morse=[".-","-...",  "-..","-.-.",  ".",  "..-.", "--.","....",
"..",  ".---",   "-.-",   ".-..",   "--",  "-.",   "---",   ".--.", 
"--.-",".-.","...", "-", "..-","...-", ".--","-..-","-.--", "--..",
"-----",".----","..---","...--","....-", ".....", "-....", "--...", 
"---..","----.", ".-.-.-", "--..--", "..--..", "-.-.--", "-....-"];

var tomorse= true ;
var stop= false;
var text="";

var low= new Howl({
   src: ['asset/low.wav']
});
var high= new Howl({
   src: ['asset/high.wav']
});
var type=[ new Howl({
   src: ['asset/typewriter-key-1.wav']
}), new Howl({
   src: ['asset/typewriter-line-break-1.wav']
})]

var p=document.querySelector(".para p")
var display=document.querySelector(".btn-text p")
var typed=document.querySelector("input");
var btn = document.querySelector("#change");
var play=document.querySelector("#play");

//changing m2t t2m
btn.addEventListener("click", () => {
    if(tomorse)
    display.textContent="..- to ABC"
    else display.textContent="ABC to ..-"
    tomorse = !tomorse;
    p.textContent = "";
    typed.value = "";
} )

//input 
typed.addEventListener("keyup", ()=> {
 text=typed.value.toLowerCase();
 p.textContent="";
 if(tomorse)
   t2m();
 else
   m2t();
   type[Math.floor(Math.random()*2)].play();
});

//play button
play.addEventListener("click",function(){
   if(tomorse){
      morsesound(p.textContent);
   }
   else morsesound(text);
});
 
//to play sound
function morsesound(text){
for(let i=0; i<text.length; i++)
   {
     setTimeout(function(){ 
     if(text[i]==".")
     {low.play();
     }
     else if(text[i]=="-")
     high.play();},i*500);
     if(stop)
     break;
   }
};

//text to morse
function t2m(){
   for(var i=0;i<text.length; i++)
   {
    var index= letter.indexOf(text[i]);
    if(index+1)
    p.textContent+="  "+morse[index];
   }
}

//morse to text
function m2t(){
 var ans="";
 for(var i=0,j=-1;i<text.length; i++)
 { 
  
  if(text[i]==" ")
  {
   var substring=text.substring(j+1,i);
   j=i;
  }  
  else 
  var substring=text.substring(j+1,i+1);
 
  var index=morse.indexOf(substring);
   if(text[i]==" "){
       if(index+1){ 
       ans+=letter[index]+" ";
       p.textContent=ans;
       }
       else 
       {
        ans+="invalid ";
        p.textContent=ans;
       }
   } 
   else{
      if(index+1)
      p.textContent=ans+letter[index];
      else p.textContent=ans+"invalid ";
      }
 }
}


