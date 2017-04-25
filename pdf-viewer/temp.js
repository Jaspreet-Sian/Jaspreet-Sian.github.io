
$(function(){
  $('#viewerContainer').bind('mouseup', function(e){
    var getText= getSelectedText();
    var coords= getSelectedCoords();
    // console.log(coords.x);
    if(getText.toString()){
      // console.log('"' + getText.toString() + '"' + " are selected at x=" + e.pageX + "y=" + e.pageY );
      getText= $.trim(getText.toString());
      // range= getText.createRange();
      // console.log(range.getRangeAt);
      console.log('"' + getText.toString() + '"' + " are selected at x=" + e.pageX + "y=" + e.pageY );
      console.log("coords : " +  coords.x + ", " + coords.y);
      // alert('"' + getText.toString() + '"' + " are selected at x=" + e.pageX + "y=" + e.pageY );
    }
  });
});

function getSelectedText(){
  var ranges=[];
  if(window.getSelection){
    // let sel=window.getSelection();
//     for(var i = 0; i < sel.rangeCount; i++) {
//  ranges[i] = sel.getRangeAt(i);
//  console.log(ranges[i]);
// }
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

function getSelectedCoords(win) {
    win = win || window;
    var doc = win.document;
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }
                x = rect.left;
                y = rect.top;
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild( doc.createTextNode("\u200b") );
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return { x: x, y: y };
}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'file.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);

}

// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    //jsonresponse = JSON.parse(response);

    // Assuming json data is wrapped in square brackets as Drew suggests
    //console.log(jsonresponse[0].name);

});

// 5-apr
$(function(){
  var tooltipDiv= $("#tooltipDiv");
  var meaningTip= new Opentip(tooltipDiv, {showOn: null,
                                           style: 'dark',
                                           hideTrigger: 'closeButton',
                                           stem: false,
                                           fixed: true,
                                           shadow: true});
  meaningTip.hide();
  $('#viewerContainer').bind('mouseup', function(e){
    var getText= getSelectedText();
    let feedText= getText.toString().toUpperCase();
    // var coords= getSelectedCoords();
    if(getText.toString()){
      getText= $.trim(getText.toString());
      console.log('"' + getText.toString() + '"' + " are selected ");
      // console.log("coords-x : " +  coords.x + ",coords-y :  " + coords.y);
      // var tipDiv = document.createElement("div");
      // var tip= document.createElement("div");
      // var tipText= document.createElement("span");
      // var node= document.createTextNode(getText.toString());
      // tipText.appendChild(node);
      // tipText.setAttributes(elem,{'position':'relative',
      //                             'top': coords.x,
      //                             'left': coords.y,
      //                             'background-color': #555});
    // tip.appendChild(tipText);
    // tipDiv.appendChild(tip);
    // document.getElementById('viewerContainer').appendChild(tipDiv);
    // Call to function with anonymous callback

    loadJSON(function(response) {
        // Do Something with the response e.g.
        jsonresponse = JSON.parse(response);
        // Assuming json data is wrapped in square brackets as Drew suggests
        if(jsonresponse[feedText]){
          console.log(jsonresponse[feedText]);
        }
        else {
          console.log("word has no definition");
        }
        meaningTip.setContent= "jsonresponse[feedText]";
        meaningTip.show();


    });
    }
  });
});

Opentip.styles.myErrorStyle = {
  extend : 'alert',
  target: true,
  fixed: false,
  stem: true,
  hideTrigger : 'closeButton'
};
var notFoundTip= new Opentip(tooltipDiv, {style : myErrorStyle});

notFoundTip.hide();
notFoundTip.setContent(definition);
notFoundTip.show();
