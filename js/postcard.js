Postcard = function() {
	var self = this;

	self.molds = {};
	self.stamps = [];

	self.width = 500;
	self.height = 330;


	self.run();
};

Postcard.prototype.run = function() {
	var self = this;

	paper.setup('canvas');
	var tool = new Tool();


	self.drawBorder();


	tool.onMouseMove = function(e) {

        for (var i = self.stamps.length - 1; i >= 0; i--) {


            if (self.stamps[i].raster.state.move) {
                self.stamps[i].raster.position = new Point(e.event.x, e.event.y);
            }
            if (self.stamps[i].raster.state.scale) {

                var x = e.event.x;

                // scale
                self.stamps[i].raster.bounds.width = Math.max(self.stamps[i].raster.state.oWidth/8,  self.stamps[i].raster.state.oWidth + Math.round(100 * ((x - self.stamps[i].raster.state.xD)/100)));
                self.stamps[i].raster.bounds.height = Math.max(self.stamps[i].raster.state.oHeight/8, self.stamps[i].raster.state.oHeight + Math.round(100 * ((x - self.stamps[i].raster.state.xD)/100)));

                // rotate
                // console.log(items[i].raster.rotation);
                // self.stamps[i].raster.rotate(((e.event.y - self.stamps[i].raster.state.yD)/5000)*360);

            }

        }

    }

    // view.onFrame = function(e) {


    // }
};

Postcard.prototype.drawBorder = function() {
	var self = this;

	var top = new Shape.Rectangle(new Point(0,0), new Size(view.bounds.width, (view.bounds.height - self.height)/2));
	top.fillColor = '#fcfaff';
	var btm = new Shape.Rectangle(new Point(0, view.bounds.height - ((view.bounds.height - self.height)/2)), new Size(view.bounds.width, view.bounds.height - self.height/2));
	btm.fillColor = '#fcfaff';
	var left = new Shape.Rectangle(new Point(0,0), new Size(view.bounds.width/2 - self.width/2, view.bounds.height));
	left.fillColor = '#fcfaff';
	var right = new Shape.Rectangle(new Point(view.bounds.width/2 + self.width/2,0), new Size(view.bounds.width/2 - self.width/2, view.bounds.height));
	right.fillColor = '#fcfaff';

	self.postcardGroup = new Group([top, btm, left, right]);

};

Postcard.prototype.newMold = function(id) {
	var self = this;

	var mold = new Mold(new Raster(id), id, self);
	self.molds[id] = mold;
	return mold;
};
Postcard.prototype.newStamp = function(id, e) {
	var self = this;

	var stamp = new Stamp(new Raster(id), id, self, e);
	self.stamps.push(stamp);
	return stamp;
};