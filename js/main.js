
function roundNumber(number, decimals) {
    var newnumber = new Number(number+'').toFixed(parseInt(decimals));
    return parseFloat(newnumber); 
}

let cashMachine ={
  status: "",
  change:[
   ["ONE HUNDRED", 0.00],
   ["TWENTY", 0.00],
   ["TEN", 0.00],
   ["FIVE", 0.00],
   ["ONE", 0.00],
   ["QUARTER", 0.00],
   ["DIME", 0.00],
   ["NICKEL", 0.00],
   ["PENNY", 0.00] 
]
}



function get_change(to_return,currency){
    let nominal=1.00;
    let register_position=0;
    switch(currency[0]){
      case "ONE HUNDRED":{
        nominal=100;
        register_position=0;
        break;
      }
        case "TWENTY":{
        nominal=20.00;
        register_position=1;
        break;
      }
        case "TEN":{
        nominal=10.00;
        register_position=2;
        break;
      }
        case "FIVE":{
        nominal=5.00;
        register_position=3;
        break;
      }       
        case "ONE":{
        nominal=1.00;
        register_position=4;
        break;
      }
        case "QUARTER":{
        nominal=0.25;
        register_position=5;
        break;
      }
        case "DIME":{
        nominal=0.10;
        register_position=6;
        break;
      }
        case "NICKEL":{
        nominal=0.05;
        register_position=7;
        break;
      }
        case "PENNY":{
        nominal=0.01;
        register_position=8;
        break;
      }
    }

    if(to_return>=nominal){
      let amount = currency[1]/nominal;
      let sum=0.00;
      while(roundNumber(to_return,2)>=roundNumber(nominal,2) && amount!=0){
        amount--;
        sum+=roundNumber(nominal,2);
        to_return-=nominal;
      }
      cashMachine.change[register_position][1]=roundNumber(sum,2);
}
return to_return;
}

function filter_cash(){
          cashMachine.change =cashMachine.change.filter((item) =>{
            if(item[1]==0.00){
              return false;
            }else{
              return true;
            }})
}


function checkCashRegister(price, cash, cid) {
  let to_return= roundNumber(cash-price,2);


  let sum = cid.reduce((total, a) => total + a[1], 0);

  if(to_return==sum){
    cashMachine.status="CLOSED";
    cashMachine.change=cid;
  }
  else if(to_return<0.00){
      cashMachine.status = "INSUFFICIENT_FUNDS";
      cashMachine.change =[];
  }else{

      cid.reverse();
    cid.map((currency)=>{
    to_return = roundNumber(get_change(to_return,currency),2);
    ;})
    if(to_return>0.00){
        cashMachine.status = "INSUFFICIENT_FUNDS";
        cashMachine.change =[];
    }else{
        cashMachine.status = "OPEN";
        filter_cash();
    }

  }
  console.log(cashMachine)
  return cashMachine; 
}

function palindrome(str) {
  str = str.replace(/[\W_]/g,"").toLowerCase();
  let arr1=str.split("");
  let arr2=arr1.slice(0).reverse();
  return arr1.join("")===arr2.join("") ? true: false;
}

function rot13(str) {
  let regex =  /[\W_]/g; //regex for special characters
  let arr= str.split("");
  arr.map((letter,index)=>{
    if(!regex.test(letter)){
      let code = letter.charCodeAt(0) - 13;
      if(code<65){code = 90-(64-code)};
      letter =String.fromCharCode(code);
      arr[index] = letter;
    }
      arr[index] = letter;
  })
  str = arr.join("");
  console.log(str);
  return str;
}

function telephoneCheck(str) {
  let regex =/^(1)*[- ]?(\(\d{3}\)|\d{3})[- ]?(\d{3})[- ]?(\d{4})$/g
  return regex.test(str);
}




function get_symbols(num,symbol){
  let symbols= ['I','V','X','L','C','D','M'];
  let roman=[];
  if(symbol!='M'){
    if(num>8){  
      for(let i=8;i<num;i++){
        roman.push(symbols[symbols.indexOf(symbol)]);
      }  
       roman.push(symbols[symbols.indexOf(symbol)+2]);
    }else if(num>=5){
       roman.push(symbols[symbols.indexOf(symbol)+1]);
      for(let i=5;i<num;i++){
       roman.push(symbols[symbols.indexOf(symbol)]);
      }  
    }else if(num>3){
      for(let i=3;i<num;i++){
       roman.push(symbols[symbols.indexOf(symbol)]);
      }  
       roman.push(symbols[symbols.indexOf(symbol)+1]);
    }else{
      for(let i=1;i<=num;i++){
       roman.push(symbols[symbols.indexOf(symbol)]);
      }
    }
  }else if (symbol=='M'){
    for(let i=1;i<=num;i++){
    roman.push('M');}
}
 return roman;
}


function convertToRoman(num) {
let roman =[];
let M= num -num%1000;
num=num%1000;
roman = roman.concat(get_symbols(M/1000,'M'));
let C = num - num%100;
num=num%100;
roman = roman.concat(get_symbols(C/100,'C'));
let X = num - num%10;
num=num%10;
roman = roman.concat(get_symbols(X/10,'X'));
let I = num;
roman = roman.concat(get_symbols(num,'I'));
 let roman_string=roman.join('');
 return roman_string;
}






