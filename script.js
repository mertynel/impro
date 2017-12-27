let UIcontroller = function(){
    let DOMstrings = {
        content: '.container-fluid',
        nvaLink_Game1: '.nav_link_game_1',
        nvaLink_Game2: '.nav_link_game_2',
        game_1: 'Game_1.html',
        game_2: 'Game_2.html',
        
    }
    
    return {
        getDomStrings: function() {return DOMstrings}       
    }
}();

let controller = function(UIctrl){
    
    let DOM = UIctrl.getDomStrings()
    
    let setupEventListeners = () => {
        document.querySelector(DOM.nvaLink_Game1).addEventListener('click', () => {
            $(DOM.content).load(DOM.game_1);
        })
        document.querySelector(DOM.nvaLink_Game2).addEventListener('click', () => {
            $(DOM.content).load(DOM.game_2);
        })
    }
    
    
    
    return {
        init: function(){
            setupEventListeners()
        }
    }
}(UIcontroller)

controller.init()