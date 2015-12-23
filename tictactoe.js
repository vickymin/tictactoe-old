window.onload = function(){
  var modeDiv = document.createElement("div");
  modeDiv.setAttribute("id","mode");
  var modePara = document.createElement("p");
  var modeText = document.createTextNode("Choose ⬅️ Mode")
  modePara.appendChild(modeText);
  modeDiv.appendChild(modePara);
  container.appendChild(modeDiv);
}

var CROSS = 'X';
var CIRCLE = 'O';

var model = [];
var cells = [];
var flag; //追踪下棋方
var resultText; //结果的显示文字
var array;
var row, col, index;
var container = document.getElementById("container");

var newGame = function(){
  if (document.getElementById("mode")){
    var modeDiv = document.getElementById("mode");
    container.removeChild(modeDiv);
  }
  if (document.getElementById("result")){
    var resultDiv = document.getElementById("result");
    container.removeChild(resultDiv);
  }
  array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var i, j;
  for (i=0; i<3; i++){
    for (j=0; j<3; j++){
            model[i][j] = 0;
            cells[i][j].text = ' ';
        }
    flag = -1;
  }
};

var freshView = function(){
  var i, j;
  for (i=0; i<3; i++){
    for (j=0; j<3; j++){
      if (model[i][j] == 1){
        cells[i][j].text = CROSS;
      }else if(model[i][j] == -1){
        cells[i][j].text = CIRCLE;
      }
    }
  }
};

var checkWin = function(x, y){
  var i, j;
  // 检查 X 方向
  var sum = 0;
  for (i=0; i<3; i++) {
    sum += model[x][i];
  }
  if (sum == 3 || sum == -3){
    return 1;
  }
  // 检查 Y 方向
  sum = 0;
  for (i=0; i<3; i++){
    sum += model[i][y];
  }
  if (sum == 3 || sum == -3){
    return 1;
  }
  // 检查 \ 方向
  if (x == y){
    sum = 0;
    for (i=0; i<3; i++){
      sum += model[i][i];
    }
    if (sum == 3 || sum == -3){
      return 1;
    }
  }
  // 检查 / 方向
  if (x + y == 2){
    sum = 0;
    for (i=0; i<3; i++){
      sum += model[i][2-i];
    }
    if (sum == 3 || sum == -3){
      return 1;
    }
  }
  return false;
};

//判断平局
var evenPlay = function(){
  var even = 1;
  for (var x=0; x<3; x++){
    for (var y=0; y<3; y++){
      if (model[x][y] == 0){
        even = 0;
        break;
      }
    }
    if (even == 0){
      break;
    }
  }
  return even;
};

//显示结果
var result = function(){
  var resultDiv = document.createElement("div");
  resultDiv.setAttribute("id","result");
  var resultPara = document.createElement("p");
  resultPara.appendChild(resultText);
  resultDiv.appendChild(resultPara);
  container.appendChild(resultDiv);
};

var computer = function(){
  var count = 0;
  while(array[index] === undefined){
    count++;
    index = Math.floor(Math.random()*array.length);
    if(count == array.length){
      return false;
    }
  }
  delete array[index];
  col = index%3;
  row = (index - col)/3;
  model[row][col] = (-1) * flag;
  freshView();
  flag = (-1) * flag;
  checkResult(row, col);
}

//悔棋
var undoOne = function(x,y){
  var UndoButton = document.getElementById("undo");
  UndoButton.onclick = function(){
    var resultDiv = document.getElementById("result");
    if (resultDiv){
      return false;
    }
    if (model[x][y] === 0) {
      return false;
    }else{
      model[x][y] = 0;
      cells[x][y].text = '';
      array[x*3+y] = x*3+y;
      model[row][col] = 0;
      cells[row][col].text = '';
      array[index] = index;
    }
  }
}
var undoTwo = function(x,y){
  var UndoButton = document.getElementById("undo");
  UndoButton.onclick = function(){
    var resultDiv = document.getElementById("result");
    if (resultDiv){
      return false;
    }
    if (model[x][y] === 0) {
      return false;
    }else{
      model[x][y] = 0;
      cells[x][y].text = '';
      flag = (-1) * flag;
    }
  }
}

var checkResult = function(x, y){
  if (checkWin(x, y)){
    if (flag == 1){
      resultText = document.createTextNode("CROSS WIN!");
    }else{
      resultText = document.createTextNode("CIRCLE WIN!");
    }
    result();
  }else{
    if (evenPlay()){
      resultText = document.createTextNode("BREAK EVEN!");
      result();
    }
  }
}

var onePlayer = function(){
  document.getElementById("restart").setAttribute("onclick","newGame()");
  var i, j;
  // 初始化二维数组
  for (i=0; i<3; i++){
    model[i] = [];
    cells[i] = [];
  }
  for (i=0; i<3; i++){
    for (j=0; j<3; j++){
      cells[i][j] = document.getElementById('cell-' + i + '-' + j);
      (function(i, j){
        cells[i][j].onclick = function(){
          if (model[i][j] !== 0){
            return false;
          }
          model[i][j] = flag;
          freshView();
          delete array[i*3+j];
          checkResult(i,j);
          if(!document.getElementById("result")){
            computer();
          }
          flag = (-1) * flag;
          undoOne(i,j);
        };
      })(i, j);
    }
  }
  newGame();
};

var twoPlayer = function(){
  document.getElementById("restart").setAttribute("onclick","newGame()");
  var i, j;
  // 初始化二维数组
  for (i=0; i<3; i++){
    model[i] = [];
    cells[i] = [];
  }
  for (i=0; i<3; i++){
    for (j=0; j<3; j++){
      cells[i][j] = document.getElementById('cell-' + i + '-' + j);
      (function(i, j){
        cells[i][j].onclick = function(){
          if (model[i][j] !== 0){
            return false;
          }
          model[i][j] = flag;
          freshView();
          undoTwo(i,j);
          checkResult(i,j);
          //下棋方交换
          flag = (-1) * flag;
        };
      })(i, j);
    }
  }
  newGame();
};