let projects = Array.from(document.getElementsByClassName('project'));

projects[0].addEventListener('submit',(e)=>{
  e.preventDefault();
  let input_form = e.target;
  let value = input_form.querySelector('input[type="text"]').value;
  input_form.getElementsByTagName('p')[0].style.color="red";
  if(palindrome(value)){
    if(value==""){
          input_form.getElementsByTagName('p')[0].innerHTML = "Please input a word!!!";
    }else{
    input_form.getElementsByTagName('p')[0].innerHTML = "Is a palindrome";
    }
  }else{
    input_form.getElementsByTagName('p')[0].innerHTML = "Is not a palindrome";
  }
  
})


projects[1].addEventListener('submit',(e)=>{
  e.preventDefault();
  let input_form = e.target;
  let value = parseInt(input_form.querySelector('input[type="number"]').value);
  input_form.getElementsByTagName('p')[0].style.color="red";
  if(value>20000){
  input_form.getElementsByTagName('p')[0].innerHTML = 'Number too big!!!';
  }else{
  input_form.getElementsByTagName('p')[0].innerHTML = convertToRoman(value);
  }

})


projects[2].addEventListener('submit',(e)=>{
  e.preventDefault();
  let input_form = e.target;
  let value = input_form.querySelector('input[type="text"]').value;
  input_form.getElementsByTagName('p')[0].style.color="red";
    if(value==""){
          input_form.getElementsByTagName('p')[0].innerHTML = "Please input uppercase text!!!";
    }else{
    input_form.getElementsByTagName('p')[0].innerHTML = rot13(value);
    }
  })


  projects[3].addEventListener('submit',(e)=>{
  e.preventDefault();
  let input_form = e.target;
  let value = input_form.querySelector('input[type="text"]').value;
  input_form.getElementsByTagName('p')[0].style.color="red";
    if(value==""){
          input_form.getElementsByTagName('p')[0].innerHTML = "Please input US number!!!";
    }else{
      if(telephoneCheck(value)==false) {input_form.getElementsByTagName('p')[0].innerHTML = "INVALID US NUMBER";}
      else{
        input_form.getElementsByTagName('p')[0].innerHTML = "VALID US NUMBER"
      }
    }
  })


  let input = {
    price:0,
    cash:0,
    change:[
   ["ONE HUNDRED", 0.00],
   ["TWENTY", 0.00],
   ["TEN", 0.00],
   ["FIVE", 0.00],
   ["ONE", 0.00],
   ["QUARTER", 0.00],
   ["DIME", 0.00],
   ["NICKEL", 0.00],
   ["PENNY", 0.00] 
]
  }

  projects[4].addEventListener('submit',(e)=>{


cashMachine ={
  status: "",
  change:[
   ["ONE HUNDRED", 0.00],
   ["TWENTY", 0.00],
   ["TEN", 0.00],
   ["FIVE", 0.00],
   ["ONE", 0.00],
   ["QUARTER", 0.00],
   ["DIME", 0.00],
   ["NICKEL", 0.00],
   ["PENNY", 0.00] 
]
}

  e.preventDefault();
  let input_form = e.target;
  let list = input_form.querySelectorAll('.register-in');
  Array.from(list).map((item,index)=>{
    input.change[index][1]=roundNumber(list[index].value,2);
  })
  let price=input_form.querySelector('#price').value;
  let cash=input_form.querySelector('#cash').value;
  if(price=="" || cash=="" ){
    input_form.getElementsByTagName('p')[0].innerHTML = "Please input price and cash!!";
  }else{
  input.price = roundNumber(price,2);
  input.cash = roundNumber(cash,2);
   console.log(input);
  let result = checkCashRegister(input.price,input.cash,input.change);

  input_form.getElementsByTagName('p')[0].style.color="red";
  input_form.getElementsByTagName('p')[0].style.marginTop="3em";
  input_form.getElementsByTagName('p')[0].innerHTML = `STATUS:${result.status}`;

  if(result.status!="INSUFFICIENT_FUNDS"){
  let list_out = input_form.querySelectorAll('.register-out');
  result.change.map((item,index)=>{
    let res_index=0;
    switch(item[0]){
      case "PENNY":{
        res_index=8;
        break;
      }
            case "PENNY":{
        res_index=8;
        break;
      }
            case "NICKEL":{
        res_index=7;
        break;
      }
            case "DIME":{
        res_index=6;
        break;
      }
            case "QUARTER":{
        res_index=5;
        break;
      }
            case "ONE":{
        res_index=4;
        break;
      }
                  case "FIVE":{
        res_index=3;
        break;
      }
                  case "TEN":{
        res_index=2;
        break;
      }
                  case "TWENTY":{
        res_index=1;
        break;
      }
                        case "ONE HUNDRED":{
        res_index=0;
        break;
      }
    }
    list_out[res_index].value = item[1];
  })
  }
  }


  


  })