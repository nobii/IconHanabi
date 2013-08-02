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

    this.className = opts.className || null;
    this.id = opts.id || null;

    this.clock = 20;
    this.time = 0;

    this.initCanvas();
    this.initAngles();

    this.start();
};

IconHanabi.prototype.initCanvas = function () {
    var size = this.size,
        x = this.x,
        y = this.y;

    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    canvas.style.position = 'fixed';
    canvas.style.left = (x - size / 2) + 'px';
    canvas.style.top = (y - size / 2) + 'px';

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
};

IconHanabi.prototype.clear = function () {
    this.canvas.width = this.size;
};

IconHanabi.prototype.initAngles = function () {
    var angles = [],
        count = 10;

    for (var i = 0; i < count; i++) {
        angles.push(Math.PI * 2 * ((i + Math.random()) / count));
    }
    this.angles = angles;
};

IconHanabi.prototype.draw = function () {
    var time = this.time;

    if (time < 200) {
        this.drawTail(time);
    } else if (time < 1000) {
        this.positIcons(time - 200);
    } else {
        this.stop();
    }
};

IconHanabi.prototype.drawTail = function (time) {
    var ctx = this.ctx,
        size = this.size,
        iconWidth = this.iconWidth,

        duration = 200,
        rate = time / duration,
        lineWidth = iconWidth * 0.5;

    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(size / 2, size);
    ctx.lineTo(size / 2, size - rate * size / 2);
    ctx.stroke();
};

IconHanabi.prototype.positIcons = function (time) {
    var canvas = this.canvas,
        ctx = this.ctx,
        icon = this.icon,
        size = this.size,
        angles = this.angles,

        duration = 800,
        attackTime = 200,
        offset = 50,
        opacity = Math.min((duration - time) / (duration - attackTime - offset), 1),
        iconWidth = icon.width,
        iconHeight = icon.height,

        rate = Math.min(time, attackTime) / attackTime,
        rate2 = Math.max(0, Math.min(time - offset, attackTime) / attackTime);

    ctx.globalAlpha = opacity;

    this.putIcon(0, 0, rate);

    for (var i = 0; i < angles.length; i++) {
        this.putIcon(rate2 * (size / 2 - iconWidth), angles[i], rate2);
    }
};

IconHanabi.prototype.putIcon = function (distance, angle, rate) {
    var ctx = this.ctx,
        icon = this.icon,
        size = this.size,
        iconWidth = icon.width,
        iconHeight = icon.height;

    ctx.drawImage(
        icon,
        (size - iconWidth  * rate) / 2 + Math.cos(angle) * distance,
        (size - iconHeight * rate) / 2 + Math.sin(angle) * distance,
        iconWidth * rate,
        iconHeight * rate
    );
};