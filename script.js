window.onload = ()=> {
   const volumeSlider = document.querySelector("input");

   const changeSliderValue = () => {
      document.documentElement.style.setProperty(
         "--slider-position",
         `${volumeSlider.value}%`
      );
   };
   volumeSlider.addEventListener("input", changeSliderValue);

};