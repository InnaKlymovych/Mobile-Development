import Button from "./components/Button.js";
import RangeBar from "./components/RangeBar.js";
import ToggleButton from "./components/ToggleButton.js";
import Menu from "./components/menu.js";

let appData;

window.onload=async () => {
   const req = await fetch("app_data.json");
   appData = await req.json();
   console.log(appData);
   
   setupLayout();
}
const setupLayout = () => {

const previousButton = new Button("#previous-button");
previousButton.onClick = (value) => {
   console.log('previous button', value)
}

const volumeBar = new RangeBar("#volume");
volumeBar.onChange((value) => {
   console.log("volume changed", value)
});


const button = new ToggleButton("#action-button");
button.onClick = (value) => {
   console.log('toggle button', value);
   button.toggle(1);
}



const infoButton = new ToggleButton("#info-button");
infoButton.onClick = (value) => {
   console.log("info button", value)
   infoButton.toggle();
}

const menu = new Menu("#menu", appData);
};

const nextButton = new Button("#next-button");
nextButton.onClick((value) => {
   console.log('next button', value)
}) 

const infoButton = new ToggleButton("#info-button");
infoButton.onClick((value) => {
   console.log("info button", value)
   infoButton.toggle();
})