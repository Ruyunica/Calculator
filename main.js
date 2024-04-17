//HTMLから結果表示画面の取得
let result = document.getElementById(`result`);

//ACボタン押下で結果を0にする
function ACButton(){
    result.value = "0";
}

//00以外の数字ボタン押下
function digitButton(val){
    if(result.value == "0" && val == "0"){
        result.value = "0";
    }else if(result.value == "0"){
        result.value = val;
    }else{
        result.value += val;
    }
}

//00ボタンを押下
function doubleZeroButton(val){
    if(result.value !=="0" && !isOperatorLastChar()){
        result.value += val;
    }
}

//小数点を押下
function pointButton(val){
    const lastChar = result.value.slice(-1);
    if(lastChar !== "." && !isOperatorLastChar()){
        result.value += val;
    }
}

//演算子を押下
function operatorButton(val){
    const lastChar = result.value.slice(-1);
    if(lastChar === "." || isOperatorLastChar()){
        result.value = result.value.slice(0, -1) + val;
    }else{
        result.value += val;
    }
}

//=ボタンを押下
function equalsButton(){
    try{
        result.value = calculateExpression(result.value);
    }catch(e){
        result.value = "Error"
    }
}

//直前に入力された文字が演算子かをtrue/falseで判別
function isOperatorLastChar(){
    return ["+","-","*","/"].includes(result.value.toString().slice(-1));
}

//式を計算する関数
function calculateExpression(expression) {
    return Function('"use strict"; return(' + expression + ')')();
}