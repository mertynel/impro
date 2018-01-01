let UIcontroller = function(){
    let DOMstrings = {
        content: '.container-fluid',
        nvaLink_Game1: '.nav_link_game_1',
        nvaLink_Game2: '.nav_link_game_2',
        game_1: 'Game_1.html',
        game_2: 'Game_2.html',
        btnStop: '.btn-stop',
        btnStart: '.btn-start',
        btnUp: '.btn-up',
        btnMiddle: '.btn-middle',
        btnDown: '.btn-down',
        hand: '.icon',        
    }
    
    return {
        getDomStrings: function() {return DOMstrings}       
    }
}();

let controller = function(UIctrl){
    
    let DOM = UIctrl.getDomStrings()
    let handPositions = new Map();
    let position = 0;
    let gameRunning = false
    let gameThread, timerThread;
    
    handPositions.set(0, function(){
        // viskas GERAI
        document.querySelector(DOM.hand).classList.toggle('faa-bounce')
        document.querySelector(DOM.hand).classList.toggle('fa-thumbs-o-up')
        
    })
    handPositions.set(1, function(){
        // viskas SO SO
        document.querySelector(DOM.hand).classList.toggle('fa-hand-rock-o')
        document.querySelector(DOM.hand).classList.toggle('faa-horizontal')
    })
    handPositions.set(2, function(){
        // viskas BLOGAI
        document.querySelector(DOM.hand).classList.toggle('fa-thumbs-o-down')
        document.querySelector(DOM.hand).classList.toggle('faa-bounce')
    })
    
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
        document.querySelector(DOM.btnStart).addEventListener('click', startGame)
        document.querySelector(DOM.btnStop).addEventListener('click', stopGame)
    }
    
    let setupGame2 = function()
    {

    }
    
    let stopGame = function(){
        if(gameRunning)
            {
                handPositions.get(position)()
                gameRunning = false
                clearInterval(gameThread)
            }
    }
    
    let startGame = function(){
        handPositions.get(0)()
        gameRunning = true
        gameThread = setInterval(randomHandPosision, 3000);
        startTimer()
    }
    
    let startTimer = function()
    {
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime() {
          ++totalSeconds;
          secondsLabel.innerHTML = pad(totalSeconds % 60);
          minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
          var valString = val + "";
          if (valString.length < 2) {
            return "0" + valString;
          } else {
            return valString;
          }
        }
    }
    
    let randomHandPosision = function()
    {
        const n = Math.round(Math.random() * 2)
        console.log('posision: ', n)
        changeHandPosition(n)
    }
    
    let changeHandPosition = function(newPosition){
        if(!(newPosition === position))
        {
            handPositions.get(position)()
            handPositions.get(newPosition)()
            position = newPosition
        }
    }
    
    return {
        init: function(){
            setupEventListeners()
        },
        hand: changeHandPosition,
    }
}(UIcontroller)

controller.init()