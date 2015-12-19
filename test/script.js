paper.install(window);

window.onload = function() {
    $(function(){
        var postcard = new Postcard();


        var ss1 = postcard.newMold('ss1'),
            ss2 = postcard.newMold('ss2'),
            ss3 = postcard.newMold('ss3'),
            stamp1  = postcard.newMold('stamp1'),
            stamp2  = postcard.newMold('stamp2'),
            stamp3  = postcard.newMold('stamp3');


        var yBase = ((view.bounds.height - postcard.height)/2 + (ss1.height/2));
        // xBase = ((view.bounds.width - postcard.width)/2 - (ss1.width)*4);


        ss1.raster.position = new Point(300, yBase);
        ss2.raster.position = new Point(300, yBase + 40*2);
        ss3.raster.position = new Point(300, yBase + 40*4);

        stamp1.raster.position = new Point(365, yBase);
        stamp2.raster.position = new Point(365, yBase + 40*2);
        stamp3.raster.position = new Point(365, yBase + 40*4);


        var $clear = $('.clear');

        $clear.click(function(){
            postcard.clear();
        });

    });
};