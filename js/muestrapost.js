function Resta() {
    var Cantidad = parseInt($("#cantidad")[0].innerHTML);
    if (Cantidad > 1) $("#cantidad")[0].innerHTML = Cantidad - 1
    $("#total")[0].innerHTML = parseInt($("#cantidad")[0].innerHTML) * parseInt($("#precio")[0].innerHTML);
}
function Suma() {
    var Cantidad = parseInt($("#cantidad")[0].innerHTML);
    $("#cantidad")[0].innerHTML = Cantidad + 1;
    $("#total")[0].innerHTML = parseInt($("#cantidad")[0].innerHTML) * parseInt($("#precio")[0].innerHTML);
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

    function readSinglePost(URL) {
        LimpiaProducto();
        escribeEstado("Consultando .... ");
        Resta();

//var xhr = new XMLHttpRequest();
//xhr.onload = function(e) {
//    // Build a list and append it to the document's body.
//}
//xhr.open('GET', 'http://foo.example/data.json');
//xhr.send(null);

        $.ajax({
            url: URL,
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
                        $("#precio").html(Post.id);
                        $("#unidad").html(Post.comment_status);
                        Resta();
                        escribeEstado("");
                        ExisteProducto = true;
                        Producto = Post;
console.log('el valor del post.............'  + Post);
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
                escribeEstado("Error al conectarse al servidor");
            }
        });
    };
    function escribeEstado(Texto) {
        $("#Estado").html(Texto);
    }
};

function AgregaCarro() {
    window.localStorage.setItem("Producto", Producto.url);
    return;
        var jsonUser = {  id: json.userId,
                            user: json,
                            ventas: json.ventas,
                            comisiones: json.comisiones
                        };
        delete jsonUser.user['ventas'];
        delete jsonUser.user['comisiones'];
        window.localStorage.setItem("userFirst",JSON.stringify(jsonUser)); // para MongoDB
        window.localStorage.setItem("uuid",device.uuid);
        window.localStorage.setItem("ventas",JSON.stringify(jsonUser.ventas));
        window.localStorage.setItem("comisiones",JSON.stringify(jsonUser.comisiones));
        delete json['ventas'];
        delete json['comisiones'];
        window.localStorage.setItem("user",JSON.stringify(json));
};
var ExisteProducto = false;
var Producto;