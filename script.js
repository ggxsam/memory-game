const imgArray = [
  {id:1, image:"/assets/images/belgium.png"},
  {id:2, image:"/assets/images/norway.png"},
  {id:3, image:"/assets/images/germany.png"},
  {id:4, image:"/assets/images/poland.png"},
  {id:5, image:"/assets/images/sweden.png"},
  {id:6, image:"/assets/images/china.png"},
  {id:7, image:"/assets/images/indonesia.png"},
  {id:8, image:"/assets/images/ukraine.png"},
];

const pairedArray = [...imgArray, ...imgArray];
var shuffledArray = pairedArray.sort(() => Math.random() - 0.5);


let openedCards = [];

for(var i=0; i<shuffledArray.length; i++){
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = `<img src="${shuffledArray[i].image}" alt="flag">`;
  box.dataset.id = shuffledArray[i].id;

  box.onclick = function(){
    if(openedCards.length >= 2 || this.classList.contains('boxOpen') || this.classList.contains('boxMatch')) {
      return;
    }
    
    this.classList.add("boxOpen");
    openedCards.push(this);
    
    if(openedCards.length === 2){
      setTimeout(checkMatch, 300);
    }
  }
  document.querySelector(".game").appendChild(box);
}

function checkMatch() {
  const [card1, card2] = openedCards;
  
  if(card1.dataset.id === card2.dataset.id){
    card1.classList.add('boxMatch');
    card2.classList.add('boxMatch');

    if(document.querySelectorAll('.boxMatch').length === shuffledArray.length){
     
        const banner= document.createElement('div');
        banner.className= 'victory-banner';
        banner.innerHTML=`
        <div class="banner-content">
        <h2>Congratulations!</h2>
        <button onclick="window.location.reload()">Play Again</button>
        </div>
        `;
        document.body.appendChild(banner);
    
       
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('boxOpen');
      card2.classList.remove('boxOpen');
    }, 300);
  }
  
  openedCards = [];
}