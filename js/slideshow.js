const Slideshow = function(slideshowId) {
  let slideIndex = 0;
  const slideTimer = 5000;
  let timerId;

  const slideshow = document.getElementById("slideshow") || null;
  const slides = document.getElementsByClassName("slide") || null;
  const dots = document.getElementsByClassName("slideshow-dot") || null;

  const slideshowData = [
    {
    	src: "assets/hero/1_IMG_5647.JPG",
      style: null,
    	caption: "Married: ✔️"
    },
    {
    	src: "assets/hero/2_20191116_092722000_iOS.jpg",
      style: null,
    	caption: "*snuggle snuggle*"
    },
    {
    	src: "assets/hero/3_109A0503.jpg",
      style: "object-position: 50% 40%;",
    	caption: "Marriage swag"
    },
    {
    	src: "assets/hero/4_IMG_0185.jpg",
      style: null,
    	caption: "*kissy kissy*"
    },
    {
    	src: "assets/hero/5_20190726_225717000_iOS.jpg",
      style: "object-position: 50% 60%;",
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

  const updateCssClasses = function() {
    //Always query for it each time (in case it changes size--we won't have stale data)
    const slideWidth = document.getElementsByClassName("slide")[0].getBoundingClientRect().width + "px";

    //Update the slides' left position to the full width so they seemlessly slide in from the right
    getCssRule(".slide").style.left = slideWidth;

    //Update the previous slide's left position to the full width so they seemlessly slide out to the left
    getCssRule(".previous-slide").style.left = "-"+slideWidth;
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

    //Update the CSS classes with the correct slide width (in case it changed)
    updateCssClasses.call(this);

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

  this.init = function() {
    if (document.getElementById(slideshowId)) {
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
};

const slideshow = new Slideshow("slideshow");
slideshow.init();
