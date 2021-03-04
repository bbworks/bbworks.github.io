const HeaderOnScroll = function() {
  const tagName = "header";
  const className = "header-on-scroll";
  const visibleClassName = "header-on-scroll-visible";

  const fixHeaderOnScroll = function(event) {
    const header = document.getElementsByTagName(tagName)[0];
    const windowTop = window.pageYOffset;
    const headerHeight = header.getBoundingClientRect().height;
    const containsClass = header.classList.contains(className);

    const ON_SCROLL = {
      down: {
        buffer: headerHeight, //scroll down this far before we activate
        func: "add", //when scrolling down and time to activate, ADD class
        get margin() {return this.buffer+"px"},
        get isDirty() {return windowTop > this.buffer},
        get isModifiable() {return !containsClass && this.isDirty},
      },
      up: {
        buffer: 0,  //scroll up this far before we deactivate
        func: "remove", //when scrolling down and time to activate, REMOVE class
        get margin() {return this.buffer+"px"},
        get isDirty() {return windowTop === this.buffer},
        get isModifiable() {return containsClass && this.isDirty},
      },
    }

    //Test whether we should add or remove the scroll-in class
    for (let i in ON_SCROLL) {
      let scrollDirection = ON_SCROLL[i];
      if (scrollDirection.isModifiable) {
        //add/remove the class
        header.classList[scrollDirection.func](className);

        //add/remove margin to the body
        document.body.style.marginTop = scrollDirection.margin;

        //after a neglible amount of time, add/remove the scroll-in class
        window.setTimeout(() => {header.classList[scrollDirection.func](visibleClassName);}, 50);
      }
    } //end for
  };

  this.init = function() {
    if (document.getElementsByTagName(tagName).length) {
      window.addEventListener("scroll", fixHeaderOnScroll.bind(this));
    }
  };
};

HeaderOnScroll.prototype.constructor = HeaderOnScroll;

const headerOnScroll = new HeaderOnScroll();
headerOnScroll.init();
