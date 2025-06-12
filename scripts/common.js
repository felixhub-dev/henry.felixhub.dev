let $ = (id) => document.getElementById(id);

function isOnMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    if (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) {
        return true;
    }
    if (window.matchMedia("(pointer: coarse)").matches) {
        return true;
    }
    // Safari reports as Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.10 Safari/605.1.1 - check screen size
    if (/Intel Mac OS X/i.test(navigator.userAgent) && window.innerWidth <= 800 && window.innerHeight <= 600) {
        return true;
    }
    return false;
}