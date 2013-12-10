function Resta() {
    var Cantidad = parseInt($("#cantidad")[0].innerHTML);
    if (Cantidad > 1) $("#cantidad")[0].innerHTML = Cantidad - 1
    $("#total")[0].innerHTML = parseInt($("#cantidad")[0].innerHTML) * parseInt($("#precio")[0].innerHTML);
}
function Suma() {
    var Cantidad = parseInt($("#cantidad")[0].innerHTML);
    $("#cantidad")[0].innerHTML = Cantidad + 1;
    $("#total")[0].innerHTML = addCommas(parseInt($("#cantidad")[0].innerHTML) * parseInt($("#precio")[0].innerHTML));
}
function LimpiaProducto() {
    $("#categoria").html("");
    $("#titulo").html("");
    document.getElementById("imgs").src = "";
    $("#descripcion").html("");
    $("#contenido").html("");
    $("#actualizacion").html("");
    $("#precio").html("0");
    $("#unidad").html("");
    Resta();
    Producto = null;
}
function Muestra() {
    $.mobile.changePage('#paymentsDetails');
    readSinglePost($("#qrSKU")[0].value);

    function readSinglePost(Ruta) {
        LimpiaProducto();
        escribeEstado("Consultando .... ");
        Resta();

        $.ajax({
            crossDomain: false,
            xhrFields: { withCredentials: false },
            type: 'POST',
            url: Ruta + "&jsoncallback=a12345",
            dataType: 'json',
            success: function (data) {
                if (data.status != "error") {
                    var Post;
                    if (data.post != undefined){
                        Post=data.post;
                    } else if (data.page != undefined){
                        Post=data.page;
                    } else {
                        LimpiaProducto();
                        $("#titulo").html("<a style='color:#FF0000'>No se pudo leer el artículo...</a>");
                        ExisteProducto = false;
                    }

                    if (Post != undefined){
                        $("#categoria").html(Post.taxonomy_product_cat[0].title);
                        $("#titulo").html(Post.title);
                        document.getElementById("imgs").src=Post.thumbnail.replace(/"\"/g,"");
                        $("#descripcion").html(Post.excerpt);
                        $("#contenido").append(Post.content);
                        $("#contenido").append("<small>" + Post.date + "</small>");
                        $("#actualizacion").html("Ultima actualizacion: " + Post.modified);
//                        $("#precio").html(data.page.custom_fields.mp_sale_price);
                        $("#precio").html(addCommas(Post.id));
                        $("#unidad").html(Post.comment_status);
                        Resta();
                        escribeEstado("");
                        ExisteProducto = true;
                        Producto = Post;
                     }

                } else {
                    LimpiaProducto();
                    $("#titulo").html("<a style='color:#FF0000'>Esta informacion no fue encontrada, consulte a su asesor...</a>");
                    ExisteProducto = false;
                }
                escribeEstado("");
            } //fin sucess
        }).fail(function (data) {
console.log('falla.............'  + data);
            ExisteProducto = false;
            if (console && console.log) {
                escribeEstado("<a style='color:#FF0000'>Error al conectarse al servidor</a>");
            }
        });

}; // fin readSinglePost

    function escribeEstado(Texto) {
        $("#estado").html(Texto);
    }
};

function AgregaCarro() {
    if (!ExisteProducto) {
        escribeEstado("<a style='color:#FF0000'>No tiene un pruducto que agregar</a>");
        return;
    }
        
    //Se busca a que tienda pertenece la mercancia para tener carritos por tienda.
    var Partesurl = Producto.url.split("/");
    for (var i = 0; i < Partesurl.length; i++) {
        if (Partesurl[i].indexOf(".com") > 0)
            break;
    }
    //se carga el carrito de la tienda, para poder agregarle
    var CarritoTienda = JSON.parse(localStorage.getItem(Partesurl[i]));
    if (CarritoTienda === null || CarritoTienda === undefined)
        CarritoTienda = [];
    //Se limpian campos que no se usan para simplificar el almacenamiento local
    Producto.author = "";
    Producto.taxonomy_product_type = "";
    Producto.MovilGuardado = new Date();
    Producto.MovilCantidad = $("#cantidad")[0].innerHTML;
    CarritoTienda.push(Producto);

    //Se almacena el producto dentro de la Tienda (url) para distinguir de que tienda es el producto
    window.localStorage.setItem(Partesurl[i], JSON.stringify(CarritoTienda));
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