let UIcontroller = function(){
    let DOMstrings = {
        content: '.container-fluid',
        nvaLink_Game1: '.nav_link_game_1',
        nvaLink_Game2: '.nav_link_game_2',
        game_1: 'Game_1.html',
        game_2: 'Game_2.html',
        btnStop: '.btn-stop',
        btnStart: '.btn-start'
    }
    
    return {
        getDomStrings: function() {return DOMstrings}       
    }
}();

let controller = function(UIctrl){
    
    let DOM = UIctrl.getDomStrings()
    
    let setupEventListeners = () => {
            document.querySelector(DOM.nvaLink_Game1).addEventListener('click', () => {
                $(DOM.content).load(
                    DOM.game_1,
                    function(){ 
                        setupGame1()  
                    })
            })
            document.querySelector(DOM.nvaLink_Game2).addEventListener('click', () => {
                $(DOM.content).load(
                    DOM.game_2,
                    function(){
                        setupGame2()
                    })
            })
    }
    
	let setupGame1 = function()
    {
        document.querySelector(DOM.btnStart).addEventListener('click', () => {
            console.log('game start')
        })
        document.querySelector(DOM.btnStop).addEventListener('click', () => {
            console.log('game stop')
        })
    }
    
    let setupGame2 = function()
    {

    }
    
    return {
        init: function(){
            setupEventListeners()
        }
    }
}(UIcontroller)

controller.init()