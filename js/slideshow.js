const Slideshow = function(slideshowContainerClassName) {
  let slideIndex = 0;
  const slideTimer = 5000;
  let timerId;

  const slideshowContainer = document.getElementsByClassName(slideshowContainerClassName)[0] || null;
  const slideshow = document.createElement("div");
  slideshow.classList.add("slideshow");
  slideshowContainer.appendChild(slideshow);
  const slides = document.getElementsByClassName("slide") || null;
  const dots = document.getElementsByClassName("slideshow-dot") || null;

  const fullScreenClassName = "slideshow-full-screen";

  const slideshowData = [
    {
    	src: "assets/hero/1_IMG_5647.jpg",
      style: null,
    	caption: "Married: ✔️"
    },
    {
    	src: "assets/hero/2_20191116_092722000_iOS.jpg",
      style: null,
    	caption: "*snuggle snuggle*"
    },
    {
    	src: "assets/hero/3_109A0482.jpg",
      style: "object-position: 50% 40%;",
    	caption: "Marriage swag"
    },
    {
    	src: "assets/hero/4_109A0403.jpg",
      style: "object-position: 50% 50%;",
    	caption: "*kissy kissy*"
    },
    {
    	src: "assets/hero/5_IMG_0035.jpg",
      style: null,
    	caption: "Engagement | Chastain Park, Atlanta, Georgia."
    },
    {
    	src: "assets/hero/6_IMG_3377.jpg",
      style: "object-position: 50% 30%;",
    	caption: "USC Upstate Honors Program | \"Excellence in Leadership and Service\" Award | 2015 - 2016"
    },
    {
    	src: "assets/hero/7_IMG_6280.jpg",
      style: "object-position: 50% 90%;",
    	caption: "Awanita | Brookwood Church Switch Camp | July 2017"
    },
  ];

  const insertSlideshowHtml = function() {
    let numOfSlides = slideshowData.length;
    let html = [];

    //For each slide object, create dynamic HTML for the slide
    for (let i in slideshowData) {
      let slide = slideshowData[i];
      let index = Number(i)+1;
      let styleAttribute = (slide.style ? "style=\""+slide.style+"\" " : "");

      html.push(
        `<div class="slide">\r\n`+
    		`\t<img src="${slide.src}" class="slide-image" ${styleAttribute}/>\r\n`+
    		`\t<div class="slide-number">\r\n`+
    		`\t\t${index}/${numOfSlides}\r\n`+
    		`\t</div>\r\n`+
    		`\t<div class="slideshow-title-container">\r\n`+
    		`\t\t<div class="slideshow-title">\r\n`+
    		`\t\t\t${index}\r\n`+
    		`\t\t</div>\r\n`+
    		`\t</div>\r\n`+
    		`\t<div class="slideshow-description-container">\r\n`+
    		`\t\t<div class="slideshow-description">\r\n`+
    		`\t\t\t${slide.caption}\r\n`+
    		`\t\t</div>\r\n`+
    		`\t</div>\r\n`+
        `</div>`
      );
    } //end for

    //Add the .slide-left-button and .slide-right-button
    const buttons = [
      "<a class=\"fas fa-angle-left slide-left-button\" onclick=\"slideshow.nextSlide(-1, true)\"></a>",
      "<a class=\"fas fa-angle-right slide-right-button\" onclick=\"slideshow.nextSlide(1, true)\"></a>"
    ]
    buttons.forEach((button) => html.push(button));

    //Add the .slideshow-dots
    const slideshowDotsDiv = document.createElement("div");
    slideshowDotsDiv.classList.add("slideshow-dot-container");
    let slideshowDots = [];
    for(let i = 0; i < numOfSlides; i++) {
      slideshowDots.push(`<span class="fas fa-circle slideshow-dot" onclick="slideshow.setSlide(${i});"></span>`);
    }
    slideshowDotsDiv.innerHTML = slideshowDots.join("\r\n");
    html.push(slideshowDotsDiv.outerHTML);

    //Add the slideshow full screen "X"
    html.push("<a href=\"javascript:void(0);\" onclick=\"slideshow.closeFullScreen();\"><i class=\"slideshow-close fas fa-times\"></i></a>");

    //Add the slideshow full screen open link
    html.push("<a class=\"slideshow-open\" href=\"javascript:void(0);\" onclick=\"slideshow.openFullScreen();\"></a>");

    //Insert the final HTML into the #slideshow
    slideshow.innerHTML = html.join("\r\n");
  };

  const getCssRule = function(selector) {
      for (let i in document.styleSheets) {
      	let cssRules = document.styleSheets[i].cssRules;
  	    for (let j in cssRules) {
      		let cssRule = cssRules[j];
      		if (cssRule.selectorText === selector) {
      			return cssRule;
      		}
      	}
      }
      return false;
  };

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

    //Hide or show each slide
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const opacity = (i === _index || i === currentIndex ? 1 : 0);
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
      slide.style.opacity = opacity; //Make older slides disappear
      dots[i].classList[func]("active"); //Make the current dot darken
    }
  };

  const slideshowFullScreenOnClick = function(event) {
    if (event.srcElement === slideshowContainer) {
      this.closeFullScreen();
    }
  }.bind(this);

  const slideshowFullScreenOnKeyUp = function(event) {
    if (event.keyCode === 27 /*Esc*/) {
      this.closeFullScreen();
    }
  }.bind(this);

  this.init = function() {
    if (document.getElementsByClassName(slideshowContainerClassName).length) {
      //Dynamically build the slideshow HTML
      insertSlideshowHtml.apply(this);

      //Display our slideshow
      renderSlideshow.call(this, slideIndex);

      //Set the timer
      timerId = window.setInterval(this.nextSlide.bind(this, 1), slideTimer);
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

  this.start = function() {
    this.init();
  }

  this.openFullScreen = function() {
    if (!slideshowContainer.classList.contains(fullScreenClassName)) {
      slideshowContainer.classList.add(fullScreenClassName);
      window.addEventListener("click", slideshowFullScreenOnClick);
      window.addEventListener("keyup", slideshowFullScreenOnKeyUp);
    }
  };

  this.closeFullScreen = function() {
    if (slideshowContainer.classList.contains(fullScreenClassName)) {
      slideshowContainer.classList.remove(fullScreenClassName);
      window.removeEventListener("click", slideshowFullScreenOnClick);
      window.removeEventListener("keyup", slideshowFullScreenOnKeyUp);
    }
  };
};

const slideshow = new Slideshow("slideshow-container");
slideshow.init();
