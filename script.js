
//open game
function openGame() {
    //תפתח את דף המשתמש כעבור 5 שניות
    debugger;
    setTimeout(() => {
        window.location.replace("index.html");

    }, 6000);
}

// במידה ואנו נמצאים על דף הפתיחה 
// תשלח לפונקצית פתיחת משחק
debugger;
if (window.location == "file:///C:/Users/HOME/Desktop/SUDOKU/openGame.html") {
    openGame();
}



//userHtml

//בדיקה האם שם המשתמש והסיסמה תקינים
function checkUserDitailes() {
    //איפוס התראות
    document.getElementById('userNameErorr').innerHTML = '';
    document.getElementById('userPasswordErorr').innerHTML = '';

    //לקיחת ערכים מתיבות הטקסט
    let userName = document.getElementById('userName').value;
    let userPassword = document.getElementById('userPassword').value;
    //בדיקת שם משתמש
    if (userName != 'abcd') {
        document.getElementById('userNameErorr').innerHTML = 'user name undifaind';

    }
    //בדיקת סיסמה
    if (userPassword != '1234') {
        document.getElementById('userPasswordErorr').innerHTML = 'user password incorrect';
    }
    //אם שניהם נכונים תפתח דף 
    //בחירת שלב משחק
    if (userName == 'abcd' && userPassword == '1234') {
        //open new page in location window
        //window.location.replace("level.html");
        document.getElementById('UserContainer').classList.add('d-none');
        document.getElementById('LevelContainer').classList.remove('d-none');
    }
}

//level html
//בדיקת רמת שבחר השחקן
//ופתיחת דף משחק
function chackLevel() {
    cleanDesigne();
    var stage = 0, level;
    for (level = 1; level < 4; level++) {
        if (document.getElementById('level' + level.toString()).checked) {
            stage = level;
        }
    }
    buildSudoko(stage);
}

//new empty bord
function createEmptyBoard() {
    let board = new Array(9);
    for (let i = 0; i < 9; i++) {
        board[i] = new Array(9);
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = '';

        }

    }
    return board;
}

//פןנקציה לבנית מטריצה לפי שלב שמקלת 
function buildSudoko(stage) {
    let level;
    var check = false;
    let randomNum, randomRow, randomCol;
    //שומר את מספר המקומות שיתמלאו במספרים
    if (stage == 1) {
        level = 55;
    }
    else if (stage == 2) {
        level = 40;
    }
    else if (stage == 3) {
        level = 25;
    }

    //שליחה לפונקציית בנית מטריצה
     let mat = createEmptyBoard();

    //מילוי מטריצת סודוקו 
    for (let i = 0; i < level; i++) {
        check = false;
        while (check == false) {
            //הגרלת מספר
            randomNum = Math.floor(Math.random() * (9 - 1 + 1) + 1);
            //row
            randomRow = Math.floor(Math.random() * (8 - 0 + 1) + 0);
            //col
            randomCol = Math.floor(Math.random() * (8 - 0 + 1) + 0);

            //בדיקה שהמקום המוגרל ריק, והכנסה למטריצה
            if (mat[randomRow][randomCol] == '') {
                check = checkValue(mat, randomRow, randomCol, randomNum);
            }
        }
        mat[randomRow][randomCol] = randomNum;
    }
    InputMat(mat);
}



// הצגת מטריצת סודוקו מוכנה בדף HTML
function InputMat(sudokuMat) {
    // window.location.replace('index.html');
    let i, j;
    
    //השמת מטריצת הסודוקו בתיבות הטקסט
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            document.getElementById('p' + i + '' + j).value = sudokuMat[i][j];
            if (sudokuMat[i][j] != "") {
                document.getElementById('p' + i + '' + j).readOnly = true;
            }
        }

    }
    //שמירת מטריצה עמ שנוכל להשתמש בה בהמשך
    //בפונקצית clean
    centerMat=createEmptyBoard();
    for ( i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            centerMat[i][j]=sudokuMat[i][j];
            
        }
        
    }
    document.getElementById('LevelContainer').classList.add('d-none');
    document.getElementById('IndexContainer').classList.remove('d-none');
}


