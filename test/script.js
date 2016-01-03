
window.onload = function() {
    $(function(){

        var buzz = function(x,y,xS,yS) {
                        var pos = {};

                        pos.x = Math.random()*2 + x;
                        pos.y = Math.random()*2 + y;

                        pos.xS = xS;
                        pos.yS = yS;

                        return pos;
                    }

        var stamps = {
                a: {
                    img: $('#ss1')[0]
                },
                b: {
                    img: $('#ss2')[0]
                },
                c: {
                    img: $('#ss3')[0]
                },
                d: {
                    img: $('#ss4')[0]
                    // animate: buzz
                },
                e: {
                    img: $('#ss5')[0]
                    // animate: buzz
                },
                f: {
                    img: $('#screen1')[0]
                },
                g: {
                    img: $('#screen2')[0]
                },
                h: {
                    img: $('#screen3')[0]
                },
                i: {
                    img: $('#screen4')[0]
                },
                j: {
                    img: $('#grad1')[0]
                },
                k: {
                    img: $('#stamp1')[0]
                },
                l: {
                    img: $('#stamp2')[0]
                },
                m: {
                    img: $('#stamp3')[0]
                },
                n: {
                    img: $('#ss6')[0]
                },
                o: {
                    img: $('#ss7')[0]
                },
                p: {
                    img: $('#ss8')[0]
                },
                q: {
                    img: $('#ss9')[0]
                },
                r: {
                    img: $('#ss10')[0]
                }
   
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


        

        function redrawCanvas(elms) {
            ctx.clearRect(0,0,c.width,c.height);

            for (var i = 0; i < elms.length; i++) {

                ctx.globalCompositeOperation = blendModes[Math.min(elms[i].length - 1, blendModes.length - 1)];

                if (elms[i].length) {

                    var img = stamps[elms[i].charAt(0).toLowerCase()] ? stamps[elms[i].charAt(0).toLowerCase()].img : stamps['j'].img;

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

                    if (stamps[elms[i].charAt(0).toLowerCase()] && typeof(stamps[elms[i].charAt(0).toLowerCase()].animate) === 'function') {
                        var pos = stamps[elms[i].charAt(0).toLowerCase()].animate(x,y,xS,yS);
                        ctx.drawImage(img, pos.x, pos.y, 50 * pos.xS, 50 * pos.yS);

                    } else {
                        ctx.drawImage(img, x,y, 50 * xS, 50 * yS);
                    }

                }

            };
        } 
 



        $input.focus();

        $input.typed({
            strings: ["Meet me in my field of grass..", "you don't make me sor___ry.", "I'll be home and then I'll waste ", "All my time on you dear.", "asdf good funny." ],
            typeSpeed: 70,
            onNewChar: function() {
                $input.keyup();
            }
        });

        frames.onValue( function() {
            redrawCanvas(elms);
        });


    });
};