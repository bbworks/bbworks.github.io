const Fade = function() {
  const CLASSNAME  = {
    fadeInOnScroll: "fade-in-on-scroll",
    fadeInOnScrollListener: "fade-in-on-scroll-listener",
  };

  const fadeInOnScroll = function(event) {
    const SCROLL_BUFFER = 50; //Don't fade in the element until we scroll this many pixels INTO the element

    let elements = document.getElementsByClassName(CLASSNAME.fadeInOnScrollListener);
    for(let i = 0; i < elements.length; i++) {
      let element = elements[i];
      const windowTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const windowBottom = windowTop + window.innerHeight;
      const windowRight = windowLeft + window.innerWidth;
      const elementRect = element.getBoundingClientRect();
      const elementTop = windowTop + elementRect.y;
      const elementLeft = windowLeft + elementRect.x;
      const elementBottom = elementTop + elementRect.height;
      const elementRight = elementLeft + elementRect.width;
      const isVisible = (windowTop < elementBottom + SCROLL_BUFFER) &&
        (windowBottom > elementTop + SCROLL_BUFFER) &&
        (windowLeft < elementRight + SCROLL_BUFFER) &&
        (windowRight > elementLeft + SCROLL_BUFFER);
      if (isVisible) {
        element.classList.add(CLASSNAME.fadeInOnScroll);
      }
      /*DEBUG*/ //console.log(element, `IsVisible: ${isVisible}\r\nCollideFromBottom: ${(windowTop < elementBottom + SCROLL_BUFFER)}\r\nCollideFromTop: ${(windowBottom > elementTop + SCROLL_BUFFER)}\r\nCollideFromRight: ${(windowLeft < elementRight + SCROLL_BUFFER)}\r\nCollideFromLeft: ${(windowRight > elementLeft + SCROLL_BUFFER)}`);
    }
    /*DEBUG*/ //console.log("\r\n\r\n");
  };

  this.init = function() {
    if (document.getElementsByClassName(CLASSNAME.fadeInOnScrollListener)) {
      window.addEventListener("scroll", fadeInOnScroll);
    }
  };
};

Fade.prototype.constructor = Fade;

const fade = new Fade();
fade.init();
