    //Global variables
    load("image.js");
    var mineImg = images[9];     //Mine image used when all mines are revealed at the end of a game
    var redMineImg = images[10]; //Mine with red background used when player clicked on a mine
    var defaultImg = images[11]; //Default image for unrevealed tile
    var imgWidth = images[0][0].length; //Width in pixels of the images
    var imgHeight = images[0].length;   //Height in pixels of the images

    var minesweeper = function (cols, rows, nbMines) {
        displayBoard(cols, rows);

        var remainingTiles = cols * rows; //nb of tiles not yet displayed
        var gameState = 0;                //-1: player lost; 0: game is running; 1: player won
        var firstClick = true;
        while (gameState == 0) {
            var click = waitForClick();
            
            if(firstClick){ //Initialize arrays only once
                //2D array containing displayed Tiles
                var tilesArr = generate2DArray(cols, rows);
                //2D array containing mines positions
                var minesArr = setMines(cols, rows, nbMines, click.x, click.y);
                firstClick = false;
            }
            var tile = getTile(click.x, click.y);

            //Clicked on a mine; player lost
            if(minesArr[tile.col][tile.row]){ //tile is mine
                displayMines(minesArr);
                displayImage(tile.x, tile.y, colormap, redMineImg);
                gameState = -1;
            }
            //Didn't click on a mine; Game continues
            else if(!tilesArr[tile.col][tile.row]){ //tile was not already revealed
                var nbOfAdjacentMines = getAdjacentMines(click.x, click.y, minesArr);
                displayImage(tile.x, tile.y, colormap, images[nbOfAdjacentMines]);
                tilesArr[tile.col][tile.row] = true;
                remainingTiles--;
                
                if(nbOfAdjacentMines == 0)
                    remainingTiles -= revealSurroundingTiles(click.x,click.y,minesArr,tilesArr);
                if(remainingTiles == nbMines) {gameState = 1;}
            }
        }

        if(gameState == -1){
            pause(0.01);
            alert("GAME OVER!");
        }
        else{
            displayMines(minesArr);
            pause(0.01);
            alert("YOU WIN!");
        }
        
    };

    //iterate over a 2D array and call a function on each element
    var iterateOver = function(array2D, fn){
        for(var i = 0; i < array2D.length; i++)
            for(var j = 0; j < array2D[0].length; j++)
                fn(i,j);
    };
    
    var iterateAround = function(x, y, array2D, fn){
        var tile = getTile(x,y);
        
        //make sure indexes are inside array's bounds
        var minCol = Math.max(0, tile.col-1);    
        var minRow = Math.max(0, tile.row-1);    
        var maxCol = Math.min(tile.col+1, array2D.length-1);   
        var maxRow = Math.min(tile.row+1, array2D[0].length-1);
        
        for(var i = minCol; i <= maxCol; i++ ){
            for(var j = minRow; j <= maxRow; j++){
                if(i != tile.col || j != tile.row)
                    fn(i,j);
            }
        }
    };
    
    var displayMines = function(minesArr){
        iterateOver(minesArr, function(i,j){
            if(minesArr[i][j])
                displayImage(i*imgWidth, j*imgHeight, colormap, mineImg);
        });
    };
    
    //-------------------------------------------------------------------------------
    var getTile = function(x, y){
        return {
            col: getTileCol(x), //column's index
            row: getTileRow(y), //row's index
            x: getTileX(x), //tile's leftmost pixel
            y: getTileY(y)  //tile's topmost pixel
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
    //-------------------------------------------------------------------------------

    //Displays all tiles on the game board as the selected default tile
    var displayBoard = function (cols, rows) {
        setScreenMode(imgWidth * cols, imgHeight * rows);
        drawAllTiles(cols, rows, defaultImg);
    };

    var drawAllTiles = function (cols, rows, image) {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                displayImage(j * imgWidth, i * imgHeight, colormap, image);
            }
        }
    };

    var displayImage = function(x, y, colormap, image){
        iterateOver(image, function(i,j){
            var colorKey = image[i][j];
            var color = colormap[colorKey];
            setPixel(x + j, y + i, color);
        });
    };

    var getAdjacentMines = function(x, y, minesArr){
        var mines = 0;
        iterateAround(x,y,minesArr,function(i,j){
            mines += minesArr[i][j];
        });
        return mines;
    };

    //Detects player's mouse click
    var waitForClick = function(){        
        var mouse = getMouse();               //cursor's position and button state (up/down)
        var previousMouse = mouse;            //record of the mouse from the previous iteration
        
        while (true){ //run while player hasn't clicked
            mouse = getMouse();       
            if (!previousMouse.down && mouse.down){ //mouse state changed from up to down
                return { x: mouse.x, y: mouse.y };
            }      
            previousMouse = mouse;
            pause(0.01);
        }
    };

    var setMines = function(cols, rows, nbMines, x, y){
        var minesArr = generate2DArray(cols, rows);
        populateMines(minesArr, nbMines, x, y);
        return minesArr;
    };

    //creates a 2D array with same dimension as the game board containing only false values
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

    //Places a number of mines in the mine array by switching the value to true
    var populateMines = function(minesArr, nbMines, x, y){
        var tile = getTile(x,y);
        var validMinePositionsArr = [];

        iterateOver(minesArr, function(i,j){
            if(i != tile.col || j != tile.row){
                validMinePositionsArr.push({c: i, r: j});
            }
        });

        for(var n = 0; n < nbMines; n++){
            var rand = Math.floor(Math.random() * validMinePositionsArr.length);
            var col = validMinePositionsArr[rand].c;
            var row = validMinePositionsArr[rand].r;
            minesArr[col][row] = true;
            validMinePositionsArr[rand] = validMinePositionsArr[validMinePositionsArr.length-1];
            validMinePositionsArr.pop();
        }
    };

    var revealSurroundingTiles = function(x, y, minesArr, tilesArr){
        var revealedTiles = 0;
        iterateAround(x,y,minesArr,function(i,j){
            if(!tilesArr[i][j]){
                var tileToReveal = getTile(i*imgWidth, j*imgHeight);
                    var img = images[getAdjacentMines(tileToReveal.x, tileToReveal.y, minesArr)];
                    displayImage(tileToReveal.x,tileToReveal.y,colormap,img);
                    tilesArr[i][j] = true;
                    revealedTiles++;
            }
        });        
        return revealedTiles;
    };

    var testMinesweeper = function(){
        testDisplayImage();
        testSetMines();
    };

    var testDisplayImage = function(){
        var exportDisplayImage = function(x,y,colormap,image){
            setScreenMode(3,2);
            displayImage(x,y,colormap,image);
            return exportScreen();
        };

        var colormap = [{r:255, g:255, b:255}, {r:238, g:0, b:0}];
        assert(exportDisplayImage(0,0,colormap,[]) == 
            "#000000#000000#000000\n#000000#000000#000000");
        assert(exportDisplayImage(0,0,colormap,[[]]) == 
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

    var testSetMines = function(){
        assert(setMines(2, 2, 3, 0, 0) ==
        'false,true,true,true');
        assert(setMines(2, 2, 3, 0, 16) ==
        'true,false,true,true');
        
        assert(setMines(3, 2, 5, 16, 0) ==
            'true,true,false,true,true,true');
        assert(setMines(2, 3, 5, 16, 0) ==
            'true,true,true,false,true,true');
            
        var mines = setMines(2, 2, 2, 0, 0);
        assert(mines == 'false,true,true,false' || 
               mines == 'false,false,true,true' || 
               mines == 'false,true,false,true');
    };

    
    //French functions equivalents
    var afficherImage = displayImage;
    var attendreClic = waitForClick;
    var placerMines = setMines;
    var demineur = minesweeper;
    var testDemineur = testMinesweeper;
    
    testMinesweeper();
    minesweeper(4, 4, 1);