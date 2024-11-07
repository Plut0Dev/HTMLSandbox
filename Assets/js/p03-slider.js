
const ACTIVECLASS = "active"
const CARDS = document.querySelectorAll(".card");
function removeClass(){
    const elms = document.querySelectorAll(".card.active");
    elms.forEach(elm => {
    elm.classList.remove(ACTIVECLASS);
    })

}
function addClass($event){
    removeClass()
    $event.target.classList.add(ACTIVECLASS);

}

CARDS.forEach(image => {
    image.addEventListener("click", addClass);
})