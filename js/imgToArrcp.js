var intensityArr=[], intensityBitArr=[];
var bitZeroPos=[], bitZeroArr=[];
var Data, imgData;
  function toArray(Upldimage) {
    imageToArr(Upldimage);
    // createSingleArray(intensityBitArr);
    displayData();
  }
  function getFont(Upldimage) {
    // let img= Upldimage;
    // console.log(Upldimage);
    // imageToArr(Upldimage);
    // createSingleArray(intensityBitArr);
    // displayData();
    let img= Upldimage;
    let img2= new Image();
    // img2.src= "img/font-lora1.jpg";
    img2.src= "img/font/sans.jpg";
    img2.width = 300;
    img2.height= 200;
    canvasDraw(img2, img2.width, img2.height);
console.log(img);
console.log(img2);
// console.log(bitZeroPos,"pos");
console.log(intensityArr,"bitArr");
  // var outFontPos= bitZeroPos;
  var outFontArr= intensityArr;
  // bitZeroArr=[];
  // bitZeroPos= [];
    canvasDraw(img, img.width, img.height);
  //  console.log(bitZeroPos,"Pos2");
   console.log(intensityArr,"bitArr2");
  //  var inFontPos= bitZeroPos;
   var inFontArr= intensityArr;
  //  bitZeroPos= [];
  //  bitZeroArr=[];
    // intensityArr.push(intensity);
    // intensityBitArr.push(intensityBit);

    console.log(intensityArr);
    // document.getElementById("res").setAttribute("style"," ");
    document.getElementById("res").setAttribute("style"," display : flex; ");
    document.getElementById("bitResult").innerHTML= intensityBitArr;
    document.getElementById("intensityResult").innerHTML= intensityArr;
    var getFontArr= runNetwork(inFontArr,outFontArr);
    // getfontArr.toFixed(1);
    console.log(getFontArr,"neuralFont");
    console.log(intensityArr.length);
    for (let x = 0; x < intensityArr.length; x++) {
      // console.log(x * 4," ",(x + 4) - 1,"dddddddd");
      if(outFontArr[x] < 0.8){
        intensityArr[x] = getFontArr[x].toFixed(1);
        // findRGB(Data, intensityArr);
        // console.log(x, x * 4);
        for(i = x * 4; i < (x * 4) + 3; i++){
            // console.log(Data[i],">>>>");
            Data[i]= Math.ceil(intensityArr[x] * 255);
            // console.log(Data[i],"4444");
        }
      }
      else {
        for(i = x * 4; i < (x * 4) + 3; i++){
            // console.log(Data[i],">>>>");
            Data[i]= Math.ceil(255);
            // console.log(Data[i],"4444");
        }
      }
    }
    console.log(Data,"updated");
    var cnvs= document.getElementById("canvas1");
    var cntxt= cnvs.getContext("2d");
    cntxt.putImageData(imgData, 0,0);
  // console.log(Data,"////////");

  }

function canvasDraw(img, width, height){
  intensityArr=[];
  intensityBitArr=[];
  let canvas= document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let context= canvas.getContext('2d');
  context.drawImage(img, 0, 0,canvas.width,canvas.height);
  canvas.crossOrigin = 'anonymous';
  imgData = context.getImageData(0,0,canvas.width,canvas.height);
  Data= imgData.data;
  var intensityBit;
  // let i=0;
  console.log(Data);
  for(let i=0; i< Data.length; i+=4){
    // Luminisity method to find intesity
     let r = Data[i]/255;
     let g = Data[i + 1]/255;
     let b = Data[i + 2]/255;
     let intensity = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    intensity= intensity.toFixed(1);
    if(intensity >= 0.5){
      intensityBit = Math.ceil(intensity);
    }
    else{
      intensityBit = Math.floor(intensity);
    }
    if(i > 0){
      x= i/4;
    }
    else{
      x=0;
    }
    intensityArr[x]=intensity;
    intensityBitArr[x]=intensityBit;
  }
  // var bitZeroPos=[], bitZeroArr=[];
  // let pos= 0;
  //  for (let x = 0; x < intensityArr.length; x++) {
  //  if(intensityArr[x] < 0.8){
    //  pos= parseInt((intensityArr[x]) * 10);
    //  bitZeroPos.push(x);
    //  bitZeroArr.push(intensityArr[x]);
    //  bitZeroArr[pos]= intensityArr[x];
  //  }
  //  for(let i=0; i< bitZeroArr.length; i++){
  //    if(bitZeroArr[i] == undefined){
  //      bitZeroArr[i]= "0";
  //    }
  //  }

 // }
}

  // console.log(bitZeroArr,"11111");
  var imageToArr = function(Upldimage) {
    let img= Upldimage;
    console.log(Upldimage);
    let canvas= document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let context= canvas.getContext('2d');
    context.drawImage(img, 0, 0,canvas.width,canvas.height);
    canvas.crossOrigin = 'anonymous';
    let Data=[];
    var intensityBit;
    // let i=0;
    var row=[], row1=[];
    for (let y=0; y < canvas.height; y++){
      for(let x=0; x < canvas.width; x++){
      // Luminisity method to find intesity
       Data= context.getImageData(x,y,1,1).data;
       let intensity= findInetensity(Data);
      //  console.log(intensity);
       if(intensity >= 0.5){
         intensityBit = Math.ceil(intensity);
       }
       else{
         intensityBit = Math.floor(intensity);
       }
      //  console.log(intensity);
       row[x]=intensity;
       row1[x]=intensityBit;
      }
      intensityArr[y]=row;
      intensityBitArr[y]=row1;
    }
  }

  var displayData = function(){
    // document.getElementById("res").setAttribute("style"," ");
    document.getElementById("res").setAttribute("style"," display : flex; ");
    document.getElementById("bitResult").innerHTML= intensityBitArr;
    document.getElementById("intensityResult").innerHTML= intensityArr;
  }

  var createSingleArray = function(arr){
     var bitZeroArr=[], bitArr=[];
      bitArr= get1DArray(arr);
      for (let x = 0; x < bitArr.length; x++) {
      if(bitArr[x] == 0){
        bitZeroArr.push(x);
      }
    }
    console.log(bitZeroArr,"ll");
    return bitZeroArr;
  }

  var get1DArray = function(arr){
      return arr.join().split(",");
  }

  function findRGB(Data, intesity){
    for(let i=0; i< Data.length; i+=4){
      Data[i]= Math.ceil(intesity * 255);
      Data[i+1]= Math.ceil(intesity * 255);
      Data[i+2]= Math.ceil(intesity * 255);
    }
    return Data;
  }

  function findInetensity(Data){
     let r = Data[0]/255;
     let g = Data[1]/255;
     let b = Data[2]/255;
     let intensity = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
     intensity= intensity.toFixed(1);
     return intensity;
  }

  function runNetwork(inFontArr,outFontArr){
    var net = new brain.NeuralNetwork();
      net.train([{input : bitZeroArr, output : outFontArr}],{
                  errorThresh : 0.05,
                  iterations : 20000,
                  log : true,
                  logPeriod : 100,
                  learningRate : 0.3
               });
                  //  console.log(bitZeroArr[i]);
                    var output= net.run(bitZeroArr);
                    return output;
   }
