const Slideshow = function(slideshowId) {
  let slideIndex = 0;
  const slideTimer = 5000;
  let timerId;

  const slideshow = document.getElementById(slideshowId);
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  const resetTimer = function() {
    if (timerId !== -1) {
      window.clearInterval(timerId);
    }
    timerId = window.setInterval(this.nextSlide.bind(this, 1), slideTimer);
  };

  const renderSlideshow = function(index) {
    const currentIndex = slideIndex;
    const _index = (index + slides.length) % slides.length; //to assure we dont' get a negative
    slideIndex = _index;
    const slideSize = slides[currentIndex].getBoundingClientRect().width;

    //Hide or show each slide
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const display = (i === _index || i === currentIndex ? "block" : "none");
      const marginLeft = (i === _index ? slideSize+"px" : (i === currentIndex ? "-"+slideSize+"px" : 0));
      const transition = (i === _index || i === currentIndex ? "margin-left 2s" : "none");
      const active = i === _index;
      const func = (i === _index ? "add" : "remove");

      if (i === _index) {
        slide.classList.add("current-slide");
        slide.classList.remove("previous-slide");
      }
      else {
        slide.classList.remove("current-slide");
        if (i === currentIndex) {
          slide.classList.add("previous-slide");
        }
        else {
          slide.classList.remove("previous-slide");
        }
      }
      dots[i].classList[func]("active");
    }
  };

  this.nextSlide = function(index, reset) {
    renderSlideshow.call(this, slideIndex + index);
    if (reset) {
      resetTimer.apply(this);
    }
  };

  this.setSlide = function(index) {
    resetTimer.apply(this); //reset the timer whenever we manually change the slide
    renderSlideshow.call(this, index);
  };

  this.stop = function() {
    window.clearInterval(timerId);
  };

  //Display our slideshow
  renderSlideshow.call(this, slideIndex);

  //Set the timer
  timerId = window.setInterval(this.nextSlide.bind(this, 1), slideTimer);
};
