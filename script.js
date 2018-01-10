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
        btnStop_g2: '.btn-game2-stop',
        btnStart_g2: '.btn-game2-start',
    }
    
    return {
        getDomStrings: function() {return DOMstrings}       
    }
}();

let controller = function(UIctrl){
    
    let DOM = UIctrl.getDomStrings()
    let handPositions = new Map();
    let position = 0, counter = 0, last_n = 0;
    let gameRunning = false
    let gameThread, timerThread;
    let WordsArray_g2 = ['hjjhb'];
    
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
        document.querySelector(DOM.btnStart_g2).addEventListener('click', startGame2)
        document.querySelector(DOM.btnStop_g2).addEventListener('click', stopGame2)
    }
    
    let stopGame = function(){
        if(gameRunning)
            {
                handPositions.get(position)()
                gameRunning = false
                clearInterval(gameThread)
                clearInterval(timerThread)
                document.getElementById("minutes").innerHTML = '00';
                document.getElementById("seconds").innerHTML = '00';
                position = 0
            }
    }
    
    let startGame = function(){
        handPositions.get(0)()
        gameRunning = true
        gameThread = setInterval(randomHandPosision, 3000);
        timerThread = startTimer()
    }
    
    let startGame2 = function(){
        const filePath = 'words.txt'
        
        jQuery.get(filePath, function(fileData) {
            WordsArray_g2 = fileData.split(/\r?\n/)
            
        });
    
    }
    
    let stopGame2 = function(){
        console.log(WordsArray_g2)   
    }
    
    let setNextWord = function(){
        
    }
    
    let setFirstWord = function(){
        
    }
    
    
    let readWordsFromTextFile= function(filePath){
        let data = []
        

        
        return data
    }
    
    let startTimer = function()
    {
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        let timer = setInterval(setTime, 1000);

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
        
        return timer
    }
    
    let randomHandPosision = function()
    {
        const _n = Math.round(Math.random() * 2)
        
        //console.log('posision: ', _n, 'last_n: ', last_n)
        if(last_n === _n)
        {
            counter++
            //console.log('counter++: ', counter)
        }
        else
        {
            last_n = _n
            //console.log('last_n: ', last_n) // gal gerai, bet jei kas cia nenusiresetina, reikia count = 0
        }
        
        if(counter >= 2 && (last_n !== position))
        {
            changeHandPosition(_n)
        }
        
    }
    
    let changeHandPosition = function(newPosition){
        if(!(newPosition === position))
        {
            handPositions.get(position)()
            handPositions.get(newPosition)()
            position = newPosition
            counter = 0;
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