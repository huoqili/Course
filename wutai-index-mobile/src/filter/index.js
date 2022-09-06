// Vue.filter('',function(){})


let filter = {
    // 400 ==> 00:00
   secondToMin(value){
       let minTemp = Math.floor( value / 60);
       let min = minTemp >= 10? minTemp : '0' +minTemp;
       let secTemp = value % 60;
       let second = secTemp >=10 ? secTemp : '0' +secTemp;
       return min +":"+ second;
   },
   dateFormate(){

   },

};

export  default  filter;
