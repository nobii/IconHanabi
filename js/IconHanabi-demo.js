$(function () {
    var img = new Image();
    img.src = 'img/sample.png';

    $(document.body).on('click', function (e) {
        new IconHanabi({
            icon: img,
            x: e.pageX,
            y: e.pageY,
            size: 600
        });
    });
});