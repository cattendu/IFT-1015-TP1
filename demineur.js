/************************************ TP1 **************************************
    Class: IFT-1015
    Authors:
        Wassim Seddiki, 
        Charles Attendu, 1005236
    Date: 05-11-2018
    Description: This program emulates the classic game of Minesweeper.
*******************************************************************************/

/*************************** VARIABLES TERMINOLOGY *****************************
    cols/rows: Number of columns/rows of tiles in the game board
    col/row:   Tile coordinates - top left is (0,0)
    x/y:       Pixel coordinates - top left is (0,0)
*******************************************************************************/

//Global variables
load("image.js"); //images are all expected to be of the same size

var imgWidth = images[0][0].length; //Width in pixels of the images
var imgHeight = images[0].length;   //Height in pixels of the images
var mineImg = images[9];            //Image of a mine
var redMineImg = images[10];        //Image of a mine with red background
var defaultImg = images[11];        //Image of unrevealed tile

var minesweeper = function (cols, rows, nbMines) {
    //2D bool array: tile at corresponding coords has been displayed
    var tilesArr = generate2DArray(cols, rows);
    //Nb of tiles not yet displayed: game is won when remainingTiles == nbMines
    var remainingTiles = cols * rows;
    var gameState = 0; //-1: player lost; 0: game is running; 1: player won
    var firstClick = true;
    
    //init board
    setScreenMode(imgWidth*cols, imgHeight*rows);
    displayTiles(cols, rows);

    while (gameState == 0) {
        var click = waitForClick();
        var tile = getTile(click.x, click.y); //tile player clicked on
        
        if(firstClick){ //Initialize only once
            //2D array containing mines positions
            minesArr = setMines(cols, rows, nbMines, tile.col, tile.row);
            firstClick = false;
        }

        //Clicked on a mine; PLAYER LOST
        if(minesArr[tile.col][tile.row]){ //tile is a mine
            gameState = -1;
        }
        //Didn't click on a mine; GAME CONTINUES
        else if(!tilesArr[tile.col][tile.row]){ //tile is not yet displayed
            //Check how many mines are adjacent to the clicked tile
            var nbAdjMines = getAdjMines(tile.col, tile.row, minesArr);
            
            //Set clicked tile as displayed and display corresponding image
            tilesArr[tile.col][tile.row] = true;
            displayImage(tile.x, tile.y, colormap, images[nbAdjMines]);
            remainingTiles--;
            
            //display adjacent tiles if clicked tile has no adjacent mines
            if(nbAdjMines == 0){
                remainingTiles -= 
                displayAdjTiles(tile.col,tile.row,minesArr,tilesArr);
            }
            //Check win condition
            if(remainingTiles == nbMines){
                gameState = 1;
            }
        }
    } //exited from game's main loop

    displayMines(minesArr); //reveal all mines

    if(gameState == -1){ //Player lost
        //display clicked mine with red background
        displayImage(tile.x, tile.y, colormap, redMineImg);
        var msg = "GAME OVER!";
    }
    else{                //Player won
        var msg = "YOU WIN!";
    }
    pause(0.01); //allow images to be displayed before alert message
    alert(msg);  //alert Game End
};
//------------------------------------------------------------------------------
//Detects player's mouse click
var waitForClick = function(){
    var mouse = getMouse();    //cursor's (x,y) and button state (up/down)
    var previousMouse = mouse; //record from the previous iteration
    
    while (true){ //run while player hasn't clicked
        mouse = getMouse();
        if (!previousMouse.down && mouse.down){ //state changed from up to down
            return { x: mouse.x, y: mouse.y };
        }
        previousMouse = mouse;
        pause(0.01); //pause to lighten load on CPU
    }
};
//------------------------------------------------------------------------------
//Display an image at the (x,y) pixel coordinates
var displayImage = function(x, y, colormap, image){
    iterateOver(image, function(i,j){
        var colorKey = image[i][j];      //key to rgb value
        var color = colormap[colorKey];  //retrieve rgb from colormap
        setPixel(x+j, y+i, color);
    });
};
//Displays all tiles containing a mine
var displayMines = function(minesArr){
    iterateOver(minesArr, function(i,j){
        if(minesArr[i][j])
            displayImage(i*imgWidth, j*imgHeight, colormap, mineImg);
    });
};  
//Displays all tiles as unrevealed tiles
var displayTiles = function (cols, rows){
    for(var i = 0; i < cols; i++)
        for(var j = 0; j < rows; j++)
            displayImage(j*imgWidth, i*imgHeight, colormap, defaultImg);
};
//Display each tile adjacent to a specified tile
var displayAdjTiles = function(col, row, minesArr, tilesArr){
    var displayedTiles = 0;
    //Check the 8 tiles around (col,row) and display tiles if not yet displayed
    iterateAround(col, row, minesArr, function(i,j){
        if(!tilesArr[i][j]){ //tile is not displayed
            var nbAdjacentMines = getAdjMines(i, j, minesArr);
            var img = images[nbAdjacentMines];
            displayImage(i*imgWidth, j*imgHeight, colormap, img);
            tilesArr[i][j] = true; //set surrounding tile as displayed
            displayedTiles++;
        }
    });
    return displayedTiles;
};
//Returns the total number of mines in tiles adjacent to (col,row)
var getAdjMines = function(col, row, minesArr){
    var mines = 0;
    iterateAround(col, row, minesArr, function(i,j){
        mines += minesArr[i][j]; //1: mine, 0: no mine
    });
    return mines;
};
//------------------------------------------------------------------------------
//creates a 2D array of size cols/rows containing only boolean false values
var generate2DArray = function(cols, rows){
    var arr = Array(cols);
    for (var i = 0; i < cols; i++) {
        arr[i] = Array(rows);
        for (var j = 0; j < rows; j++) {
            arr[i][j] = false;
        }
    }
    return arr;
};
//2D bool array with n random mines anywhere except at (col,row)
var setMines = function(cols, rows, nbMines, col, row){
    var minesArr = generate2DArray(cols, rows);
    var candidatesArr = generateMineCandidates(minesArr, col, row);
    setMineCandidates(minesArr, candidatesArr, nbMines);
    return minesArr;
};
//generate all valid 2D coordinates where mines can be placed
var generateMineCandidates = function(minesArr, col, row){
    var candidatesArr = [];
    iterateOver(minesArr, function(i,j){
        if(!(i == col && j == row)){ //evaluated tile != clicked tile
            candidatesArr.push({col: i, row: j});
        }
    });
    return candidatesArr;
};
//Select n mine positions from available candidates and add them to minesArr
var setMineCandidates = function(minesArr, candidatesArr, nbMines){
    for(var n = 0; n < nbMines; n++){
        var rand = Math.floor(Math.random() * candidatesArr.length);
        var c = candidatesArr[rand]; //selected candidate

        //remove selected candidate from available candidates
        candidatesArr[rand] = candidatesArr[candidatesArr.length-1];
        candidatesArr.pop();
        minesArr[c.col][c.row] = true; //set mine at position
    }
};
//--------------------------------------------------------------------------
//iterate over all elems of a 2D array and call a function on each element
var iterateOver = function(array2D, fn){
    for(var i = 0; i < array2D.length; i++)
        for(var j = 0; j < array2D[0].length; j++)
            fn(i,j); //call function on each element
};
//iterate over 8 tiles around (col,row) and call a function on each element
var iterateAround = function(col, row, array2D, fn){     
    //make sure indexes are inside array's bounds
    var minCol = Math.max(col-1, 0);
    var minRow = Math.max(row-1, 0);
    var maxCol = Math.min(col+1, array2D.length-1);   
    var maxRow = Math.min(row+1, array2D[0].length-1);
    
    //iterate around a tile
    for(var i = minCol; i <= maxCol; i++ )
        for(var j = minRow; j <= maxRow; j++)
            if(!(i == col && j == row)) //evaluated tile != clicked tile
                fn(i,j); //call function on each element
}; 
//--------------------------------------------------------------------------
var getTile = function(x, y){
    return {
        col: getTileCol(x), //column's index
        row: getTileRow(y), //row's index
        x: getTileX(x),     //tile's leftmost pixel
        y: getTileY(y)      //tile's topmost pixel
    };
};
//Leftmost pixel of tile corresponding to a pixel coordinate
var getTileX = function(x){
    return getTileCol(x) * imgWidth;
};
var getTileY = function(y){
    return getTileRow(y) * imgHeight;
};
//Converts a pixel coordinate to its corresponding tile column index
var getTileCol = function(x){
    return Math.floor(x/imgWidth);
};
//Converts a pixel coordinate to its corresponding tile row index
var getTileRow = function(y){
    return Math.floor(y/imgHeight);
};
//--------------------------------------------------------------------------
var testMinesweeper = function(){ //Unit tests
    testDisplayImage();
    testSetMines();
};

