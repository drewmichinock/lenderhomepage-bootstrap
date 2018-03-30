/* version 0.62 By Sean Madden */

addOnload(fieldSelecter);
addOnload(clearinput);


function addOnload(newFunction) {
	var oldOnload = window.onload;	
	
	if (typeof oldOnload == "function") {
		window.onload = function() {
			if (oldOnload) {
				oldOnload();
			}
			newFunction();
		}
	}
	else {
		window.onload = newFunction;
	}
	
}

function clearinput() {
		for (var i=0; i<document.getElementsByTagName('input').length; i++) {
			if (document.getElementsByTagName('input')[i].value != "") {
				valueSave(document.getElementsByTagName('input')[i]);
			}
		}
	
	
	function valueSave(thisInput) {
		if(thisInput.getAttribute("type") != "submit"){
			thisInput.onfocus = clicked;
			thisInput.onblur = unclicked;
			thisInput.tmpVal = thisInput.value;

		}
	}
	
	function clicked() {
		if(this.value === findAttributeVal(this)) {
			this.value = '';
		}
	}
	
	function unclicked() {
		if(this.value === "") {
			this.value = findAttributeVal(this);
		}
	}

}

function fieldSelecter(){
	var forms = document.getElementsByTagName("form");
	
	for(i=0; i<forms.length; i++){
		var ieVers = getInternetExplorerVersion();
		if(ieVers > -1 && ieVers < 9) {
			forms[i].reset();
		}
		forms[i].onsubmit = function(){return checkfields(this);}
	}
	

	function checkfields(currForm){
		var fields;
		var fieldname;
		var currClasses;
		fields = currForm.getElementsByTagName("*");
		
		for(j=0; j<fields.length; j++){
			currClasses = fields[j].className;
			fieldname = fields[j].name;
                        if(fieldname){
				fieldname = fieldname.toLowerCase();
			}
                        curFieldsHTML = fields[j].outerHTML.toLowerCase();
                        if(fields[j].tagName == 'INPUT' || fields[j].tagName == 'SELECT' || fields[j].tagName == 'TEXTAREA'){
                            if(curFieldsHTML.indexOf('required') > -1 ||  checkForReq(currClasses) > 0){
                                    var noUnderScore = fields[j].name.replace(/_/g, " ");
                                    if(fields[j].value === "" || fields[j].value === findAttributeVal(fields[j])){
                                            fields[j].focus();
                                            alert(noUnderScore + " is empty");
                                            return false;
                                    } else if(fieldname) {
                                            if(fieldname.indexOf("email") > -1){
                                                    if (!validateEmail(fields[j].value)){
                                                            fields[j].focus();
                                                            alert(noUnderScore + " is invalid");
                                                            return false;
                                                    }
                                            } else if (fieldname.indexOf("phone") > -1) {
                                                    if (!validatePhone(fields[j].value)){
                                                            fields[j].focus();
                                                            alert(noUnderScore + " is invalid");
                                                            return false;
                                                    }
                                            }
                                    }
                            }
                        }
		}
		 return true;
	}
	
	function checkForReq(currClasses){
		var classes;
		var returnvalue = false;
		classes = currClasses.split(" ");
		for(h=0; h<classes.length; h++){
			if(classes[h] === "req"){
			 returnvalue = true;	
			}
			
		}

		return returnvalue;
	}
	
	function validateEmail(email){
		var emailPattern = new RegExp(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}/);
		return emailPattern.test(email);
	}
	
	function validatePhone(phone){
		var numbersOnly = phone.replace(/\D/g, "");
		if (numbersOnly.length > 9){
			return true;
		}
		return false;
	}
}


function findAttributeVal(curNode) {
	var version 
	version = getInternetExplorerVersion();
	if (version > -1 && version <= 8) {
		return curNode.tmpVal;
	}
	else {
		return curNode.getAttribute("value");
	}
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat(RegExp.$1);
  }
  return rv;
}
