(function() {
  //Declare variables
  const fadeInClassName = "fade-in-on-scroll";
  const fadeInListenerClassName = "fade-in-on-scroll-listener";

  //Declare functions
  const fadeInOnScroll = () => {
    //Declare variables
    const SCROLL_BUFFER = 50; //Don't fade in the element until we scroll this many pixels INTO the element
    const fadeInElements = document.getElementsByClassName(fadeInListenerClassName);
    const windowTop = window.pageYOffset;
    const windowLeft = window.pageXOffset;
    const windowBottom = windowTop + window.innerHeight;
    const windowRight = windowLeft + window.innerWidth;

    //For each element with the fade in listener,
    // fade the element in when within the viewport
    for(const element of fadeInElements) {
      const elementRect = element.getBoundingClientRect();
      const elementTop = windowTop + elementRect.y;
      const elementLeft = windowLeft + elementRect.x;
      const elementBottom = elementTop + elementRect.height;
      const elementRight = elementLeft + elementRect.width;
      const elementIsVisible = (windowTop < elementBottom - SCROLL_BUFFER) &&
        (windowBottom > elementTop + SCROLL_BUFFER) &&
        (windowLeft < elementRight - SCROLL_BUFFER) &&
        (windowRight > elementLeft + SCROLL_BUFFER);

      if (elementIsVisible) element.classList.add(fadeInClassName);
    }
  };

  //Initialize the functionality
  if (document.getElementsByClassName(fadeInListenerClassName)) {
    window.addEventListener("scroll", fadeInOnScroll);
  }
})();
