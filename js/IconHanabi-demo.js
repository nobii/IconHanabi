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

            id: 'icon-hanabi-' + (new Date().getTime()),
            className: 'icon-hanabi'
        });
    });
});