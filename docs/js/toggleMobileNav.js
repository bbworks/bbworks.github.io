const toggleMobileNav = function(event) {
  //Declare variables
  const toggle = event.target;
  const nav = toggle.parentNode;

  //Toggle the "responsive" class on the toggle
  nav.classList.toggle("responsive");
};
