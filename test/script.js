
window.onload = function() {
    $(function(){

        var stamps = {
                a: $('#ss1')[0],
                b: $('#ss2')[0],
                c: $('#ss3')[0],
                d: $('#stamp1')[0],
                e: $('#stamp2')[0],
                f: $('#stamp3')[0],
            },
            $input  = $('#textInput');
            s       = '',
            elms    = [];

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");


        var frames = new Bacon.Bus();

        function raf() {
          requestAnimationFrame(raf);
          frames.push();
        }
        raf();

        var inputKeyUp = $input.asEventStream('keyup');



        function appendString(e) {
            s = $input.val();
            elms = s.split(' ');
        };

        inputKeyUp.onValue(appendString);


        frames.onValue( function() {
            redrawCanvas(elms);
        });

        function redrawCanvas(elms) {
            ctx.clearRect(0,0,c.width,c.height);

            for (var i = 0; i < elms.length; i++) {
                
                if (elms[i].length) {

                    var img = stamps[elms[i].charAt(0)] || stamps['a'];

                    var x,y,xS,yS;

                    if (elms[i].charAt(1)) {
                        x = elms[i].charCodeAt(1) / 2;
                    } else {
                        x = 0;
                    }

                    if (elms[i].charAt(2)) {
                       y = elms[i].charCodeAt(2) / 10;
                    } else {
                       y = 0;
                    }

                    if (elms[i].charAt(3)) {
                       xS = elms[i].charCodeAt(3) / 10;
                    } else {
                       xS = 1;
                    }

                    if (elms[i].charAt(4)) {
                       yS = elms[i].charCodeAt(4) / 10;
                    } else {
                       yS = 1;
                    }

                    ctx.drawImage(img,x,y, 20 * xS, 20 * yS);
                }
            };
        }


    });
};