const Slideshow = function(slideshowSelector) {
  //Declare variables
  const slideshowContainer = document.querySelector(slideshowSelector) || null;
  let slideshow;
  const fullScreenClassName = "slideshow-full-screen";

  //Declare global variables
  let slides = [];
  let slideshowDots = [];
  let slideIndex = 0;
  const slideTimer = 10000;
  let slideshowTimerId;


  //Declare functions
  const fetchSlideshowData = function(dataFilePath, callback) {
    //Create function to retrive slideshow data
    fetch(dataFilePath)
      .then(response=>response.json())
      .then(data=>callback(data))
      .catch(err=>{console.error("Failed to get slideshow data.", err);});
  };

  const createDOMNode = function(HTML) {
    const container = document.createElement("div");
    container.innerHTML = HTML;
    return container.firstChild;
  };

  const createSlideshow = function() {
    return createDOMNode(`<div class="slideshow"></div>`);
  };

  const createSlide = function(imageSrc, title, caption, number, objectPositionCSS) {
    objectPositionCSS = `object-position: ${objectPositionCSS || "none"};`;
    return createDOMNode(`<div class="slide">
        <img class="slide-image" src="${imageSrc}" style="${objectPositionCSS}"/>
        <!-- <div class="slide-number">${number}</div> -->
        <!-- <div class="slide-text-section slide-title">${title}</div> -->
        <div class="slide-text-section slide-description">${caption}</div>
      </div>`);
  };

  const createSlideshowButton = function(type) {
    let styleClass;
    let iconClasses = [];
    let onClick;

    switch (type) {
      case "left":
        styleClass = "slide-left-button";
        iconClasses = ["fas", "fa-angle-left"];
        onClick = ()=>previous();
        break;
      case "right":
        styleClass = "slide-right-button";
        iconClasses = ["fas", "fa-angle-right"];
        onClick = ()=>next();
        break;
      default:
        break;
    }

    const element = createDOMNode(`<button class="slideshow-arrow-button ${styleClass}" type="button">
      <i class="${iconClasses.join(" ")}"></i>
    </button>`);
    element.addEventListener("click", onClick);
    return element
  };

  const createSlideshowDotContainer = function() {
    return createDOMNode(`<div class="slideshow-dot-container"></div>`);
  };

  const createSlideshowDot = function(index) {
    const element = createDOMNode(`<span class="slideshow-dot"></span>`);
    element.addEventListener("click", ()=>setSlide(index));
    return element;
  };

  const createSlideshowCollapseButton = function(index) {
    return createDOMNode(`<button class="slideshow-fullscreen-collapse-button" type="button"><i class="fas fa-times"></i></button>`);
  };

  const createSlideshowExpandButton = function(index) {
    return createDOMNode(`<a class="slideshow-fullscreen-expand" href="javascript:void(0);"></a>`);
  };

  const buildSlideshow = function(slideshowData) {
    slideshowContainer.classList.add("slideshow-container");
    slideshow = createSlideshow();

    //Create and append a slide for each slide object
    slides = slideshowData.map((slide, i) => createSlide(slide.src, i+1, slide.caption, `${i+1}/${slideshowData.length}`, slide.style));
    slides.forEach(slide=>slideshow.appendChild(slide));

    //Create and append the left and right arrow buttons
    const buttons = {
      left: createSlideshowButton("left"),
      right: createSlideshowButton("right"),
    };
    Object.values(buttons).forEach(button=>slideshow.appendChild(button));

    //Create the slideshow dots and their container
    const slideshowDotContainer = createSlideshowDotContainer();
    slideshowDots = slides.map((slide, i)=>createSlideshowDot(i));

    slideshowDots.forEach(dot=>slideshowDotContainer.appendChild(dot));
    slideshow.appendChild(slideshowDotContainer);

    //Create and append the slideshow full screen collapse "X" button to the slideshow
    const slideshowCollapse = createSlideshowCollapseButton();
    slideshowCollapse.addEventListener("click", closeFullScreen);
    slideshow.appendChild(slideshowCollapse);

    //Create and append the slideshow full screen expand open link
    const slideshowExpand = createSlideshowExpandButton();
    // slideshow.appendChild(slideshowExpand);

    //Append the slideshow to the container
    slideshowContainer.appendChild(slideshow);

    //Attach event listeners
     slideshow.addEventListener("click", openFullScreen);
  };

  const renderSlideshow = function(index) {
    //Declare variables
    const previousIndex = slideIndex;
    const currentIndex = (index + slides.length) % slides.length; //to assure we dont' get a negative
    slideIndex = currentIndex;

    //Hide or show each slide
    slides.forEach((slide, i)=>{
      const visibility = (i === currentIndex || i === previousIndex ? "visible" : "hidden");
      const func = (i === currentIndex ? "add" : "remove");

      //If this is the current slide, mark it as such
      // and assure it is not marked as the previous slide
      if (i === currentIndex) {
        slide.classList.add("current-slide");
        slide.classList.remove("previous-slide");
        slideshowDots[i].classList.add("active"); //Make the current dot darken
      }
      //Otherwise,
      else {
        //Assure it is not marked as the current slide
        slide.classList.remove("current-slide");
        slideshowDots[i].classList.remove("active");

        //If it is the now previous slide, mark it as such,
        // or assure it is not marked as such
        if (i === previousIndex) {
          slide.classList.add("previous-slide");
        }
        else {
          slide.classList.remove("previous-slide");
        }
      }

      //Make older slides invisible
      slide.style.visibility = visibility;
    });
  };

  const resetTimer = () => { //arrow function to keep binding on this (Slideshow)
    //Clear the timer
    stop();

    //Start the slideshow timer again
    start();
  };

  const setSlide = function(index) {
    renderSlideshow(index);
    resetTimer(); //reset the timer whenever we manually change the slide
  };

  const previous = function() {
    setSlide(slideIndex - 1);
  };

  const next = function() {
    setSlide(slideIndex + 1);
  };

  const start = function() {
    slideshowTimerId = window.setInterval(next, slideTimer);
  };

  const stop = function() {
    window.clearInterval(slideshowTimerId);
  };

  const slideshowOnClick = function (event) {
    const slideshowRect = slideshow.getBoundingClientRect();
    if (!(
	    (slideshowRect.x <= event.clientX) &&
	    (slideshowRect.y <= event.clientY) &&
	    (slideshowRect.x + slideshowRect.width >= event.clientX) &&
	    (slideshowRect.y + slideshowRect.height >= event.clientY))
	  ) {
      closeFullScreen();
    }
  };

  const slideshowOnKeyUp = function (event) {
    if (event.keyCode === 27 /*Esc*/) {
      closeFullScreen();
    }
  };

  const openFullScreen = function(event) {
    //Do nothing if switching slides or closing slideshow
    if (event.target.classList.contains("slideshow-dot") ||
      event.target.classList.contains("slideshow-arrow-button") ||
      event.target.classList.contains("slideshow-fullscreen-collapse-button") ||
      event.target.parentNode.classList.contains("slideshow-fullscreen-collapse-button")
    ) {
      return;
    }

    //Launch the slideshow into fullscreen, and set up event listeners
    // to listen for when fullscreen should close
    if (!slideshowContainer.classList.contains(fullScreenClassName)) {
      slideshowContainer.classList.add(fullScreenClassName);
      window.addEventListener("mouseup", slideshowOnClick);
      window.addEventListener("touchend", slideshowOnClick);
      window.addEventListener("keyup", slideshowOnKeyUp);
      slideshow.removeEventListener("click", openFullScreen);
    }
  };

  const closeFullScreen = function() {
    //Do nothing if switching slides
    if (event.target.classList.contains("slideshow-dot") ||
      event.target.classList.contains("slideshow-arrow-button")
    ) {
      return;
    }

    //Collapse the slideshow fullscreen, and remove  event listeners
    // used to listen for when fullscreen should close
    if (slideshowContainer.classList.contains(fullScreenClassName)) {
      slideshowContainer.classList.remove(fullScreenClassName);
      window.removeEventListener("mouseup", slideshowOnClick);
      window.removeEventListener("touchend", slideshowOnClick);
      window.removeEventListener("keyup", slideshowOnKeyUp);
      slideshow.addEventListener("click", openFullScreen);
    }
  };

  const init = function() {
    if (document.querySelector(slideshowSelector)) {
      //Assure the slideshow selector is empty
      slideshowContainer.innerHTML = '';

      //Fetch the slideshow data and create/render the slideshow to the page
      fetchSlideshowData("/js/slideshow.json.js", slideshowData=>{
        //Create the slideshow
        buildSlideshow(slideshowData);

        //Display our slideshow
        renderSlideshow(slideIndex);

        start();
        //Start the slideshow timer
      });
    }
  };

  init();
};

const slideshow = new Slideshow("#slideshow");
