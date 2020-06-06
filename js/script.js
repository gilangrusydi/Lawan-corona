$ = el =>{
    let multiple = document.querySelectorAll(el);
    return multiple && multiple.length > 1 ? multiple : document.querySelector(el);
}

// Init the game
window.onload = ()=>{
    init()
}

function init(){
    game = new Game;
    game.run();
}