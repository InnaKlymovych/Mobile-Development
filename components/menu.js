import Component from "./component.js";

export default class Menu extends Comment{

   constructor(elemID){
      super(elemID);

      const menuButton = new ToggleButton("#menu-button");
      menuButton.onClick =((value) => {
         console.log("menu button", value)
         menuButton.toggle();
      }
      )
      
      this.#menuContainer = this.element.querySelector("#menu-container")
      }
      open() {
         this.#menuContainer.style.transform = "scaleY(1)"
      }
      
      close() {
         this.#menuContainer.style.transform = "scaleY(0)"
      }
   
}
