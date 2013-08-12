$(function () {
    var img = new Image();
    img.src = 'img/sample.png';

    var opts = {
        icon: img,
        // iconSize: 80,

        // size: 300,

        lineColor: 'rgba(255, 255, 0, 0.5)',

        id: 'icon-hanabi-' + (new Date().getTime()),
        className: 'icon-hanabi',

        // clock: 20,

        tailTime: 700,
        attackTime: 200,
        releaseTime: 300
    };

    $(document.body).on('click', function (e) {
        opts.x = e.pageX;
        opts.y = e.pageY;
        new IconHanabi(opts);
    });

    $('#button-a').on('click', function (e) {
        e.stopPropagation();

        opts.minSize = 200;
        opts.maxSize = 400;

        opts.rings = [{
            offsetTime: 0,
            count: 1,
            scale: 0,
            iconScale: 0.8
        }, {
            offsetTime: 50,
            count: 28,
            scale: 0.3,
            iconScale: 0.8
        }, {
            offsetTime: 50,
            count: 28,
            scale: 0.6,
            iconScale: 0.8
        }, {
            offsetTime: 100,
            count: 28,
            scale: 1,
            iconScale: 1
        }];
    }).click();


    $('#button-b').on('click', function (e) {
        e.stopPropagation();

        opts.minSize = 300;
        opts.maxSize = 500;

        opts.rings = [{
            offsetTime: 0,
            count: 1,
            scale: 0,
            iconScale: 1
        }, {
            offsetTime: 0,
            count: 8,
            scale: 0.15,
            iconScale: 0.8
        }, {
            offsetTime: 0,
            count: 8,
            scale: 0.3,
            iconScale: 0.8
        }, {
            offsetTime: 0,
            count: 8,
            scale: 0.45,
            iconScale: 0.8
        }, {
            offsetTime: 0,
            count: 8,
            scale: 0.6,
            iconScale: 0.8
        }, {
            offsetTime: 0,
            count: 8,
            scale: 0.75,
            iconScale: 0.8
        }, {
            offsetTime: 0,
            count: 8,
            scale: 0.9,
            iconScale: 1
        }];
    });
});