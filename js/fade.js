const Fade = function() {
  const CLASSNAME  = {
    fadeInOnScroll: "fade-in-on-scroll",
    fadeInOnScrollListener: "fade-in-on-scroll-listener",
  };

  const fadeInOnScroll = function(event) {
    let elements = document.getElementsByClassName(CLASSNAME.fadeInOnScrollListener);
    for(let i = 0; i < elements.length; i++) {
      let element = elements[i];
      const windowTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const windowBottom = windowTop + window.innerHeight;
      const windowRight = windowLeft + window.innerWidth;
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.y;
      const elementLeft = elementRect.x;
      const elementBottom = elementRect.y + elementRect.height;
      const elementRight = elementRect.x + elementRect.width;
      if (
        (windowTop < elementBottom) &&
  	    (windowBottom > elementTop) &&
  	    (windowLeft < elementRight) &&
  	    (windowRight > elementLeft)
      )
      element.classList.add(CLASSNAME.fadeInOnScroll);
    }
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
