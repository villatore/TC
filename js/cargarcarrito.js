function CargaCarro() {
    //se carga el carrito de la tienda, para poder agregarle, un nuevo carrito si se requiere
    var Carritos = JSON.parse(localStorage.getItem("ToruzCart"));
    //se valida si tiene contenido
    if (Carritos === null || Carritos === undefined) {
        $("#listaCarrito").append("No tiene productos en el carrito..");
    } else {
        //se enlista todas las tiendas que se tengan almacenadas, por default solo sería una
        $("#listaCarrito").html("");
        for (var i = 0; i < Carritos.length; i++) {
            var t = JSON.parse(Carritos[i]).Nombre;
            $("#listaCarrito").append("<h4>" + t + "</h4>");
            //Se muestran los productos de la tienda
            var ProdsCarrito = JSON.parse(localStorage.getItem(t));
            if (ProdsCarrito === null || ProdsCarrito === undefined) {
                $("#listaCarrito").append("No tiene productos en la tienda '<strong>" + t + "</strong>'");
            } else {
                if (ProdsCarrito.length <= 0) {
                    $("#listaCarrito").append("No tiene productos en la tienda '<strong>" + t + "</strong>'");
                } else {
                    var contenidoP = ""; var TP = 0.0;
                    contenidoP = contenidoP + "<table data-role='listview' width='70%' border=0>";
                    for (var ii = 0; ii < ProdsCarrito.length; ii++) {
                        var P = ProdsCarrito[ii];
                        contenidoP = contenidoP + "<tr><td width='5%' onclick=MuestraP('" + P.url + "'," + P.MovilCantidad + ");>";
                        contenidoP = contenidoP + "<a onclick=MuestraP('" + P.url + "'," + P.MovilCantidad + "); data-transition='slide' class='icon-search' style='font-size: 20px'></a></td>";
                        contenidoP = contenidoP + "<td width='10%'>" + P.title.trim() + "</td>"; //nombre P
                        contenidoP = contenidoP + "<td width='10%'>$" + addCommas(P.id) + "</td>"; //Precio P
                        contenidoP = contenidoP + "<td width='10%'>" + P.MovilCantidad + " " + P.comment_status + "</td>"; //unidades y medida
                        contenidoP = contenidoP + "<td width='10%'>$" + addCommas(parseInt(P.id) * parseInt(P.MovilCantidad)) + "</td>"; //Total P
                        TP = TP + parseInt(P.id) * parseInt(P.MovilCantidad);
                        var d = new Date(P.MovilGuardado);
                        contenidoP = contenidoP + "<td width='10%'>" + d.getDate() + "-" + (parseInt(d.getMonth()) + 1) + "-" + d.getFullYear() + "</td>"; //Fecha actualizacion P
                        contenidoP = contenidoP + "<td width='5%' onclick=BorrarP('" + t + "'," + ii + "); >";
                        contenidoP = contenidoP + "<a onclick=B2orrarP('" + t + "'," + ii + "); data-transition='slide' class='icon-trash' style='font-size: 20px'></a></td>";
                        contenidoP = contenidoP + "</tr>";
                    } //end for
                    contenidoP = contenidoP + "</table>";
                    contenidoP = contenidoP + "<strong>Total de la compra: $" + addCommas(TP) + " </strong>";
                    $("#listaCarrito").append(contenidoP);
                }
            }
        } //end for
    } //end if

}
function MuestraP(Producto, ProductoC) {
    $("#qrSKU")[0].value = Producto + "?json=get_post&dev=1";
    $("#cantidad")[0].innerHTML = ProductoC;
    Muestra();
    $("#cantidad")[0].innerHTML = ProductoC;
    Suma();
}
function BorrarP(Tienda, Producto) {
    var ProdsCarrito = JSON.parse(localStorage.getItem(Tienda));
    if (!(ProdsCarrito === null || ProdsCarrito === undefined)) {
        ProdsCarrito.splice(Producto, 1);
        //window.localStorage.setItem(Tienda, JSON.stringify(ProdsCarrito));
        CargaCarro();
        $("#AvisoCarroDel")[0].innerHTML = "Su producto se borro del carrito, gracias";
    }
}