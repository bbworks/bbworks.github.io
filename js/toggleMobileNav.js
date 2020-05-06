const toggleMobileNav = function(navClass, navToggleClass) {
  //Get DOM elements
  const nav = document.getElementsByClassName(navClass)[0];
  const navToggle = document.getElementsByClassName(navToggleClass)[0];
  const navResponsiveClass = "responsive";
  const mobileNavToggleOpenIconClass = "fas fa-times";
  const mobileNavToggleClosedIconClass = "fa fa-bars";

  //Function to add the responsive class to nav element
  const addResponsiveClassToNav = function(navElement, responsiveClass) {
    const _navClass = responsiveClass;
    const func = (navElement.classList.contains(_navClass) ? "remove" : "add");
    navElement.classList[func](_navClass);
  };

  //Function to toggle theh mobile nav icon on mobile nav open/close
  const toggleMobileNavIcon = function(navToggleElement, closedClass, openClass) {
    //Define our open and closed classes
    const TOGGLE_CLASS = {
        MENU_CLOSED : closedClass,
        MENU_OPEN: openClass,
    };

    //Function to return whether the provided element has all provided classes
    var containsClasses = function (element, className)  {
      let returnValue = true;
      className.split(" ").forEach(c=>returnValue = returnValue && element.classList.contains(c));
      return returnValue;
    };

    //Find the current class and our desired new class
    const currentClassName = (containsClasses(navToggle, TOGGLE_CLASS.MENU_CLOSED) ? TOGGLE_CLASS.MENU_CLOSED : TOGGLE_CLASS.MENU_OPEN);
    const newClassName = (containsClasses(navToggle, TOGGLE_CLASS.MENU_CLOSED) ? TOGGLE_CLASS.MENU_OPEN : TOGGLE_CLASS.MENU_CLOSED);

    //Change the classes
    currentClassName.split(" ").forEach(c=>navToggle.classList.remove(c));
    newClassName.split(" ").forEach(c=>navToggle.classList.add(c));
  };

  addResponsiveClassToNav.call(this, nav, navResponsiveClass);
  toggleMobileNavIcon.call(this, navToggle, mobileNavToggleClosedIconClass, mobileNavToggleOpenIconClass);
}