var testDisplayImage = function(){  //Unit tests
    var exportDisplayImage = function(x,y,colormap,image){
        setScreenMode(3,2);
        displayImage(x,y,colormap,image);
        return exportScreen();
    };

    var colormap = [{r:255, g:255, b:255}, {r:238, g:0, b:0}];
    assert(exportDisplayImage(0,0,colormap,[]) == 
        "#000000#000000#000000\n#000000#000000#000000");
    assert(exportDisplayImage(1,1,colormap,[[0]]) == 
        "#000000#000000#000000\n#000000#ffffff#000000");
    assert(exportDisplayImage(0,0,colormap,[[1,0],[0,1]]) == 
        "#ee0000#ffffff#000000\n#ffffff#ee0000#000000");
    assert(exportDisplayImage(1,0,colormap,[[1,0],[0,1]]) == 
        "#000000#ee0000#ffffff\n#000000#ffffff#ee0000");
    assert(exportDisplayImage(0,1,colormap,[[1,0,1]]) == 
        "#000000#000000#000000\n#ee0000#ffffff#ee0000");
    assert(exportDisplayImage(0,0,colormap,[[1,0,0],[1,0,0]]) == 
        "#ee0000#ffffff#ffffff\n#ee0000#ffffff#ffffff");
    assert(exportDisplayImage(2,0,colormap,[[1],[0]]) == 
        "#000000#000000#ee0000\n#000000#000000#ffffff");
};

var testSetMines = function(){  //Unit tests
    //same dimensions, different clicks
    assert(setMines(2, 2, 3, 0, 0) ==
    'false,true,true,true');
    assert(setMines(2, 2, 3, 0, 1) ==
    'true,false,true,true');
    
    //same clicks, different dimensions
    assert(setMines(3, 2, 5, 1, 0) ==
        'true,true,false,true,true,true');
    assert(setMines(2, 3, 5, 1, 0) ==
        'true,true,true,false,true,true');
    
    //same clicks, same dimensions, different nbMines
    var mines1 = setMines(2, 2, 2, 1, 1);
    assert(mines1 == 'true,true,false,false' || 
           mines1 == 'true,false,true,false' || 
           mines1 == 'false,true,true,false');
    var mines2 = setMines(2, 2, 1, 1, 1);
    assert(mines2 == 'true,false,false,false' || 
           mines2 == 'false,true,false,false' || 
           mines2 == 'false,false,true,false');
};

//French functions equivalents
var afficherImage = displayImage;
var attendreClic = waitForClick;
var placerMines = setMines;
var demineur = minesweeper;
var testDemineur = testMinesweeper;

testMinesweeper();