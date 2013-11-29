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
    $("#cantidad")[0].innerHTML = 0;
    $("#precio").html(0);
    $("#unidad").html("");
    Resta();
    Producto = null;
}
function Muestra() {
    $.mobile.changePage('#paymentsDetails');
    var target_div = "#contents";
    $(target_div).html("");
    var url = $("#qrSKU")[0].value;
    readSinglePost(url, target_div);

    function readSinglePost(URL, target_div) {
        $("#title").html("");
        escribeEstado("Consultando .... ");
        $("#cantidad")[0].innerHTML = 1;
        Resta();
console.log('a.............' + URL);

//var xhr = new XMLHttpRequest();
//xhr.onload = function(e) {
//    // Build a list and append it to the document's body.
//}
//xhr.open('GET', 'http://foo.example/data.json');
//xhr.send(null);

        $.ajax({
            url: URL,
            typ2e: 'GET',
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
                        $("#title").html("<a style='color:#FF0000'>No se pudo leer el artículo...</a>");
                        ExisteProducto = false;
                    }


                    if (Post != undefined){
                        $("#title").html(Post.title);
                        //$("#imgs").src=Post.thumbnail.replace(/"\"/g,"");
                        document.getElementById("imgs").src=Post.thumbnail.replace(/"\"/g,"");
console.log(Post.thumbnail.replace(/"\"/g,""));
console.log("src: --" + document.getElementById("imgs").src);
                        $(target_div).append(Post.content);
                        $(target_div).append("<small>" + Post.date + "</small>");
                        $("#precio").html(Post.id);
                        $("#unidad").html(Post.comment_status);
                        $("#categoria").html(Post.taxonomy_product_cat[0].title);
                        Resta();
                        escribeEstado("");
                        ExisteProducto = true;
                        Producto = Post;
                     }

//                    if (data.post != undefined){
//                        $("#title").html(data.post.title);
//                        $(target_div).append(data.post.content);
//                        $(target_div).append("<small>" + data.post.date + "</small>");
//                        $("#precio").html(data.post.id);
//                        $("#unidad").html(data.post.comment_status);
//                        Resta();
//                        escribeEstado("");
//                        ExisteProducto = true;
//                        Producto = data;
//                    } else if (data.page != undefined){
//                        $("#title").html(data.page.title);
//                        $(target_div).append(data.page.content);
//                        $(target_div).append("<small>" + data.page.date + "</small>");
//                        $("#precio").html(data.page.custom_fields.mp_sale_price);
//                        $("#unidad").html(data.page.excerpt);
//                        Resta();
//                        escribeEstado("");
//                        ExisteProducto = true;
//                        Producto = data;
//                    } else {
//                        LimpiaProducto();
//                        $("#title").html("<a style='color:#FF0000'>No se pudo leer el artículo...</a>");
//                        ExisteProducto = false;
//                    }



                } else {
                    LimpiaProducto();
                    $("#title").html("<a style='color:#FF0000'>Está información no fue encontrada, consulte a su asesor...</a>");
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