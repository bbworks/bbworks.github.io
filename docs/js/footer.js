const Footer = (function() {
  const footerHTML =
    '<footer class="footer-container">\r\n' +
      '\t<div class="footer-section footer-copyright">\r\n' +
        '\t\t&copy;2020 Bradley Biera\r\n' +
      '\t</div\r\n' +
      '\t><div class="footer-section footer-social-media">\r\n' +
        '\t\t<a class="fab fa-facebook-square" href="https://www.facebook.com/bradley.biera" target="_blank" title="Bradley Biera | Facebook"></a>\r\n' +
        '\t\t<a class="fab fa-linkedin" href="http://www.linkedin.com/in/bradley-biera-059674135/" target="_blank" title="Bradley Biera | LinkedIn"></a>\r\n' +
        '\t\t<a class="fab fa-youtube" href="https://www.youtube.com/user/BradleyBieraMusic" target="_blank" title="BradleyBieraMusic | YouTube"></a>\r\n' +
        '\t\t<a class="fab fa-github" href="https://github.com/bbworks" target="_blank" title="Bradley Biera | Github"></a>\r\n' +
      '\t</div\r\n' +
      '\t><nav class="footer-section footer-nav">\r\n' +
        '\t\t<a href="/">Home</a>\r\n' +
        '\t\t<a href="/about/">About</a>\r\n' +
        '\t\t<a href="/music/">Music</a>\r\n' +
        '\t\t<a href="/portfolio/">Portfolio</a>\r\n' +
        '\t\t<a href="/contact/">Contact</a>\r\n' +
      '\t</nav>\r\n' +
    '</footer>';

  const init = function() {
    //If we have a footer, insert our site footer HTML
    if (document.getElementsByTagName("footer")) {
      const footer = document.getElementsByTagName("footer")[0];
      footer.outerHTML = footerHTML;
    }
  };

  //Initialize the footer
  init();
})();
