
function Stamp(raster, id, postcard, e) {
	var self = this;

    self.id = id;
	self.raster = raster;
	self.raster.onMouseDown = onMouseMouseDown;
	// self.raster.scale(0.25);

    self.raster.bounds.width = 130;
    self.raster.bounds.height = 130;

    self.raster.ctx = postcard;

    self.raster.position = new Point(e.event.x, e.event.y);

	self.raster.state = {
		move: true,  // born moving
		scale: false
	};
}

var onMouseMouseDown = function(e) {
	var self = this;

    if (self.state.dead) { return; }

	if (self.state.scale) {
        self.state.scale = false;

        // put in the postcard group, under the border
        self.ctx.postcardGroup.insertChild(self.ctx.postcardGroup.children.length - 4, self);

        // stamp
        self.state.dead = true;

    } else if (self.state.move) {

		// save the mouse position
        self.state.xD = e.event.x;
        self.state.yD = e.event.y;

        // save our width + height
        self.state.oWidth = self.bounds.width;
        self.state.oHeight = self.bounds.height;

        // set the new state to scaling
        self.state.scale = true;
        self.state.move = false;

    } else {
        self.state.move = true;
    }
};