// Custom JavaScript for Premier Automotriz
$(document).ready(function () {
  // Smooth scrolling for anchor links
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 70,
          },
          1000
        );
        return false;
      }
    }
  });

  // Initialize WOW.js for animations
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  // Video controls
  $("#video-volume").click(function (e) {
    e.preventDefault();
    const $this = $(this);
    if ($this.hasClass("fa-volume-xmark")) {
      $this.removeClass("fa-volume-xmark").addClass("fa-volume-high");
      // Unmute video logic here
    } else {
      $this.removeClass("fa-volume-high").addClass("fa-volume-xmark");
      // Mute video logic here
    }
  });

  $("#video-play").click(function (e) {
    e.preventDefault();
    const $this = $(this);
    if ($this.hasClass("fa-pause")) {
      $this.removeClass("fa-pause").addClass("fa-play");
      // Pause video logic here
    } else {
      $this.removeClass("fa-play").addClass("fa-pause");
      // Play video logic here
    }
  });

  // Navbar background on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar-custom").addClass("navbar-scrolled");
    } else {
      $(".navbar-custom").removeClass("navbar-scrolled");
    }
  });

  // Preloader
  $(window).on("load", function () {
    $("#preloader").fadeOut("slow");
  });
});
