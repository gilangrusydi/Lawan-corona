class Game{

    constructor(){
        // Define state turn
        this.enemyTurn = false; //set default to 'player'

        // Define state game 
        this.isPlay = false;

        // Define state turn classes
        this.classPlayer = 'player';
        this.classEnemy = 'enemy'; 

        // Define winning combinations fomr 5x5 cell
        this.winningCombinations = [];
    }

    // state turn in game
    stateClass(){
        return this.enemyTurn ? this.classEnemy : this.classPlayer;
    }

    // first method to load
    run(){
        // Generate winning combinations per 4-4
        this.generateWinningCombinations();
        this.listener();
    }

    // Handle listent event 
    listener(){
        // Start button
        $('#start').addEventListener('click', (e)=>{
            // Hide intro & show gameboard page
            $('#intro').classList.remove('active');
            $('#gameboard').classList.add('active');

            this.isPlay = true;
            this.listener();
            e.preventDefault();
        });

        if(this.isPlay){
            // Bind cell click
            window.addEventListener('click', (e)=>{
                $('.cell').forEach(cell => {
                    cell.addEventListener('click', function(e){
                        if(!this.hasAttribute('filled')){
                            // Mark the cell
                            game.mark(this);
                            if(game.checkWin()){ //check winner for player
                                game.over(false);
                            }else if(game.checkDraw()){ //check draw
                                game.over(true);
                            }else{
                                setTimeout(()=>{
                                    game.enemyMark();
                                    if(game.checkWin()){ //check winner for enemy
                                        game.over(false);
                                    }else if(game.checkDraw()){ //check draw
                                        game.over(true);
                                    }

                                    game.changeTurn();
                                },500); //delay 500ms
                            }
                        }
                        e.preventDefault();
                    });
                });
                e.preventDefault();
            });
        }

        // Restart button
        $('#restart').addEventListener('click', (e)=>{
            // Restart the game
            location.reload();
            e.preventDefault();
        });
    }

    // Mark the cell
    mark(cell){
        cell.setAttribute('filled', true);
        cell.classList.add(this.stateClass());
    }

    // Mark enemy automatically
    enemyMark(){
        this.enemyTurn = true;

        let cells = $('.cell:not([filled])');
        let randomCell = cells[Math.floor(Math.random() * cells.length)];
        this.mark(randomCell);
    }

    changeTurn(){
        this.enemyTurn = !this.enemyTurn;
    }

    checkDraw(){
        let cells = $('.cell');
        return [...cells].every(cell =>{
            return cell.classList.contains(this.classPlayer) || cell.classList.contains(this.classEnemy);
        });
    }

    checkWin(){
        let cells = $('.cell'),
            data = [];

        let check = this.winningCombinations.some(combination =>{
            let checkCombi = combination.every(index =>{
                return cells[index - 1].classList.contains(this.stateClass());
            });
            if(checkCombi){
                data.push(combination);
            }
            return checkCombi;
        });

        if(data.length > 0){
            this.setBackgroundColor(data);
        }

        return check;
        
    }

    // Set background color to cell winner
    setBackgroundColor(dataCell){
        let cells = $('.cell');
        dataCell[0].forEach(index =>{
            cells[index - 1].classList.add('mark-winner');
        });
    }

    // Set over
    over(isDraw){
        // Add blur to gameboard & show modal over
        $('#gameboard').classList.add('blur');
        $('#over').classList.add('active');
        
        setTimeout(()=>{
            $('#over').classList.add('fade');
        },100);

        if(isDraw){
            $('#winner').innerHTML = 'Draw!';
        }else{
            let messageText = this.stateClass() == this.classPlayer 
                            ? `Selamat, kamu berhasil
                            mengalahkan virus corona.`
                            : `Yah, kamu belum berhasil. Coba kembali untuk meraih kemenangan dan akhiri
                            pandemi ini!.`; 
            $('#winner').innerHTML = messageText;
        }
    }

    generateWinningCombinations(){
        this.winningCombinations.push(
             // x first
             [1, 2, 3, 4],
             [6, 7, 8, 9],
             [11, 12, 13, 14],
             [16, 17, 18, 19],
             [21, 22, 23, 24],
 
             // x second
             [2, 3, 4, 5],
             [7, 8, 9, 10],
             [12, 13, 14, 15],
             [17, 18, 19, 20],
             [22, 23, 24, 25],
 
             // y first
             [1, 6, 11, 16],
             [2, 7, 12, 17],
             [3, 8, 13, 18],
             [4, 9, 14, 19],
             [5, 10, 15, 20],
 
             // y second
             [6, 11, 16, 21],
             [7, 12, 17, 22],
             [8, 13, 18, 23],
             [9, 14, 19, 24],
             [10, 14, 20, 25],
 
             // xy fisrst
             [2, 8, 14, 20],
             [1, 7, 13, 19],
             [7, 13, 19, 25],
             [6, 12, 18, 24],
 
             //xy second
             [10, 14, 18, 22],
             [5, 9, 13, 17],
             [9, 13, 17, 21],
             [4, 8, 12, 16],
        );
    }


}