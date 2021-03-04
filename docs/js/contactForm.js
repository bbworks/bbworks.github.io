const ContactForm = function() {};

ContactForm.prototype = {
  constructor: ContactForm,
  sendEmail: () => {
    const to = document.getElementById("toEmail").innerText;
    const subject = document.getElementById("contact-form-subject").value || " ";
    const body = document.getElementById("contact-form-body").value || " ";

    const url = `mailto:${window.encodeURIComponent(to)}`+
      `?subject=${window.encodeURIComponent(subject)}`+
      `&body=${window.encodeURIComponent(body)}`;
    window.open(url);
  },
}

const contactForm = new ContactForm();
