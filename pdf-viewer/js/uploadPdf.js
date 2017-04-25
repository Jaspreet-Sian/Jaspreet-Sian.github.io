var inputPdf= document.getElementById('input-pdf');
var filePath = '';
var url ;
// var Blob= require('Blob');
inputPdf.addEventListener('change', function( event ){
  // if(window.location = '#viewer-div'){
  //   window.location= '';
  // }
  // $('#pdf-viewer').addClass('hidden');
  console.log("file changed");
  var fileName = '';
  // if( this.files && this.files.length > 1 ){
  //   fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
  // }
  // else{
    fileName = event.target.files[0].name;
    // var blob = new Blob([screen.WebReportsPdfFilesStream.selectedItem.Pdf], { type: "application/pdf;base64" });
    // url = URL.createObjectURL(blob);
    console.log(fileName,"fileName changed");
    window.URL= window.URL || window.webkitURL;
    filePath= window.URL.createObjectURL(event.target.files[0]);
    // console.log(filePath,"filePath chnaged");
    if( fileName ){
      $('.fileName').text(fileName);
    }
    $('.input-btn').removeClass('hidden');
});

inputPdf.addEventListener('focus',function(event){
  $('#input-pdf').addClass('has-focus');
});

inputPdf.addEventListener('blur', function(event){
  $('input-pdf').removeClass('has-focus')
});

var viewBtn= document.getElementById('view-btn');
// console.log(viewBtn,"vv");
viewBtn.addEventListener('click', function(event){
  event.preventDefault();
  // $('#pdf-viewer').removeClass('hidden');
  console.log("view");
  let fileName= document.getElementById('input-pdf').value;
  // console.log(window.filePath,"filePath");
  // $('.span-msg').removeClass('hidden');
  if(fileName){
    // window.location = 'web/viewer.html?file=%2F'+filePath;
    // window.location = '#viewer-div';
      var viewerUrl = 'viewer.html?file=' + encodeURIComponent(filePath);
      window.location = viewerUrl;
  }
  else {
    $('#viewer-div').addClass('hidden');
    alert("Please Choose File");
  }
});

var upldBtn= document.getElementById('upld-btn');
console.log(upldBtn,"uuu");
upldBtn.addEventListener('click', function(event){
  console.log("upload");

  // $('.span-msg').removeClass('hidden');
});


// 'click .viewBtn': function( event , temp ){
//   event.preventDefault();
//   // $('pdfPage').removeClass('hidden');
//   let path = document.getElementById('input-pdf').value.split('\\').pop();
//   console.log(path,"path");
//
// var data = new Uint8Array(fs.readFileSync(path));
// PDFJS.getDocument(data).then(function (pdfDocument) {
// console.log('Number of pages: ' + pdfDocument.numPages);
// });
  // $('.span-msg').removeClass('hidden');
  // PDFJS.disableStream = true;
  //
  // PDFJS.getDocument(path).then(function getPdfHelloWorld(pdf) {
  //   pageElement= document.getElementById('pdfPage');
  //   pdfFile = pdf;
  //   openPage(pdf, currPageNumber, 1);
  // });
// },
