window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function() {
    function c() {
        var d = document.documentElement;
        var cw = d.clientWidth >= 750 ? 750 : d.clientWidth;
        d.style.fontSize = 100 * (cw / 750) + 'px';
    }
    c();
    return c;
})(), false);