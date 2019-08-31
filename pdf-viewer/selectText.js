
$(function(){
  var cr;
  var definition="";
  var tooltipDiv= $("#tooltipDiv");
  var meaningTip= new Opentip(tooltipDiv ,{showOn: null,
                                           style: 'dark',
                                           hideTrigger: 'closeButton',
                                           fixed: false,
                                           shadow: true,
                                           shadowBlur: 11,
                                           shadowColor: 'rgb(169,169,169)'
                                       });
  $(window).on({
    'click' : function(){
      meaningTip.hide();
      $('#tooltip-menu').hide();
    }
  });
  $(document).on({
     'mouseup': function() {
        cr= window.getSelection().getRangeAt(0).getClientRects();
        $('#tooltip-menu').hide();
       },
       'mousemove': function(ev) {
         if(cr){
         for(var i = 0 ; i < cr.length ; i++) {
          if(ev.pageX >= cr[i].left && ev.pageX <= cr[i].right &&
              ev.pageY >= cr[i].top  && ev.pageY <= cr[i].bottom
           ) {
                  if(cr[i].top > 70){
                        $('#tooltip-menu')
                             .css({
                                   top: cr[0].top-$('#tooltip-menu').outerHeight()-8
                                 });
                  }
                  else {
                    $('#tooltip-menu')
                         .css({
                               top: cr[0].bottom + 2,
                              });
                  }
                  if(cr[i].right >= (screen.width - 130)){
                    $('#tooltip-menu')
                         .css({
                               right: 5,
                               left: ''
                             });
                  }
                  else if(cr[i].left <= 130 ) {
                    $('#tooltip-menu')
                         .css({
                                right: '',
                                left: cr[0].left
                             });
                  }
                  else {
                   let calc = parseInt(cr[0].left + cr[0].right)/2 - 120;
                   $('#tooltip-menu')
                         .css({
                                left: calc,
                                right: ''
                             });
                  }
                  $('#tooltip-menu').show();
                     break;

            }

          }
          cr="";
        }
      }
    });

var definitionBtn= document.getElementById('definition');
definitionBtn.addEventListener("click", function() {
  $('#tooltip-menu').hide();
//   console.log('Selection changed.');
// });
//   $('#viewerContainer').bind('mouseup', function(e){

    meaningTip.hide();
    var getText= getSelectedText();
    let feedText;
        if(getText.toString()){
          getText= $.trim(getText.toString());
          getText= getText.replace(/^\s+|\s+$/g, "");
          feedText= getText.toString().toUpperCase();
          console.log('"' + getText.toString() + '"' + " are selected ");
        loadJSON(function(response) {
          let feedwords, getWords;
          if(feedText){
            // Do Something with the response e.g.
            jsonresponse = JSON.parse(response);
            getWords= getText.split(" ");
            if(getWords.length < 6){
                feedwords= feedText.split(" ");
                console.log(feedwords.length);
                for( let i = 0; i < feedwords.length; i++ ){
                  // Assuming json data is wrapped in square brackets as Drew suggests
                  console.log(feedwords[i]);
                  if(jsonresponse[feedwords[i]]){
                    meaningTip.style= 'dark';
                    definition +="<h3> Meaning of "+ getWords[i] + ":</h3> <p>" + jsonresponse[feedwords[i]] + "</p><br>";
                  }
                  else {
                    // definition +="<h3> Meaning of "+ getWords[i] + ":</h3><p style='color : rgb(255,0,0);'>we are unable to find definition of such word you have selected, Make sure your selected word is a proper word! <p><br>";
                    meaningTip.style= 'alert';
                    definition +="<h3> Meaning of "+ getWords[i] + ":</h3><p style='color: rgb(255,0,0);'>we are unable to find definition of such word you have selected, Make sure your selected word is a proper word! <p><br>";
                  }
                }
                console.log(definition,"definition");
                meaningTip.setContent(definition);
                meaningTip.show();
                definition="";
                feedText="";
                getText="";
                setTimeout(hide,feedwords.length * 4000);
            }
          }
        });
      }

  });
  if(window.addEventListener)
		document.addEventListener('DOMMouseScroll', hide, false);

	//for IE/OPERA etc
	document.onmousewheel = hide;
  // $(window).bind("mousewheel DOMMouseScroll",function(e){
  //     meaningTip.hide();
  // });
  function hide(){
    meaningTip.hide();
    $('#tooltip-menu').hide();
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
