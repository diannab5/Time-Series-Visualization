$(function() {

    $("#buttonHistograma").on("click", function() {

        var taraSelectata = $("#selecteazaTara option").filter(':selected').text();
        var caracteristicaSelectata = $('input[name="caracteristica"]:checked').val();


        var canvas = $("#canvas").get(0);
        var context = canvas.getContext("2d"); //drawing context
        var latime = canvas.width;
        var inaltime = canvas.height;
        context.beginPath();
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#00008b";
        context.rect(0, 0, latime, inaltime);
        context.textAlign = "center"
        context.font = "bold 8px Verdana "
        context.fill();
        context.stroke();


        var vect = new Array();
        var ani = new Array();

        function DeseneazaLinii() {
            context.beginPath();
            context.strokeStyle = "#000000"
            context.lineWidth = 2;
            context.moveTo(7, inaltime - 15);
            context.lineTo(latime - 9, inaltime - 15)
            context.stroke();
            context.moveTo(8, 4);
            context.lineTo(8, inaltime - 15)
            context.stroke();

        }

        function DeseneazaHistograma(date) {
            var nrdate = date.length;
            var w = (latime * 0.96 / nrdate);
            var h = (inaltime)  * 0.9/ Math.max.apply(Math, date) ;
            context.beginPath();
           
            for (var i = 0; i < nrdate; i++) {
                var wi = w * 0.7;
                var hi = h * date[i];
                var x = w * (i+1);
                var y = (inaltime - 20) - hi;

                context.fillStyle='#'+Math.random().toString(16).slice(-3); //random color generator
                context.beginPath();
                context.strokeStyle = "#000000";
                context.rect(x, y, wi, hi);
                context.fill();
                context.stroke();
                context.fillStyle = "#00002D";
                context.fillText(date[i], x + wi/2 , y - 5);
                context.fillText(ani[i], x + wi/2 , inaltime - 5);
              
            }

        }

        function readJson(fisier) {

            $.getJSON(fisier, function(date) {
                var valori = date.values;

                $.each(valori, function(key, value) {
                    ani.push(value.an);

                    if (value.tara === taraSelectata) {
                        if (caracteristicaSelectata == 'hidroelectricitate') {
                            var v = (value.hidroelectricitate/100).toString();
                            vect.push(v);
                        }
                        else if (caracteristicaSelectata == 'energienucleara') {
                            var v = (value.energienucleara/100).toString();
                            vect.push(v);
                        }
                        else if (caracteristicaSelectata== 'petrol') {
                            var v = (value.petrol/1000).toString();
                            vect.push(v);
                        }

                    }
                });

                DeseneazaHistograma(vect);
            });
        }


        readJson("https://api.myjson.com/bins/158p6o");
        DeseneazaLinii()
    });
});
