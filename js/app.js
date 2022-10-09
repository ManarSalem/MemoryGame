/*
 * Create a list that holds all of your cards
 */
let icons=["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o",
"fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf"
,"fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];



let counter=0;
let moves=document.querySelector('.moves');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let  currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let firstclick=true;
let cardBox=null;

addCards(icons);
//function addCards() will add the cards onto html file
function addCards(listOfIcons)
{
    shuffle(listOfIcons);
    cardBox =document.querySelector('.deck');
    for(let i=0;i<listOfIcons.length;i++)
    {
        let card=document.createElement('li');
        card.classList.add('card');
        card.innerHTML=`<li class="${listOfIcons[i]}"></i>`;
        cardBox.appendChild(card);
        whenClick(card);
    }
}



let intervalld=0;
let fllipedCrads=[];
   let matchedCards=[];
//function whenClick(card) works to add the event for each card and compare 2 cards if they are match or not
function whenClick(card)
{
   
    card.addEventListener('click',function()
    {
       if(firstclick)
       {
        intervalld= setInterval(setTime, 1000);
         firstclick=false;
       }
        
        //we need to keep track for two of cards 
        let current=this;
        let prev=null;
        if(fllipedCrads.length===1)
        {
            
            movmentCounter();
            prev=fllipedCrads[0];
            card.classList.add('open');
            fllipedCrads.push(current);//now it hold 2 cards
            if(current.innerHTML===prev.innerHTML)
            {//if the cards are the same
               current.classList.add('match');
               prev.classList.add('match');
               fllipedCrads=[];//most make it empty for next move
               matchedCards.push(current,prev);
               GameOver(matchedCards.length);
            }else//if not match
            {
                setTimeout(function()
                     {
                         //we need to delay to make the user watch what behind the cerd and save it
                     current.classList.remove('open');
                     prev.classList.remove('open');
                     },300);
                    
                     fllipedCrads=[];
            }
        }else 
        { 
            card.classList.add('open');
            fllipedCrads.push(current);

        }

    });
    
}


let popup= document.querySelector('.popup-window');
let congCard=document.querySelector('.content');
//function gameOver() 
function GameOver(lengthOfMatchCards)
{
    if (lengthOfMatchCards===16)
    {
          setTimeout(function()
          {
           
           clearInterval(intervalld);
          
          },100);
         popUp();
       
    }
    
    
}


restart();
//function restart ()
function restart()
{
    let restartIcon=document.querySelector('.restart');
    restartIcon.addEventListener('click',function()
    {
      cardBox.innerHTML="";
      addCards(icons);
      matchedCards=[];
      fllipedCrads=[];
      counter=0;
      moves.innerHTML=0;
      starRating(counter);
      
      totalSeconds=0;
      firstclick=true;
      clearInterval(intervalld);
      minutes.innerHTML="00";
      seconds.innerHTML="00";
     // intervalld= setInterval(setTime, 1000);

    });
}


//function movmentCounter() count each move in the game
moves.innerHTML=0;
function movmentCounter()
{
    
    moves.innerHTML=++counter;
    starRating(counter);
}



    const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
//function starRating() 
function starRating(moveCounter)
{


     if( moveCounter <= 15) {
     starsContainer.innerHTML = star + star + star;

     }else if( moveCounter >15&& counter <=30) {

         starsContainer.innerHTML = star + star;

     } else if(moveCounter>30){

         starsContainer.innerHTML = star;
        }

     
}

let totalSeconds =0;
let minutes=document.getElementById("minutes");
let seconds=document.getElementById("seconds");



function setTime() {
  ++totalSeconds;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}




let container = document.querySelector(".content");
      let sentence= document.createElement('div');
      let sentence2=document.createElement('div');
let starNumbers=0;
function popUp()
{
    
    
    if( counter <= 15) {
        starNumbers=3;
   
        }else if( counter > 15&& counter <=30) {
   
            starNumbers=2;
   
        } else if(counter>30){
   
            starNumbers=1;
        }
        popup.style.display='flex';
       congCard.style.display='block';
      
      sentence.innerHTML=`you take  ${pad(parseInt(totalSeconds / 60))}:${pad(totalSeconds % 60)}
                          with starRating: ${starNumbers} `; 
      container.appendChild(sentence);
       sentence2.innerHTML="Want to play again?";

      container.appendChild(sentence2);
      let reloadIcon='fa fa-repeat';
      let reloadThepageIcon=document.createElement('li');
      reloadThepageIcon.innerHTML=`<i class="${reloadIcon}"></i>`;
      container.appendChild(reloadThepageIcon);
    

     
     reloadThepageIcon.addEventListener('click',function()
     {
        window.location.reload(true); 

     });

     let closedPopUp=document.querySelector('.closed-popup');
     closedPopUp.addEventListener('click',function()
     {
         popup.style.display='none';
         congCard.style.display="none";

     });


    }
    




