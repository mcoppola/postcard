paper.install(window);

window.onload = function() {
    var postcard = new Postcard();


    var ss1 = postcard.newMold('ss1'),
        ss2  = postcard.newMold('ss2'),
        ss3 = postcard.newMold('ss3');


    ss2.raster.position = new Point(100, 100);
    ss1.raster.position = new Point(100, 250);
    ss3.raster.position = new Point(100, 400);

}