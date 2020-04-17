const toggleNavBars = function(navClass) {
  const nav = document.getElementsByClassName(navClass)[0];
  const className = "responsive";
  const func = (nav.classList.contains(className) ? "remove" : "add");
  nav.classList[func](className);
}