//פונקציה שמדגישה מספר שנבחר
function selectNum(num) {
    let finishArrHelp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let finishNums = [];
    let i, j, f;
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            //ניקוי עיצוב תא נוכחי
            document.getElementById('p' + i.toString() + j.toString()).style.backgroundColor="rgb(255, 255, 255)";
            // אם המקום הנוכחי במטריצה שווה למספר שעל הכפתור
            //תצבע את התא  
            if (document.getElementById('p' + i.toString() + j.toString()).value == num) {
                document.getElementById('p' + i.toString() + j.toString()).style.backgroundColor = "rgb(233, 253, 119)";
            }

            finishArrHelp[Number(document.getElementById('p' + i.toString() + j.toString()).value)]++;

        }
        //ספירה של כל תוכן המקומות 
        for (f = 1; f <= 9; f++) {
            if (finishArrHelp[f] == 9) {
                finishNums.push(f);
            }
        }
        //שינוי תכונות של תאי המספרים שהמשתמש סיים למלא
        for (let fN = 0; fN < finishNums.length; fN++) {
            for (i = 0; i < 9; i++) {
                for (j = 0; j < 9; j++) {
                    // אם המקום הנוכחי במטריצה שווה למספר שעל שבתא הנוכחי
                    //זא שזהו מספר שהסתיים
                    //תצבע את התא  
                    if (document.getElementById('p' + i.toString() + j.toString()).value == finishNums[fN]) {
                        document.getElementById('p' + i.toString() + j.toString()).style.backgroundColor = "rgb(194, 193, 193)";
                    }
                }
            }
        }
    }
}

//פונקציה שבודקת האם השחקן פתר נכון את לוח הסודוקו
//אם כן לוח הסודוקו יצבע בירוק 
// אם יש שגיאה - יצבע באדום
//check the sudoku's board conditions. 
function GetMat() {
    let mat = createEmptyBoard();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            mat[i][j] = document.getElementById('p' + i + '' + j).value;
        }
    }
    //קריאה לפונציה
    finish(mat);
}
var finish = (arr) => {
    var boolArrayRow = new Array(9);
    var boolArrayCol = new Array(9);
    var arrCellValrow;
    var isEmptyCell = false;
    var arrCellVallCol;
    //בדיקת שורה ועמודה
    // check validation of rows and columns 
    for (let row = 0; row < arr.length; row++) {
        if (isEmptyCell) return; // maybe add alert the soduku isnt complete 
        for (let col = 0; col < arr.length; col++) {

            arrCellValrow = arr[row][col];
            arrCellVallCol = arr[col][row];
            if (arrCellValrow == null || arrCellVallCol == null) {
                // console.log('The borad isn\'t complete');
                erorr();
                return;
                isEmptyCell = true;
            }
            //check if there is 2 same nums in one row 
            if (boolArrayRow[(arrCellValrow - 1)] == undefined) {
                boolArrayRow[(arrCellValrow - 1)] = true;

            } else {
                if (boolArrayRow[(arrCellValrow - 1)] == true) {
                    boolArrayRow = resetBoolArray();
                    erorr();
                    // console.log('you have a mistake in' + col + ' ' + row);
                    return;
                }
            }
            //check if there is 2 same nums in one column 
            if (boolArrayCol[(arrCellVallCol) - 1] == undefined) {
                boolArrayCol[(arrCellVallCol) - 1] = true;
            } else {
                if (boolArrayCol[(arrCellVallCol) - 1] == true) {
                    boolArrayCol = resetBoolArray();
                    erorr();
                    // console.log('you have a mistake in' + col + ' ' + row);
                    return;
                }

            }
        }
        boolArrayRow = resetBoolArray();
        boolArrayCol = resetBoolArray();
    }
    // console.log('congrats you finished!!');
    boolArrayRow = resetBoolArray();
    // check validation of all the cubes in the board
    checkCube(0, 0);
    checkCube(0, 3);
    checkCube(0, 6);
    checkCube(3, 0);
    checkCube(3, 3);
    checkCube(3, 6);
    checkCube(6, 0);
    checkCube(6, 3);
    checkCube(6, 6);
    seccessful();

}
//בדיקת קוביה
// check validation of each cube in the board
var checkCube = (row, col) => {
    let boolArrayCube = new Array(9);
    let arrCellCubeRow;
    for (let rowCube = row; rowCube < row + 3; rowCube++) {
        //console.log(arr[rowCube1]);
        for (let colCube = col; colCube < col + 3; colCube++) {

            arrCellCubeRow = arr[rowCube][colCube];
            //check if there is 2 same nums
            if (boolArrayCube[(arrCellCubeRow - 1)] == undefined) {
                boolArrayCube[(arrCellCubeRow - 1)] = true;

            } else {
                if (boolArrayCube[(arrCellCubeRow - 1)] == true) {
                    boolArrayCube = resetBoolArray();
                    erorr();
                    // console.log('you have a mistake in');
                    return;
                }
            }
        }

    }
    boolArrayCube = resetBoolArray();
    // console.log('good job');

}
//הגדרת מערך ריק
// reset the boolean array to undefined values. 
var resetBoolArray = () => {
    let array = new Array(9);
    return array;
}

