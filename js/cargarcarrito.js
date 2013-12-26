function CargaCarro() {
    //se carga el carrito de la tienda, para poder agregarle, un nuevo carrito si se requiere
    var Carritos = JSON.parse(localStorage.getItem("ToruzCart"));
    //se valida si tiene contenido
    if (Carritos === null || Carritos === undefined) {
        $("#listaCarrito").append("No tiene productos en el carrito..");
    } else {
        //se enlista todas las tiendas que se tengan almacenadas, por default solo sería una
        for (var i = 0; i < Carritos.length; i++) {
            var t = JSON.parse(Carritos[i]).Nombre;
            $("#listaCarrito").html("");
            $("#listaCarrito").append("<h4>" + t + "</h4>");
            //Se muestran los productos de la tienda
            var ProdsCarrito = JSON.parse(localStorage.getItem(t));
            if (ProdsCarrito === null || ProdsCarrito === undefined) {
                $("#listaCarrito").append("No tiene productos en la tienda '<strong>" + t + "</strong>'");
            } else {
                var contenidoP = ""; var TP = 0.0;
                contenidoP = contenidoP + "<table data-role='listview' width='50%' border=0>";
                for (var i = 0; i < ProdsCarrito.length; i++) {
                    var P = ProdsCarrito[i];
                    contenidoP = contenidoP + "<tr><td width='5%'>";
                    contenidoP = contenidoP + "<a onclick=MuestraP('" + P.url + "'," + P.MovilCantidad + "); data-transition='slide' class='icon-search' style='font-size: 20px'></a></td>";
                    contenidoP = contenidoP + "<td width='10%'>" + P.title.trim() + "</td>"; //nombre P
                    contenidoP = contenidoP + "<td width='10%'>$" + addCommas(P.id) + "</td>"; //Precio P
                    contenidoP = contenidoP + "<td width='10%'>" + P.MovilCantidad + " " + P.comment_status + "</td>"; //unidades y medida
                    contenidoP = contenidoP + "<td width='10%'>$" + addCommas(parseInt(P.id) * parseInt(P.MovilCantidad)) + "</td>"; //Total P
                    TP = TP + parseInt(P.id) * parseInt(P.MovilCantidad);
                    var d = new Date(P.MovilGuardado);
                    contenidoP = contenidoP + "<td width='10%'>" + d.getDate() + "-" + (parseInt(d.getMonth()) + 1) + "-" + d.getFullYear() + "</td></tr>"; //Fecha actualizacion P
                } //end for
                contenidoP = contenidoP + "</table>";
                contenidoP = contenidoP + "<strong>Total de la compra: $" + addCommas(TP) + " </strong>";
                $("#listaCarrito").append(contenidoP);
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
    //$.mobile.changePage('#paymentsDetails');
}