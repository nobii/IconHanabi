$(function () {
    var img = new Image();
    img.src = 'img/sample.png';

    $(document.body).on('click', function (e) {
        new IconHanabi({
            icon: img,
            // iconSize: 80,

            x: e.pageX,
            y: e.pageY,
            // size: 500,
            minSize: 400,
            maxSize: 600,

            // lineColor: 'rgba(255, 255, 0, 0.5),'

            id: 'icon-hanabi-' + (new Date().getTime()),
            className: 'icon-hanabi',

            // clock: 20,

            tailTime: 200,
            attackTime: 200,
            releaseTime: 300,

            rings: [{
                offsetTime: 0,
                count: 1,
                scale: 0,
                iconScale: 0.5
            }, {
                offsetTime: 50,
                count: 10,
                scale: 0.5,
                iconScale: 0.5
            }, {
                offsetTime: 100,
                count: 10,
                scale: 1,
                iconScale: 1
            }]
        });
    });
});