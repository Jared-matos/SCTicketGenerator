// takes input from the pastebox field and places it in the proper field
function parseData(){
  // get data from pastebox and split it by row 
  var pasteData = document.getElementById("pasteBox").value;
  var pasteDataARR = pasteData.split(/\r?\n/);
  var i = 0;
  //verify valid paste input
  if(pasteDataARR[2]=='Field	Value	'){
    // go through each row and see if it starts with a known text, if so add that to the table in correct field
    for(f=0;f<pasteDataARR.length;f++){
      if(pasteDataARR[f].search("Member ID")==0){
        document.getElementById("mbrIDText").value = pasteDataARR[f].slice(10);
      } else if(pasteDataARR[f].search("Name")==0){
        while (pasteDataARR[f].charAt(i) !== "("){i++;}
          document.getElementById("mbrNameText").value = pasteDataARR[f].slice(5,i);
          document.getElementById("mbrDOB").value = pasteDataARR[f].slice(i+6,i+16);
      } else if(pasteDataARR[f].search("Provider")==0){
        i=9;
        while(pasteDataARR[f].charAt(i) !== " "){i++}
        document.getElementById("provIDText").value = pasteDataARR[f].slice(9,i);
        document.getElementById("provNamesText").value = pasteDataARR[f].slice(i+2);
      } else if(pasteDataARR[f].search("Site")==0){
        i=5;
        while(pasteDataARR[f].charAt(i) !== " "){i++}
        document.getElementById("siteID").value = pasteDataARR[f].slice(5,i);
      } else if(pasteDataARR[f].search("Dates Of Service")==0){
        document.getElementById("dos").value = pasteDataARR[f].slice(17);
      } else if(pasteDataARR[f].search("Procedure")==0){
        document.getElementById("pCode").value = pasteDataARR[f].slice(11);
      } else if(pasteDataARR[f].search("DecisionCodes")==0){
        document.getElementById("dCode").value = pasteDataARR[f].slice(14);
      } else if(pasteDataARR[f].search("Member")==0){
        i=0;
        while(pasteDataARR[f].charAt(i) !== "("){i++}
        document.getElementById("mbrNameText").value = pasteDataARR[f].slice(7,i);
        while(pasteDataARR[f].charAt(i) !== ":"){i++}
        var startID = i+2;
        while(pasteDataARR[f].charAt(i) !== ")"){i++}
        document.getElementById("mbrIDText").value = pasteDataARR[f].slice(startID,i);
      }
    }
  } else {
    alert('Paste invalid. Please paste directly fron FlexCare.');
  }
  document.getElementById("pasteBox").value = "";
}

// Sends HTML from page to new window
function openNewWindow(){
    var divText = document.getElementById('tDiv').innerHTML;
    var myWindow = window.open('', '', 'width=425,height=500');
    var doc = myWindow.document;
    doc.open();
    doc.write('<!DOCTYPE html>\
        <head>\
        <title>SC Ticket Generator</title>\
        <link rel="stylesheet" href="./SCTicketStyle.css" type="text/css">\
        </head>\
        <div id="tDiv">');
    doc.write(divText);
    doc.write('</div>\
    <script src="SCTicketScript.js"></script>');
    doc.close();
}

