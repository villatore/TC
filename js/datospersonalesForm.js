function MuestraEntrega(){
    if (!$ge('mismodomv').checked) {
        expandElem('domicilioEntregav');
        //$ge('domicilioEntregav').value = $ge('domiciliov').value
    } else
        collapseElem('domicilioEntregav');
}

function collapseElem(obj){
	var el = document.getElementById(obj);
	el.style.display = 'none';
	el.style.visibility = 'hidden';
}

function expandElem(obj){
	var el = document.getElementById(obj);
	el.style.display = '';
	el.style.visibility = '';
}

// collapse all elements, except the first one
function collapseAll()
{
	var numFormPages = 1;

	for(i=2; i <= numFormPages; i++)
	{
		currPageId = ('mainForm_' + i);
		collapseElem(currPageId);
	}
}

function validateField(fieldId, fieldType, required)
{
	fieldObj = document.getElementById(fieldId);

	if(fieldType == 'text'  ||  fieldType == 'textarea'  ||  fieldType == 'password'  ||  fieldType == 'file'  ||  fieldType == 'phone'  || fieldType == 'website')
	{
	    if (required == 1 && fieldObj.value == '') {
	        fieldObj.setAttribute("class", "mainFormError");
	        fieldObj.setAttribute("className", "mainFormError");
	        fieldObj.focus();
	        return false;
	    } else {
	        fieldObj.setAttribute("class", "mainForm");
	        fieldObj.setAttribute("className", "");
	    }
	}
	else if(fieldType == 'menu'  || fieldType == 'country'  || fieldType == 'state')
	{	
		if(required == 1 && fieldObj.selectedIndex == 0)
		{				
			fieldObj.setAttribute("class","mainFormError");
			fieldObj.setAttribute("className","mainFormError");
			fieldObj.focus();
			return false;					
		}

	}
	else if(fieldType == 'email')
	{	
		if((required == 1 && fieldObj.value=='')  ||  (fieldObj.value!=''  && !validate_email(fieldObj.value)))
		{				
			fieldObj.setAttribute("class","mainFormError");
			fieldObj.setAttribute("className","mainFormError");
			fieldObj.focus();
			return false;					
	    } else {
	        fieldObj.setAttribute("class", "mainForm");
	        fieldObj.setAttribute("className", "");
	    }
	}
	return true;
}

function validate_email(emailStr){		
	apos=emailStr.indexOf("@");
	dotpos=emailStr.lastIndexOf(".");

	if (apos<1||dotpos-apos<2) 
		return false;
	else
		return true;
}


function validateDate(fieldId, fieldBoxId, fieldType, required,  minDateStr, maxDateStr)
{
	retValue = true;

	fieldBox = document.getElementById(fieldBoxId);
	fieldObj = document.getElementById(fieldId);	
	dateStr = fieldObj.value;


	if(required == 0  && dateStr == '')
		return true;


	if(dateStr.charAt(2) != '/'  || dateStr.charAt(5) != '/' || dateStr.length != 10)
	{
		retValue = false;
	}	

	else	// format's okay; check max, min
	{
		currDays = parseInt(dateStr.substr(0,2),10) + parseInt(dateStr.substr(3,2),10)*30  + parseInt(dateStr.substr(6,4),10)*365;
		//alert(currDays);

		if(maxDateStr != '')
		{
			maxDays = parseInt(maxDateStr.substr(0,2),10) + parseInt(maxDateStr.substr(3,2),10)*30  + parseInt(maxDateStr.substr(6,4),10)*365;
			//alert(maxDays);
			if(currDays > maxDays)
				retValue = false;
		}

		if(minDateStr != '')
		{
			minDays = parseInt(minDateStr.substr(0,2),10) + parseInt(minDateStr.substr(3,2),10)*30  + parseInt(minDateStr.substr(6,4),10)*365;
			//alert(minDays);
			if(currDays < minDays)
				retValue = false;
		}
	}

	if(retValue == false)
	{
		fieldObj.setAttribute("class","mainFormError");
		fieldObj.setAttribute("className","mainFormError");
		fieldObj.focus();
		return false;
	}
}

function validaPagina()
{
	retVal = true;
	if (!validateField('nombrev', 'text', 1)) retVal = false;
	if (!validateField('rfcv', 'text', 0)) retVal = false;
    if (!validateField('domiciliov', 'textarea', 1)) retVal=false;
    if (!validateField('telv', 'phone', 1)) retVal=false;
    if ($ge('mailv').value != '')
        if (!validateField('mailv', 'email', 1)) retVal = false;
    if (!$ge('mismodomv').checked)
        if (!validateField('domicilioEntregav', 'textarea', 1)) retVal = false;
//                if (validateField('field_4','fieldBox_4','checkbox',1) == false)
//                 retVal=false;
//                if (validateField('field_5','fieldBox_5','radio',1) == false)
//                 retVal=false;
//                if (validateDate('field_6','fieldBox_6','date',1,'','') == false)
//                 retVal=false;
//                if (validateField('field_7','fieldBox_7','password',1) == false)
//                 retVal=false;
//                if (validateField('field_8','fieldBox_8','file',1) == false)
//                 retVal=false;
//                if (validateField('field_9','fieldBox_9','email',1) == false)
//                 retVal=false;
//                if (validateField('field_10','fieldBox_10','phone',1) == false)
//                 retVal=false;
//                if (validateField('field_11','fieldBox_11','website',1) == false)
//                 retVal=false;
//                if (validateField('field_12','fieldBox_12','country',1) == false)
//                 retVal=false;
//                if (validateField('field_13','fieldBox_13','state',1) == false)
//                 retVal=false;

	if(retVal == false)
	{
	    alert(EtiquetaReturn("#msjValidaForma"));
		return false;
	}
	return retVal;
}
function Almacena() {
    if (validaPagina()) {
        var DatosPersonales = JSON.parse("{}");
        DatosPersonales.nombrev = $ge('nombrev').value;
        DatosPersonales.rfcv = $ge('rfcv').value;
        DatosPersonales.domiciliov = $ge('domiciliov').value;
        DatosPersonales.domicilioEntregav = $ge('domicilioEntregav').value;
        DatosPersonales.mailv = $ge('mailv').value;
        DatosPersonales.telv = $ge('telv').value;
        DatosPersonales.celv = $ge('celv').value;

        //se carga el carrito de la tienda, para poder agregarle
        //var CarritoTienda = JSON.parse(localStorage.getItem(Partesurl[i]));
        window.localStorage.setItem("ToruzCart_Persona", JSON.stringify(DatosPersonales));
        $ge("AvisoSalvado").innerHTML = "Sus datos fueron almacenados, gracias";
    }
}
function CargaInfoDP() {
    var DatosPersonales = JSON.parse(localStorage.getItem('ToruzCart_Persona'));
     $ge('nombrev').value = DatosPersonales.nombrev;
     $ge('rfcv').value = DatosPersonales.rfcv;
     $ge('domiciliov').value = DatosPersonales.domiciliov;
     $ge('domicilioEntregav').value = DatosPersonales.domicilioEntregav;
     $ge('mailv').value = DatosPersonales.mailv;
     $ge('telv').value = DatosPersonales.telv;
     $ge('celv').value = DatosPersonales.celv;
     if (DatosPersonales.domiciliov == DatosPersonales.domicilioEntregav)
         $ge('mismodomv').checked = true;
     else
         $ge('mismodomv').checked = false;
     MuestraEntrega();
}