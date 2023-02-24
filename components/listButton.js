import Button from "./Button.js";

export default class ListButton extends Button{

   #ListButtonData;
   constructor (data){
      super();

      
      this.#ListButtonData = data;
      
      const divElement = document.createElement("div");

      const template = document.querySelector(".list-item");
      const clone = template.content.cloneNode(true);
      clone.querySelector("label").innerText = this.#ListButtonData.name;
      templateClone.querySelector("label").textContent =
      

      divElement.appendChild(clone);
      this.setElement(divElement);
   }
}