async function copiedSuccessMessage() {
  document.getElementsByClassName("popup")[0].style.display = 'block';
  document.getElementsByClassName("popupText")[0].style.opacity = 1;
  document.getElementsByClassName('popupText')[0].style.visibility = 'visible';
  await sleep(3000);
  document.getElementsByClassName("popup")[0].style.display = 'none';
  document.getElementsByClassName("popupText")[0].style.opacity = 0;
  document.getElementsByClassName('popupText')[0].style.visibility = 'visible';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Adds or removes textbox for "was there an update?" checkbox
function toggleUpdateField() {
  if (document.getElementById("updateBox").checked == false) {
    document.getElementById("updateSpan").style.display = "none";
    document.getElementById("updateText").style.display = "none";
    document.getElementById("tDiv").style.height = "320px";
  } else {
    document.getElementById("updateSpan").style.display = "table-cell";
    document.getElementById("updateText").style.display = "table-cell";
    document.getElementById("tDiv").style.height = "350px";
  }
}

//Sets vaules of all fields to empty or false
function clearAll() {
  document.getElementById("mbrIDText").value = "";
  document.getElementById("mbrNameText").value = "";
  document.getElementById("mbrDOB").value = "";
  document.getElementById("provIDText").value = "";
  document.getElementById("provNamesText").value = "";
  document.getElementById("siteID").value = "";
  document.getElementById("updateBox").checked = false;
  document.getElementById("updateText").value = "";
  document.getElementById("dos").value = "";
  document.getElementById("pCode").value = "";
  document.getElementById("dCode").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("reason").value = "";
}

// Collects the information from the fields, combines them into an output string, and sends to the clipboard
function copyClipboard() {
  // collecting information from all the fields & generating output and error texts
  var MBRID = document.getElementById("mbrIDText").value;
  var MBRNAME = document.getElementById("mbrNameText").value;
  var MBRDOB = document.getElementById("mbrDOB").value;
  var PROVID = document.getElementById("provIDText").value;
  var PROVNAME = document.getElementById("provNamesText").value;
  var SITEID = document.getElementById("siteID").value;
  var URadio = document.getElementById("updateBox").checked;
  var UTEXT = document.getElementById("updateText").value;
  var DOS = document.getElementById("dos").value;
  var PROC = document.getElementById("pCode").value;
  var DCODE = document.getElementById("dCode").value;
  var DESC = document.getElementById("desc").value;
  var REAS = document.getElementById("reason").value;
  var outputText = "";
  var errors = "";
  // combining all the data into a single string, any empty required fields are added to error text
  outputText = outputText.concat("Member Demos:", "\r\n");
  if (MBRID !== "") { outputText = outputText.concat("ID: ", MBRID, "\r\n");} else {errors=errors.concat("Member ID, ");}
  if (MBRNAME !== "") { outputText = outputText.concat("Name: ", MBRNAME, "\r\n");} else {errors=errors.concat("Member Name, ");}
  if (MBRDOB !== "") { outputText = outputText.concat("DOB: ", MBRDOB, "\r\n");}
  outputText = outputText.concat("\r\n", "Provider Demos: ", "\r\n");
  if (PROVID !== "") { outputText = outputText.concat("Provider ID: ", PROVID, "\r\n");} else {errors=errors.concat("Provider ID, ");}
  if (PROVNAME !== "") { outputText = outputText.concat(PROVNAME);} else {errors=errors.concat("Provider/Facility Name, ");}
  if (PROVNAME !== "" && SITEID !== "") { outputText = outputText.concat(" - ");}
  if (SITEID !== "") { outputText = outputText.concat(SITEID);}
  outputText = outputText.concat("\r\n", "\r\n");
  if (URadio == true) { outputText = outputText.concat("Update Occurred: ", UTEXT, "\r\n");
  } else { outputText = outputText.concat("No Update Occurred", "\r\n");}
  if (DOS !== "") { outputText = outputText.concat("DOS: ", DOS, "\r\n");} else {errors=errors.concat("Date of Service, ");}
  if (PROC !== "") { outputText = outputText.concat("Procedure Code: ", PROC, "\r\n");} else {errors=errors.concat("Procedure Code, ");}
  if (DCODE !== "") { outputText = outputText.concat("Decision Code: ", DCODE, "\r\n");}
  if (DESC !== "") { outputText = outputText.concat("Description: ", DESC, "\r\n");}
  if (REAS !== "") { outputText = outputText.concat("Reason for Ticket: ", REAS, "\r\n");} else {errors=errors.concat("Reason for Ticket");}
  // checking error text string to verify all needed information filled out 
  if (errors == ""){
    // displays the output text box momentarily and fills it with the output text
    document.getElementById("oText").style.display = "block";
    document.getElementById("oText").value = outputText;
    // select and copy the information in the output text box, then hides the information again
    var copyTextarea = document.getElementById("oText");
    copyTextarea.focus();
    copyTextarea.select();
    try { 
      document.execCommand("copy");
      copiedSuccessMessage();
    } catch (err) { 
      alert("Oops, unable to copy");
    }
    document.getElementById("oText").style.display = "none";
  } else {
    var errorText = "Please fill out: ";
    errorText = errorText.concat(errors);
    alert(errorText);
  }
}