// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {33: 1, 38: 1, 34: 1, 40: 1};

var supportsPassive = true;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
var old_scroll_top = 0;

$(document).ready(function () {
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    $("li#github > ul").click(() => {
        let arrow = "li#github > ul > li:last-child > i";
        $("li#github > section").slideToggle();
        $(arrow).fadeOut(() => {
            if($(arrow).hasClass("fa-chevron-down")) {
                $(arrow).removeClass("fa-chevron-down");
                $(arrow).addClass("fa-chevron-up");
            } else {
                $(arrow).removeClass("fa-chevron-up");
                $(arrow).addClass("fa-chevron-down");
            }
            $(arrow).fadeIn();
        });
    });
    $(document).scroll(newScroll);
    window.addEventListener("touchmove", newScroll);
});

function newScroll() {
    var current_scroll_top = $(document).scrollTop();
    var scroll_delta = current_scroll_top - old_scroll_top;
    old_scroll_top = current_scroll_top;
    if (scroll_delta > 0) {
        $("#home").get(0).scrollIntoView({behavior: 'smooth'});
    } else {
        $('body > div:first-child').get(0).scrollIntoView({behavior: 'smooth'});
    }
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        e.preventDefault();
        if(e.keyCode === 40 || e.keyCode === 34) {
            $("#home").get(0).scrollIntoView({behavior: 'smooth'});
        } else if (e.keyCode === 38 || e.keyCode === 33) {
            $('body > div:first-child').get(0).scrollIntoView({behavior: 'smooth'});
        }
      return false;
    }
}