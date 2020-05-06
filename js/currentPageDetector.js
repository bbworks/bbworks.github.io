const CurrentPageDetector = function() {
  let headerNavContainerNodes = document.getElementsByClassName("header-nav-container")[0].childNodes;
  for(var i in headerNavContainerNodes) {
    let element = headerNavContainerNodes[i];
    if (element.href && element.href === window.location.href) {
      element.classList.add("current");
    }
  }
}();
