var l8n = {
    "en-US": {
        "#version": "Version 0.0.1en-Copyright (C) Feb 13, 2014",
        "#ajustes": "Settings",
        "#per": "Rol",
        "#sal" : "Exit",
        "#ttipnombre": "Please, write your full name as you want appear in the ticket",
        "#ttiprfc": "Please, write your I.D. for the taxes",
        "#AyudaDatosPersonales": "Your data will be used for deliver or ticket",
        "#saveForm": "Save",
        "#msjValidaForma": "Please correct the errors.  Fields marked with red color are required"
    },
    "es": { //espa�ol
    },
    "es-419": { //espa�ol - latinoamerica
        "#version": "Version 0.0.1es- Copyright (C) Feb 13, 2014",
        "#ajustes": "Ajustes",
        "#per": "Perfil",
        "#sal" : "Salida",
        "#ttipnombre": "Favor de escribir su nombre completo, como quiera que aparezca en la factura",
        "#ttiprfc": "Favor de escribir su RFC de forma correcta",
        "#AyudaDatosPersonales": "Sus datos son para facturaci�n o entrega a domicilio",
        "#saveForm": "Salvar",
        "#msjValidaForma": "Por favor capture los datos requeridos, remarcados en rojo"
    },
    "ko": {
        ".email": "",
        ".contactinfo h5": ""
    }
}

function Textos() {
    l8n["es"] = l8n["es-419"];
    PoneEtiquetas();
    EtiquetaTag("footerT", "#version");
    EtiquetaTag("footerT2", "#version");
    EtiquetaTag("footerC", "#version");
}
function Etiqueta(key) {
    var lenguaje = DeterminaIdioma();

    //Si no existe elemento html con id igual a key, no continua
    if (document.querySelector(key) == null) return;
    
    if (window.navigator && l8n[lenguaje]) {
        if (document.querySelector(key).type == "button")
            document.querySelector(key).value = l8n[lenguaje][key];
        else
            document.querySelector(key).textContent = l8n[lenguaje][key];
    }
}
function PoneEtiquetas() {
    var lenguaje = DeterminaIdioma();

    for (var key in l8n[lenguaje]) {
        Etiqueta(key);
    }
}

function EtiquetaTag(control,key) {
    var lenguaje = DeterminaIdioma();

    if (window.navigator && l8n[lenguaje]) {
        $ge(control).innerHTML = l8n[lenguaje][key];
    }
}
function EtiquetaReturn(key) {
    var lenguaje = DeterminaIdioma();

    if (window.navigator && l8n[lenguaje]) {
        return l8n[lenguaje][key];
    }
}
function DeterminaIdioma() {
    //var lenguaje = "en-US"; //idioma por default
    var lenguaje = "es"; //idioma por default
    if (l8n[window.navigator.language]) {
        // quitar para la versi�n final, trabajar� con el idioma del navegador, pero pulir todas las etiquetas html
        //lenguaje = window.navigator.language;
    }
    return lenguaje;
}
/**
*
* Returns an element specified by elementId. Similar to (but not exactly like) jQuery's $()
*
*/
function $ge(elementId){
  return document.getElementById(elementId);
}