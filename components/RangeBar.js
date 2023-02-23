import Component from "./component.js";
export default class RangeBar extends Component{
   
   #rangeContainer;
   #rangeInput;
   #rangeBar;

   constructor (rangeID = null){

   super(rangeID);
   
   this.#rangeInput = this.element.querySelector("input[type='range']");
   this.#rangeBar = this.element.querySelector(".range-bar");
   this.#rangeInput.addEventListener("input" , () => {
      
   this.#rangeBar.style.transform = this.element.querySelector

   });
   

   }
   onChange(callback){
      this.#rangeInput.oninput = () => {
         this.#rangeBar.style.transform = `scaleX(${this.#rangeInput.value / 100})`;
         callback(this.#rangeInput.value);
      };  
   }
}