var IconHanabi = function (opts) {
    this.icon = opts.icon || new Image();

    // init metrix
    var innerWidth = window.innerWidth,
        innerHeight = window.innerHeight;

    this.x = opts.x || innerWidth * Math.random();
    this.y = opts.y || innerHeight * Math.random();
    this.size = opts.size || (
        (opts.minSize && opts.maxSize)
        ? opts.minSize + (opts.maxSize - opts.minSize) * Math.random()
        : 500
    );
    this.iconSize = opts.iconSize || this.icon.width;

    this.className = opts.className || null;
    this.id = opts.id || null;

    this.lineColor = opts.lineColor || 'rgba(255, 255, 255, 0.5)';
    this.lineLength = opts.lineLength || 500;

    this.axisOffset = opts.axisOffset || Math.PI * 2 * Math.random();
    this.fallingScale = opts.fallingScale || 0.1;

    this.xOffset = 0;
    this.yOffset = this.lineLength;

    this.tailTime = opts.tailTime || 0;
    this.attackTime = opts.attackTime || 0;
    this.releaseTime = opts.releaseTime || 0;

    this.done = opts.done || function () {};


    this.clock = opts.clock || 20;
    this.time = 0;

    this.rings = opts.rings || [{
        offsetTime: 0,
        count: 1,
        size: 0
    }, {
        offsetTime: 50,
        count: 10,
        size: 1
    }];

    this.initCanvas();
    this.initAngles();

    this.start();
};

IconHanabi.prototype.initCanvas = function () {
    var size = this.size,
        x = this.x,
        y = this.y,
        xOffset = this.xOffset,
        yOffset = this.yOffset;

    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    canvas.style.position = 'fixed';
    canvas.style.left = (x + xOffset - size / 2) + 'px';
    canvas.style.top =  (y + yOffset - size / 2) + 'px';

    if (this.id) {
        canvas.id = this.id;
    }
    if (this.className) {
        canvas.className = this.className;
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
};

IconHanabi.prototype.start = function () {
    var self = this,
        clock = this.clock;

    document.body.appendChild(this.canvas);

    this.loop = setInterval(function () {
        self.time += clock;
        self.clear();
        self.draw();
    }, clock);
};

IconHanabi.prototype.stop = function () {
    clearInterval(this.loop);
    document.body.removeChild(this.canvas);
    this.done();
};

IconHanabi.prototype.clear = function () {
    this.canvas.width = this.size;
    if (this.yOffset) {
        this.canvas.style.top =  (this.y + this.yOffset - this.size / 2) + 'px';
    }
};

IconHanabi.prototype.initAngles = function () {
    var maxOffset = 0;

    this.rings.forEach(function (ring) {
        var angles = [],
            count = ring.count,
            noise = 0;

        for (var i = 0; i < count; i++) {
            noise = (ring.noise || 0) * Math.random();
            angles.push(Math.PI * 2 * ((i + noise) / count));
        }
        ring.angles = angles;

        maxOffset = Math.max(ring.offsetTime, maxOffset);
    });

    this.maxOffset = maxOffset;
};

IconHanabi.prototype.draw = function () {
    var time = this.time;

    if (time < this.tailTime) {
        this.drawTail(time);
    } else if (time < this.tailTime + this.attackTime + this.maxOffset + this.releaseTime) {
        this.positIcons(time - this.tailTime);
    } else {
        this.stop();
    }
};

IconHanabi.prototype.drawTail = function (time) {
    var ctx = this.ctx,
        size = this.size,
        iconSize = this.iconSize,
        lineColor = this.lineColor,

        tailTime = this.tailTime,
        rate = time / tailTime,
        lineWidth = iconSize * 0.1,

        powRate = Math.pow(rate, 2),

        from = size,
        to = size - rate * size / 2;

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = (1 - powRate);

    ctx.beginPath();
    ctx.moveTo(size / 2, from);
    ctx.lineTo(size / 2, to);
    ctx.stroke();

    this.yOffset = this.lineLength * (1 - powRate);
};

IconHanabi.prototype.positIcons = function (time) {
    var self = this,
        canvas = this.canvas,
        ctx = this.ctx,
        icon = this.icon,
        size = this.size,
        angles = this.angles,
        iconSize = this.iconSize,
        fallingScale = this.fallingScale,

        releaseTime = this.releaseTime,
        attackTime = this.attackTime + this.maxOffset,
        opacity = (time <= attackTime) ? 1 : (1 - (time - attackTime) / releaseTime),

        axisOffset = this.axisOffset,
        distanceRate = Math.pow(time / (attackTime + releaseTime), 0.5),

        rings = this.rings;

    distanceRate = Math.max(0, Math.min(1, distanceRate));

    ctx.globalAlpha = opacity;

    rings.forEach(function (ring, index) {
        var rate = Math.max(0, Math.min(time - ring.offsetTime, attackTime) / attackTime),
            distance = ring.scale * distanceRate * (size / 2 - iconSize),
            angles = ring.angles;

        for (var i = 0; i < angles.length; i++) {
            self.putIcon(
                distanceRate,
                distance,
                angles[i] + axisOffset,
                ring.iconScale,
                ring.scale * ring.scale
            );
        }
    });

    this.yOffset = size * fallingScale * (
        time / (attackTime + releaseTime)
    );
};

IconHanabi.prototype.putIcon = function (rate, distance, angle, iconScale, fall) {
    var ctx = this.ctx,
        icon = this.icon,
        size = this.size,
        iconSize = this.iconSize,

        scale = size / 500,
        vsize = iconSize * rate * iconScale * scale;

    ctx.drawImage(
        icon,
        (size - vsize) / 2 + Math.cos(angle) * distance,
        (size - vsize) / 2 + Math.sin(angle) * distance + (this.yOffset * (fall - 1)),
        vsize,
        vsize
    );
};