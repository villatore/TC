var l8n = {
    "en-US": {
        "#version": "Version 0.0.1en-Ene 31 2014",
        "#ajustes": "Settings",
        "#per": "Rol",
        "#sal" : "Exit",
        "#ttipnombre": "Tooltip test..."
    },
    "es": { //español
    },
    "es-419": { //español - latinoamerica
        "#version": "Version 0.0.1es-Ene 31 2014",
        "#ajustes": "Ajustes",
        "#per": "Perfil",
        "#sal" : "Salida",
        "#ttipnombre": "Prueba del Tooltip..."
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
}
function Etiqueta(key) {
    var lenguaje = "en-US"; //idioma por default
    var i = 0;
    if (l8n[window.navigator.language])
        lenguaje = window.navigator.language;

    /*Probar esto
    for (i = 0; size_object(l8n[lenguaje]); i++) {
    var key = l8n[lenguaje][i];
    document.querySelector(key).textContent = l8n[lenguaje][key];
    }*/

    if (window.navigator && l8n[lenguaje]) {
        document.querySelector(key).textContent = l8n[lenguaje][key];
    }
}
/**
 *
 * Returns an element specified by elementId. Similar to (but not exactly like) jQuery's $()
 *
 */
function $ge(elementId)
{
  return document.getElementById(elementId);
}
