Postcard = function() {
	var self = this;

	self.molds = {};
	self.stamps = [];
    self.moldRasters = [];

    // Paper layer groups
    self.moldGroup;
    self.selectionGroup;
    self.backgroundGroup;
    self.postcardGroup;

    self.sceneGroup;

	self.width = 500;
	self.height = 330;

    self.state = {
        stamping: false
    };

	self.run();

};

Postcard.prototype.run = function() {
	var self = this;

	paper.setup('canvas');
	var tool = new Tool();


    self.drawBackground();

    tool.onMouseDown = function(e) {
        self.drawScene();
    };
	tool.onMouseMove = function(e) {
        self.stampsEvent('onMouseMove', e);
    };
    tool.onMouseUp = function(e) {
   	    self.stampsEvent('onMouseUp', e);
        self.drawScene();
    };
    view.onFrame = function(e) {
    	self.stampsEvent('onFrame', e);
    };
};

Postcard.prototype.drawBackground = function() {
	var self = this,
		bgColor = self.state.stamping ?  "#dfdfdf" : "#fff";

	var top = new Shape.Rectangle(new Point(0,0), new Size(view.bounds.width, (view.bounds.height - self.height)/2));
	top.fillColor = bgColor;
	var btm = new Shape.Rectangle(new Point(0, view.bounds.height - ((view.bounds.height - self.height)/2)), new Size(view.bounds.width, view.bounds.height - self.height/2));
	btm.fillColor = bgColor;
	var left = new Shape.Rectangle(new Point(0,0), new Size(view.bounds.width/2 - self.width/2, view.bounds.height));
	left.fillColor = bgColor;
	var right = new Shape.Rectangle(new Point(view.bounds.width/2 + self.width/2,0), new Size(view.bounds.width/2 - self.width/2, view.bounds.height));
	right.fillColor = bgColor;

    self.backgroundGroup = new Group([top, btm, left, right]);

};

Postcard.prototype.drawScene = function() {
    var self = this;

    self.drawBackground();
    self.sceneGroup = new Group([self.backgroundGroup, self.moldGroup, self.selectionGroup]);
};

Postcard.prototype.newMold = function(id) {
	var self = this;

	var mold = new Mold(new Raster(id), id, self);
	self.molds[id] = mold;
    self.moldRasters.push(mold.raster);

    self.moldGroup = new Group(self.moldRasters);

	return mold;
};

Postcard.prototype.newStamp = function(id, e) {
	var self = this;

	var stamp = new Stamp(new Raster(id), id, self, e);
	self.stamps.push(stamp);
    self.selectionGroup = new Group(stamp.raster);

    self.drawScene();

	return stamp;
};

Postcard.prototype.clear = function() {
	var self = this;

	for (var i = self.stamps.length - 1; i >= 0; i--) {
		self.stamps[i].raster.remove();
	}

    self.postcardGroup.remove();
    self.postcardGroup = undefined;
	self.drawScene();

	self.stamps = [];
};

Postcard.prototype.stampsEvent = function(fn, e) {
	var self = this;

	for (var i = self.stamps.length - 1; i >= 0; i--) {
		self.stamps[i][fn](e);
	}
};

