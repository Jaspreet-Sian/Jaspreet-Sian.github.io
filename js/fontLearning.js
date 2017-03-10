 var network= new brain.NeuralNetwork();
var fonts = [
  "Cabin",
  "Fjall One",
  "Istok Web",
  "Josefin Sans",
  "Lato",
  "Montserrat",
  "Ubuntu",
  "Lora",
  "Raleway",
  "Quicksand",
  "PT Sans"
];
network.train([
  {input: {fontCode: 0}, output: {font : 0} },
  {input: {fontCode: 0.01}, output: {font : 0.05}},
  {input: {fontCode: 0.1}, output: {font : 0.1}},
  {input : {fontCode: 1}, output: {font : 0.9} }],
{
  errorThresh : 0.005,
  iterations : 20000,
  log : true,
  logPeriod: 10,
  learningRate : 0.3
});

  function getFont(fontCode) {
    return fonts[Math.floor(network.run(fontCode).font * fonts.length)];
  }

  function getFontIndex(fontName){
    console.log(fontName,"name");
    var fontIndex= fonts.indexOf(fontName);
    return fontIndex == -1 ? "undefined" : fontIndex;
  }

  function fontPairing() {
    var results = [];
    var fontName= document.getElementById("fontName").value;
    // console.log(fontName.toUpperCase().charAt(0) + fontName.substring(1) ,"cccc");
    var fontIndex= getFontIndex(fontName.toUpperCase().charAt(0) + fontName.substring(1));
    var result= document.getElementById("result");
    if(!(fontIndex == "undefined")){
      var getFontCode= fontIndex/fonts.length;
      var fontCode = {fontCode: getFontCode}
      var txt = getFont(fontCode);
      console.log(txt);
      results.push(fonts[fontIndex] + " : "  + txt);
      result.setAttribute("class"," ");
      result.innerHTML = results.join("<br>");
      var fontHeading= document.getElementById("writtenHeading");
      fontHeading.setAttribute("style","font-family :" + fonts[fontIndex]);
      fontHeading.innerHTML= "Heading is written in " + fonts[fontIndex] + " font";
      var fontText= document.getElementById("writtenText");
      fontText.setAttribute("style","font-family :" + txt);
      fontText.innerHTML= "Paragraph is written in " + txt + " font";
    }
    else {
      result.setAttribute("class","alert");
      result.innerHTML = "You Have entered wrong Font, please Recheck!";
      document.getElementById("writtenHeading").innerHTML="";
      document.getElementById("writtenText").innerHTML= "";
    }
  }
