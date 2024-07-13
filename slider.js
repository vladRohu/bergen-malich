document.addEventListener("DOMContentLoaded", function() {
  var scrollContainer = document.querySelector(".slider");
  var sliderDots = document.querySelector(".slider-dots");

  var slides = document.querySelectorAll(".program-con");
  slides.forEach(function(_, index) {
    var dot = document.createElement("span");
    dot.classList.add("slider-dot");
    dot.addEventListener("click", function() {
      goToSlide(index);
    });
    sliderDots.appendChild(dot);
  });

  function updateActiveDot() {
    var scrollLeft = scrollContainer.scrollLeft;
    var containerWidth = scrollContainer.offsetWidth;
    var scrollWidth = scrollContainer.scrollWidth;
    var currentSlideIndex = Math.round(
      (scrollLeft / (scrollWidth - containerWidth)) * (slides.length - 1)
    );

    var dots = document.querySelectorAll(".slider-dot");
    dots.forEach(function(dot, index) {
      if (index === currentSlideIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  updateActiveDot();

  scrollContainer.addEventListener("scroll", updateActiveDot);

  function goToSlide(index) {
    var slideWidth = slides[0].offsetWidth;
    scrollContainer.scrollLeft = index * slideWidth;
    updateActiveDot();
  }
});
