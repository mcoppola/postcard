
window.onload = function() {
    $(function(){

        var stamps = {
                a: $('#ss1')[0],
                b: $('#ss2')[0],
                c: $('#ss3')[0],
                d: $('#ss4')[0],
                e: $('#ss5')[0],
                f: $('#screen1')[0],
                g: $('#screen2')[0],
                h: $('#screen3')[0],
                i: $('#screen4')[0],
                j: $('#grad1')[0],
                k: $('#stamp1')[0],
                l: $('#stamp2')[0],
                m: $('#stamp3')[0],
                n: $('#ss6')[0],
                o: $('#ss7')[0],
                p: $('#ss8')[0],
                q: $('#ss9')[0],
                r: $('#ss10')[0]
            },
            $input  = $('#textInput');
            s       = '',
            elms    = [];

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");

        var blendModes = ['source-over', 'soft-light', 'overlay', 'multiply', 'destination-over', 'lighten', 'color-burn', 'exclusion', 'color-dodge', 'screen', 'difference'];
        ctx.globalCompositeOperation = "sorce-over";


        var frames = new Bacon.Bus();

        function raf() {
          requestAnimationFrame(raf);
          frames.push();
        }
        raf();

        function appendString(e) {
            s = $input.val();
            elms = s.split(' ');
        };

        var inputKeyUp = $input.asEventStream('keyup');
        inputKeyUp.onValue(appendString);


        frames.onValue( function() {
            redrawCanvas(elms);
        });

        function redrawCanvas(elms) {
            ctx.clearRect(0,0,c.width,c.height);

            for (var i = 0; i < elms.length; i++) {

                ctx.globalCompositeOperation = blendModes[Math.min(elms[i].length - 1, blendModes.length - 1)];

                if (elms[i].length) {

                    var img = stamps[elms[i].charAt(0)] || stamps['j'];

                    var x,y,xS,yS;

                    if (elms[i].length >= 2) {
                        x = (elms[i].charCodeAt(elms[i].length - 1) - 48) * 0.002 * (c.width - 100);
                    } else {
                        x = 0;
                    }

                    if (elms[i].length >= 3) {
                       y = (elms[i].charCodeAt(elms[i].length - 2) - 48) * 0.002 * (c.height - 100);
                    } else {
                       y = 0;
                    }

                    if (elms[i].length >= 4) {
                       xS = elms[i].charCodeAt(elms[i].length - 3) / 20;
                    } else {
                       xS = 2;
                    }

                    if (elms[i].length >= 5) {
                       yS = elms[i].charCodeAt(elms[i].length - 4) / 20;
                    } else {
                       yS = xS;
                    }

                    ctx.drawImage(img, x,y, 50 * xS, 50 * yS);
                }

            };
        }


    });
};