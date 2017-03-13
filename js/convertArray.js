

  var toArray = function() {
    let img= document.getElementById("Upldimage");
    let canvas= document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let context= canvas.getContext('2d');
    context.drawImage(img, 0, 0,canvas.width,canvas.height);
    canvas.crossOrigin = 'anonymous';
    let Data = context.getImageData(0,0,canvas.width,canvas.height).data;
//;lfsfld;fkl;sf
    var getBit=[];
    var intensityArr=[], intensityBitArr=[], intensityBit;
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
      intensityArr.push(intensity);
      intensityBitArr.push(intensityBit);
    }
    console.log(intensityArr);
    // document.getElementById("res").setAttribute("style"," ");
    document.getElementById("res").setAttribute("style"," display : flex; ");
    document.getElementById("bitResult").innerHTML= intensityBitArr;
    document.getElementById("intensityResult").innerHTML= intensityArr;
  }
