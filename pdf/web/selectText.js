
$(function(){
  var definition="";
  var tooltipDiv= $("#tooltipDiv");
  var meaningTip= new Opentip(tooltipDiv,"abc" ,{showOn: null,
                                           style: 'dark',
                                           hideTrigger: 'closeButton',
                                           hideDelay: 0.9,
                                           fixed: false,
                                           shadow: true});
  $('#viewerContainer').bind('mouseup', function(e){
    meaningTip.hide();
    var getText= getSelectedText();
    let feedText;
    if(getText.toString()){
      getText= $.trim(getText.toString());
      getText= getText.replace(/^\s+|\s+$/g, "");
      feedText= getText.toString().toUpperCase();
      console.log('"' + getText.toString() + '"' + " are selected ");
    loadJSON(function(response) {
      let feedwords, getwords;
      if(feedText){
        // Do Something with the response e.g.
        jsonresponse = JSON.parse(response);
        getwords= getText.split(" ");
        if(getwords.length < 6){
            feedwords= feedText.split(" ");
            console.log(feedwords.length);
            for( let i = 0; i < feedwords.length; i++ ){
              // Assuming json data is wrapped in square brackets as Drew suggests
              console.log(feedwords[i]);
              if(jsonresponse[feedwords[i]]){
                // console.log(jsonresponse[feedText]);
                definition +="<h3> Meaning of "+ getwords[i] + ":</h3> <p>" + jsonresponse[feedwords[i]] + "</p><br>";
              }
              else {
                definition +="<h3> Meaning of "+ getwords[i] + ":</h3><p style='color : rgb(255,0,0);'>we are unable to find definition of such word you have selected, Make sure your selected word is a proper word! <p><br>";
              }
            }
            console.log(definition,"definition");
            meaningTip.setContent(definition);
            // Assuming json data is wrapped in square brackets as Drew suggests
            // if(jsonresponse[feedText]){
            //   // console.log(jsonresponse[feedText]);
            //   meaningTip.setContent("<h3> Meaning of "+ getText + ":</h3> <p>" + jsonresponse[feedText] + "</p>");
            // }
            // else {
            //   meaningTip.setContent("we are unable to find definition of such word you have selected, Make sure your selected word is a proper word!");
            // }
            meaningTip.show();
            definition="";
            feedText="";
            getText="";
            // setTimeout(hide,feedwords.length * 3000);
        }
      }
    });
  }
  });
  $(window).bind("mousewheel DOMMouseScroll",function(e){
      meaningTip.hide();
  });
  function hide(){
    meaningTip.hide();
  }
});



function getSelectedText(){
  if(window.getSelection){
    return window.getSelection();
  }
  else if (document.getSelection) {
    return document.getSelection();
  }
  else {
        var selection = document.selection && document.selection.createRange();
        if (selection.text) {
            return selection.text;
        }
        return '';
    }
  return '';
}


function loadJSON(callback) {
    var jsonObj = new XMLHttpRequest();
    jsonObj.overrideMimeType("application/json");
    jsonObj.open('GET', 'dictionary.json', true);
    jsonObj.onreadystatechange = function() {
        if (jsonObj.readyState == 4 && jsonObj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(jsonObj.responseText);

        }
    }
    jsonObj.send(null);

}
