paper.install(window);

window.onload = function() {
    var postcard = new Postcard();


    var liam = postcard.newMold('liam'),
        gun  = postcard.newMold('gun'),
        obama = postcard.newMold('obama');


    gun.raster.scale(0.32);
    liam.raster.scale(0.35);
    obama.raster.scale(0.45);


    liam.raster.position = new Point(100, 100);
    gun.raster.position = new Point(100, 250);
    obama.raster.position = new Point(100, 400);

}