function erorr() {
    //תצבע רקע באדום
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById('p' + i.toString() + j.toString()).style.backgroundColor = "rgb(233, 94, 94)";


        }

    }
}

function seccessful() {
    //תצבע רקע בירוק
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById('p' + i.toString() + j.toString()).style.backgroundColor = " rgb(127, 233, 94)";


        }

    }
}


//יציאה מהמשחק
//close
function exit() {
    window.close()
}
document.getElementById('exitBtn').addEventListener('click', exit);


//פוקציה ראשית לבדיקת התאמה למשתנה
function checkValue(bord, row, column, value) {
    if (checkRowByValue(bord, row, value) && checkColumnByValue(bord, column, value) && check3x3SquareByValue(bord, column, row, value))
        return true;
    return false;
}
//#region check value----------------------------------------------------
//  בודקת אם הערך תקין בשורה
function checkRowByValue(bord, row, value) {
    for (let i = 0; i < bord[row].length; i++) {
        if (bord[row][i] == value)
            return false;
    }
    return true;
}

//  בודקת אם הערך תקין בעמודה
function checkColumnByValue(bord, column, value) {
    for (let i = 0; i < bord.length; i++) {
        if (bord[i][column] == value)
            return false;
    }
    return true;
}

//  בודקת מטריצה בגודל 3 על 3   
function check3x3SquareByValue(bord, column, row, value) {
    let roww = parseInt(row / 3) * 3;
    let col = parseInt(column / 3) * 3;
    for (var i = roww; i < roww + 3; i++) {
        for (var j = col; j < col + 3; j++) {
            if (bord[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}

function back() {
    document.getElementById('IndexContainer').classList.add('d-none');
    document.getElementById('LevelContainer').classList.remove('d-none');
    
    
}

//new game -button new 
function newGame() {
    cleanDesigne();
    chackLevel();
}

//יצירת משתנה מסוג var
var centerMat;
//פונקצית ניקוי מספרים שהמשתמש הכניס
//ןהצגת הלוח נקי למילוי חוזר
function clean() {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            document.getElementById('p' + i.toString() + j.toString()).style.backgroundColor="rgb(255, 255, 255)";
            document.getElementById('p' + i + '' + j).value = centerMat[i][j];
        }
    }
}

//ניקוי עיצוב קודם לפני יצירת דף משחק חדש
function cleanDesigne() {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {   
                document.getElementById('p' + i + '' + j).readOnly = false;   
                document.getElementById('p' + i.toString() + j.toString()).style.backgroundColor="rgb(255, 255, 255)";

        }

    }
    
}