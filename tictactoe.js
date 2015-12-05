var CROSS = 'X';
var CIRCLE = 'O';

var model = [];
var cells = [];

var flag; //追踪下棋方

var words; //结果的显示文字

var container = document.getElementById("container");

var newGame = function(){
  if (document.getElementById("result")){
    var resultDiv = document.getElementById("result");
    container.removeChild(resultDiv);
  }
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

var evenPlay = function(x, y){
  var evenPlay = 1;
  for (x=0; x<3; x++){
    for (y=0; y<3; y++){
      if (model[x][y] === 0){
        evenPlay = 0;
        break;
      }
    }
    if (evenPlay === 0){
      break;
    }
  }
  return evenPlay;
};

var result = function(){
  var resultDiv = document.createElement("div");
  resultDiv.setAttribute("id","result");
  var win = document.createElement("p");
  win.appendChild(words);
  resultDiv.appendChild(win);
  container.appendChild(resultDiv);
};

window.onload = function(){
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
          //悔棋处理
          (function(i,j){
            var UndoButton = document.getElementById("undo");
            UndoButton.onclick = function(){
              var resultDiv = document.getElementById("result");
              if (resultDiv){
                return false;
              }
              if (model[i][j] === 0) {
                return false;
              }else{
              model[i][j] = 0;
              cells[i][j].text = '';
              flag = (-1) * flag;
              }
            };
          })(i, j);
          if (checkWin(i, j)){
            console.log("check1");
            if (flag == 1){
              words = document.createTextNode("CROSS WIN!");
            }else{
              console.log(flag);
              console.log("check2");
              words = document.createTextNode("CIRCLE WIN!");
            }
            result();
          }else{
            if (evenPlay(i, j)){
              console.log("check3");
              words = document.createTextNode("BREAK EVEN!");
              result();
            }
          }
          //下棋方交换
          flag = (-1) * flag;
        };
      })(i, j);
    }
  }
  newGame();
};
