(function() {
  //Declare variables
  const headerQuery = ".header"; //query to retrieve desired element
  const headerFixedClassName = "header-on-scroll-fixed";
  const headerFixedVisibleClassName = "visible";

  //Declare functions
  const fixHeaderToTop = () => {
    const header = document.querySelector(headerQuery);
    const windowTop = window.pageYOffset;
    const headerHeight = header.getBoundingClientRect().height;
    const containsClass = header.classList.contains(headerFixedClassName);
    const buffer = {
      down: headerHeight,
      up: 0,
    };

    //If the header should be fixed to the top
    // i.e. if we scrolled past our downward buffer
    // and the class has yet to be added
    if (!containsClass && windowTop > buffer.down) {
      //Add the class to fix the header to the top
      header.classList.add(headerFixedClassName);

      //Add the margin on the body
      document.body.style.marginTop = buffer.down+"px";

      //After a short delay, add the class to make the fixed header slide in
      window.setTimeout(
        () => header.classList.add(headerFixedVisibleClassName),
        50
      );
    }
    //Otherwise, if the header should no longer be fixed to the top
    // i.e. if we scrolled above our upward buffer
    // and the class is still added
    else if (containsClass && windowTop <= buffer.up) {
      //Remove the class to fix the header to the top
      header.classList.remove(headerFixedClassName);

      //Remove the margin on the body
      document.body.style.marginTop = buffer.up+"px";

      //Remove the class to make the fixed header slide in
      header.classList.remove(headerFixedVisibleClassName);
    }
  };

  ////Initialize the functionality
  if (document.querySelector(headerQuery)) {
    window.addEventListener("scroll", fixHeaderToTop);
  }
})();
