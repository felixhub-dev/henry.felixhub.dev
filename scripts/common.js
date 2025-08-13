let $ = (id) => document.getElementById(id);

function isOnMobile() {
    return window.innerHeight >= window.innerWidth;
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //     return true;
    // }
    // if (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) {
    //     return true;
    // }
    // if (window.matchMedia("(pointer: coarse)").matches) {
    //     return true;
    // }
    // // Safari reports as Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.10 Safari/605.1.1 - check screen size
    // if (/Intel Mac OS X/i.test(navigator.userAgent) && window.innerWidth <= 800 && window.innerHeight <= 600) {
    //     return true;
    // }
    // return false;
}

// Mobile CSS
resizeHandler = () => {
    console.log("New dimensions: "+this.window.innerWidth+"x"+this.window.innerHeight)
    let mobileCSS = $('mobile-css');
    if (isOnMobile()) {
        this.document.body.classList.add("mobile")
        $('background-image').src = $('background-image').src.replace("desktop", "mobile");
    } else {
        this.document.body.classList.remove("mobile")
        $('background-image').src = $('background-image').src.replace("mobile", "desktop");
    }
}

window.addEventListener('resize', resizeHandler);
