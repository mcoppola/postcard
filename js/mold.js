function Mold(raster, id, postcard) {
	var self = this;

	self.raster = raster;
	self.raster.onMouseDown = onMoldMouseDown;
	self.raster.ctx = postcard;
	self.raster.moldId = id;

	self.raster.bounds.width = 80;
    self.raster.bounds.height = 80;

}

// Make a new stamp from the mold
var onMoldMouseDown = function(e) {
	var self = this;

    self.ctx.newStamp(self.moldId, e);
};