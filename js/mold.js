function Mold(raster, id, postcard) {
	var self = this;

	self.raster = raster;
	self.raster.onMouseDown = onMoldMouseDown;
	self.raster.ctx = postcard;
	self.raster.moldId = id;

	self.width = 30;
	self.height = 30;

	self.raster.bounds.width = self.width;
    self.raster.bounds.height = self.height;

}

// Make a new stamp from the mold
var onMoldMouseDown = function(e) {
	var self = this;

    self.ctx.newStamp(self.moldId, e);
};