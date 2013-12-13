function CargaCarro() {
    alert("ddd");
    return;
    if (!ExisteProducto) {
        escribeEstado("<a style='color:#FF0000'>No tiene un pruducto que agregar</a>");
        return;
    }

    //Se limpian campos que no se usan para simplificar el almacenamiento local
    Producto.author = "";
    Producto.taxonomy_product_type = "";
    Producto.MovilGuardado = new Date();
    Producto.MovilCantidad = $("#cantidad")[0].innerHTML;
        
    //Se busca a que tienda pertenece la mercancia para tener carritos por tienda.
    var Partesurl = Producto.url.split("/");
    var nombreCarrito = "";
    for (var i = 0; i < Partesurl.length; i++) {
        if (Partesurl[i].indexOf(".com") > 0) {
            nombreCarrito = Partesurl[i];
            break;
        }
    }
    //se carga el carrito de la tienda, para poder agregarle
    var CarritoTienda = JSON.parse(localStorage.getItem(Partesurl[i]));
    //se valida si tiene contenido
    if (CarritoTienda === null || CarritoTienda === undefined)
        CarritoTienda = [];
    else {
        var Actualizado = false;
        for (var i = 0; i < CarritoTienda.length; i++) {
            if (CarritoTienda[i].url == Producto.url) {
                if (confirm("Ya tiene un producto igual en su carrito con '" + CarritoTienda[i].MovilCantidad + "' ¿desea agregar '" + Producto.MovilCantidad + "'?")) {
                    CarritoTienda[i].MovilCantidad = parseInt(CarritoTienda[i].MovilCantidad) + parseInt(Producto.MovilCantidad);
                    Actualizado = true;
                }
            }
        }
    }
    //Si no se actualizó la cantidad del producto a agregar al carrito, quiere decir que el producto no existía y se agrega por primera vez
    if (!Actualizado)
        CarritoTienda.push(Producto);

    //Se almacena el producto dentro de la Tienda (url) para distinguir de que tienda es el producto
    window.localStorage.setItem(nombreCarrito, JSON.stringify(CarritoTienda));
    $("#AvisoCarroAdd")[0].innerHTML = "Su producto se agrego al carrito, gracias";
};
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

var ExisteProducto = false;
var Producto;
/***********
http://objectmix.com/xml-soap/307425-access-denied-xmlhttp-request.html

http://forums.kayako.com/threads/permission-denied-to-call-method-xmlhttprequest-open.3367/page-1

http://www.webdeveloper.com/forum/showthread.php?t=147342

*******/