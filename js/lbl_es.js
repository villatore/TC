var l8n = {
    "en-US": {
        "#version": "Version 0.0.1en-Copyright (C) Feb 4, 2014",
        "#ajustes": "Settings",
        "#per": "Rol",
        "#sal" : "Exit",
        "#ttipnombre": "Tooltip test...",
        "#AyudaDatosPersonales": "Your data will be used for deliver or ticket",
        "#saveForm": "Save",
        "#msjValidaForma": "Please correct the errors.  Fields marked with red color are required"
    },
    "es": { //español
    },
    "es-419": { //español - latinoamerica
        "#version": "Version 0.0.1es- Copyright (C) Feb 4, 2014",
        "#ajustes": "Ajustes",
        "#per": "Perfil",
        "#sal" : "Salida",
        "#ttipnombre": "Prueba del Tooltip...",
        "#AyudaDatosPersonales": "Sus datos son para facturación o entrega a domicilio",
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
    Etiqueta("#version");
    Etiqueta("#ajustes");
    Etiqueta("#per");
    Etiqueta("#sal");
    Etiqueta("#ttipnombre");
    Etiqueta("#AyudaDatosPersonales");
    Etiqueta("#saveForm");
    EtiquetaTag("footerT", "#version");
    EtiquetaTag("footerT2", "#version");
    EtiquetaTag("footerC", "#version");
}
function Etiqueta(key) {
    var lenguaje = "en-US"; //idioma por default
    if (l8n[window.navigator.language])
        lenguaje = window.navigator.language;

    /*Probar esto
    var i = 0;
    for (i = 0; size_object(l8n[lenguaje]); i++) {
    var key = l8n[lenguaje][i];
    document.querySelector(key).textContent = l8n[lenguaje][key];
    }*/

    if (window.navigator && l8n[lenguaje]) {
        document.querySelector(key).textContent = l8n[lenguaje][key];
        if (document.querySelector(key).type == "button")
            document.querySelector(key).value = l8n[lenguaje][key];
    }
}
function EtiquetaTag(control,key) {
    var lenguaje = "en-US"; //idioma por default
    if (l8n[window.navigator.language])
        lenguaje = window.navigator.language;

    if (window.navigator && l8n[lenguaje]) {
        $ge(control).innerHTML = l8n[lenguaje][key];
    }
}
function EtiquetaReturn(key) {
    var lenguaje = "en-US"; //idioma por default
    if (l8n[window.navigator.language])
        lenguaje = window.navigator.language;

    if (window.navigator && l8n[lenguaje]) {
        return l8n[lenguaje][key];
    }
}
/**
*
* Returns an element specified by elementId. Similar to (but not exactly like) jQuery's $()
*
*/
function $ge(elementId){
  return document.getElementById(elementId);
}