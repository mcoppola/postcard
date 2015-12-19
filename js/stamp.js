
function Stamp(raster, id, postcard, e) {
	var self = this;

    self.id = id;
	self.raster = raster;
	self.raster.onMouseDown = onMouseMouseDown;

    self.startWidth = 30;
    self.startHeight = 30;
    self.endWidth = 100;
    self.endHeight = 100;
    self.growSpeed = 25;    // px per frame

    self.raster.bounds.width = self.startWidth;
    self.raster.bounds.height = self.startWidth;

    self.raster.ctx = postcard;
    self.raster.ctx.state.stamping = true;

    self.raster.position = new Point(e.event.x, e.event.y);

	self.raster.state = {
		move: true,  // born moving
        init: true,
		scale: false
	};

    self.raster._postData = {
        endHeight: self.endHeight,
        endWidth: self.endWidth
    };
}

var onMouseMouseDown = function(e) {
	var self = this;

    if (self.state.dead) { return; }


    if (self.state.move) {

		// save the mouse position
        self.state.xD = e.event.x;
        self.state.yD = e.event.y;

        // save our width + height
        self.state.oWidth = self.bounds.width;
        self.state.oHeight = self.bounds.height;

        // set the new state to scaling
        // - ends in onMouseUp
        self.state.scale = true;
        
        self.state.move = false;

    } else {
        self.state.move = true;
    }
};

Stamp.prototype.onMouseMove = function(e) {

    var self = this;

    if (self.raster.state.move) {
        self.raster.position = new Point(e.event.x, e.event.y);
    }
    if (self.raster.state.scale) {

        var x = e.event.x,
            y = e.event.y;

        // scale
        self.raster.bounds.width = Math.max(self.raster.state.oWidth/8,  self.raster.state.oWidth + Math.round(100 * ((x - self.raster.state.xD)/100)));
        self.raster.bounds.height = Math.max(self.raster.state.oHeight/8, self.raster.state.oHeight + Math.round(100 * ((x - self.raster.state.xD)/100)));

        self.raster.position = new Point(self.raster.state.xD, self.raster.state.yD);

        // rotate
        // console.log(self.stamps[i].raster.rotation);
        // console.log('y:', y);
        // console.log('self.stamps[i].raster.state.yD, ', self.stamps[i].raster.state.yD);
        // self.stamps[i].raster.rotation = ((self.stamps[i].raster.state.yD - y)/10);

    }
};

Stamp.prototype.onMouseUp = function(e) {
    var self = this;

    if (self.raster.state.scale) {
        // turn off scaling
        self.raster.state.scale = false;

        // turn off stamping
        self.raster.ctx.state.stamping = false;

        
        // put in the postcard group, under the border
        if (self.raster.ctx.postcardGroup === undefined) {
            // make the postcard group if it is undefined
            self.raster.ctx.postcardGroup = new Group(self.raster);
        } else {
            // insert it on top
            // self.raster.ctx.postcardGroup = new Group(self.raster.ctx.postcardGroup, self.raster);
            self.raster.ctx.postcardGroup = new Group(self.raster);

        }

        // console.log('self.raster.ctx.postcardGroup', self.raster.ctx.postcardGroup);

        // rasterize the postcard group
        self.raster.ctx.postcardGroup = self.raster.ctx.postcardGroup.rasterize();

        // kill it
        self.stampAndDestroy();
    }
};

Stamp.prototype.onFrame = function(e) {
    var self = this;

    if (self.raster.state.init) {
        // scale the stamp on init

        if (self.raster.bounds.width > self.raster._postData.endWidth) {
            // done growing
            self.raster.state.init = false;
        } else {
            // add width and height
            self.raster.bounds.width += self.growSpeed;
            self.raster.bounds.height += self.growSpeed;

            // reset the position to be centered at the new size
            self.raster.position = new Point(self.raster.position.x - (self.growSpeed/2), self.raster.position.y - (self.growSpeed/2));
        }
    }
};

Stamp.prototype.stampAndDestroy = function() {
    var self = this;

    self.raster.state.dead = true;
    self.raster.ctx.stamps.pop();
    self.raster.remove();
}