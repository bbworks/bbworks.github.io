const Header = (function() {
  const headerHTML =
    '<header class="header-container">\r\n' +
      '\t<nav class="header-nav">\r\n' +
      '\t\t<a class="header-logo" href="/"><h1>Bradley Biera</h1></a>\r\n' +
      '\t\t<div class="header-nav-container">\r\n' +
          '\t\t\t<a class="header-nav-item" href="/">Home</a\r\n' +
          '\t\t\t><a class="header-nav-item" href="/about/">About</a\r\n' +
          '\t\t\t><a class="header-nav-item" href="/music/">Music</a\r\n' +
          '\t\t\t><a class="header-nav-item" href="/portfolio/">Portfolio</a\r\n' +
          '\t\t\t><a class="header-nav-item" href="/contact/">Contact</a>\r\n' +
        '\t\t</div\r\n' +
        '\t\t><a class="header-nav-item mobile-nav-toggle fa fa-bars" href="javascript:void(0);" onclick="toggleMobileNav(&quot;header-nav&quot;,&quot;header-nav-container&quot;,&quot;mobile-nav-toggle&quot;)"></a>\r\n' +
      '\t</nav>\r\n' +
    '</header>';

  const init = function() {
    //If we have a header, insert our site header HTML
    if (document.getElementsByTagName("header")) {
      const header = document.getElementsByTagName("header")[0];
      header.outerHTML = headerHTML;
    }
  };

  //Initialize the header
  init();
}());
