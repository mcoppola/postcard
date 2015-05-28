paper.install(window);

window.onload = function() {

$(function(){
    var postcard = new Postcard();


    var ss1 = postcard.newMold('ss1'),
        ss2  = postcard.newMold('ss2'),
        ss3 = postcard.newMold('ss3'),
        stamp1  = postcard.newMold('stamp1'),
        stamp2  = postcard.newMold('stamp2'),
        stamp3  = postcard.newMold('stamp3');


    ss2.raster.position = new Point(100, 100);
    ss1.raster.position = new Point(100, 200);
    ss3.raster.position = new Point(100, 300);

    stamp1.raster.position = new Point(100, 400);
    stamp2.raster.position = new Point(100, 500);
    stamp3.raster.position = new Point(100, 600);


    var $clear = $('.clear');

    $clear.click(function(){

        postcard.clear();
    });


// }






});


}