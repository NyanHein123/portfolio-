var game_board=[];
const rows = 8;
const cols= 8;

var bottle_count =5;
var bottle_location=[];

var num_cell_clicked = 0 ; //clicked cells except the ones with bottles
var flag_inserted = false;

var game_finish = false;

window.onload = function(){
    initiate_game();
}
//The following function is for initiating or starting the game. 
function initiate_game(){
    document.getElementById("num_of_bottles").innerText = bottle_count;
    document.getElementById('flag_btn').addEventListener('click',Flagsetting);
    setBottle();
    //populating game board
    
        for(let r=0;r<rows;r++){
            let row = [];
            for(let c=0;c<cols;c++){
                //creating div element
                let cell= document.createElement("div");
                cell.id = r.toString() + "-" + c.toString();
                cell.addEventListener('click',cellClicked);
                document.getElementById('game_board').append(cell);
                row.push(cell);
            }
            game_board.push(row);
        }   
    console.log(game_board);
}
//The following function is for setting what will happen when the red flag button is clicked.
function Flagsetting(){
    if(flag_inserted){
        flag_inserted=false;
        document.getElementById("flag_btn").style.backgroundColor = "lightgray";
    }
    else {
        flag_inserted = true;
        document.getElementById('flag_btn').style.backgroundColor='darkgray';
    }
}
//The following function set the water bottles(like the mines) in the cell
function setBottle(){
    // bottle_location.push("2-2");
    // bottle_location.push("2-3");
    // bottle_location.push("5-6");
    // bottle_location.push('3-4');
    // bottle_location.push('1-1');

    //The following randomize the bottle location
let bottle_left =bottle_count;
while (bottle_left > 0) { 
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);
    let newId = row.toString() + "-" + col.toString();

    if (!bottle_location.includes(newId)) {
        bottle_location.push(newId);
        bottle_left-= 1;
    }
}
}
//The following function determines what will happen
// if the cell is clicked

function cellClicked(){
    if (game_finish || this.classList.contains("cell_clicked")){
        return;
    }
    let Cell = this;
    if(flag_inserted){
        if(Cell.innerText==""){
            Cell.innerText = "🚩";
        }
        else if(Cell.innerText== "🚩")
        {
            Cell.innerText = "";
            flag_inserted=false;
        }
        return;
    }
    // The following condition check whether 
    // the clicked cell has bottle or not.
    if(bottle_location.includes(Cell.id)){
        alert("Ouch, Game Over.");
        game_finish = true;
        revealBottles();
        return;
    }
    let coordinate = Cell.id.split("-");
    let rowNum = parseInt(coordinate[0]);
    let colNum = parseInt(coordinate[1]);
    checkBottle(rowNum,colNum);
}

//the following function will reveal the bottle location
// if the player clicked the cell which has a bottle if the cell has no flag

function revealBottles(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let cell = game_board[r][c];
            if(bottle_location.includes(cell.id)){
                cell.innerText = "🧴";
                cell.style.backgroundColor = "green";
            }
        }
    }
}

function checkBottle(row,col){
    if(row<0 || row>=rows || col<0 || col>=cols)
    {
        return;
    }
    if((game_board[row][col].classList.contains("cell_clicked"))){
        return;
    }
    game_board[row][col].classList.add('cell_clicked');
    num_cell_clicked += 1;
    let bottlesFound = 0;

    //checking the top 3 cells of a clicked cell
    bottlesFound += checkCell(row-1,col-1); //top left
    bottlesFound += checkCell(row-1,col); // top
    bottlesFound += checkCell(row-1,col+1);// top right

    //checking left and right of the clicked cell
    bottlesFound += checkCell(row,col-1); //left cell
    bottlesFound += checkCell(row,col+1); //right cell

    //checking the bottom 3 
    bottlesFound += checkCell(row+1,col-1);
    bottlesFound += checkCell(row+1,col);
    bottlesFound += checkCell(row+1,col+1);

    if (bottlesFound>0){
        game_board[row][col].innerText= bottlesFound;
        game_board[row][col].classList.add('t'+bottlesFound.toString());

    }
    else{
        checkBottle(row-1,col-1);//top left
        checkBottle(row-1,col);//top
        checkBottle(row-1,col+1);//top right

        //left and right
        checkBottle(row,col-1);//left
        checkBottle(row,col+1);//right
        //bottm 3 recursively checking
        checkBottle(row-1,col-1);//bottom left
        checkBottle(row-1,col);//bottom
        checkBottle(row-1,col+1);//bottom right
    }
    if(num_cell_clicked == rows * cols - bottle_count){
        document.getElementById('num_of_bottles').classList.add("num_of_bottle");
        document.getElementById('num_of_bottles').innerText = "Cleared";
        game_finish = true;
    }
}

function checkCell(row,col){
    if(row<0 || row>=rows || col<0 || col>=cols)
    {
        return 0;
    }
    if(bottle_location.includes(row.toString()+'-'+col.toString())){
        return 1;
    }
    return 0;
}