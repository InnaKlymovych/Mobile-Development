import Component from "./Component.js";
import ToggleButton from "./ToggleButton.js";

export default class Menu extends Component{

   #menuContainer;
   #menuListsContainer;
   #menuData;
   #listsContainer;
   #isOpen = false;
   constructor(elemID , data){
      super(elemID);

      this.#menuData = data;
      const menuButton = new ToggleButton("#menu-button");
      menuButton.onClick((value) => {

            this.#isOpen = !this.#isOpen;
            this.#isOpen ? this.open() : this.close();

            console.log("menu button", value)
            menuButton.toggle();
      })

      this.#menuContainer = this.element.querySelector("#menu-container");
      this.#listsContainer = this.element.querySelector(".lists-container");
   }

   #createList(data){
      

      const ul = document.createElement("ul");
      data.forEach((itemData => {
         const listButton = new ListButton(itemData);
         ul.appendChild(listButton.element);
      }));
      
      this.#listsContainer.appendChild(ul);
   }

   #deleteList(index){
      this.#listsContainer.innerHTML = "";
   }

   open(){
      this.#createList(this.#menuData);
      this.#menuContainer.style.transform = "scaleY(1)";
   }

   close(){
      this.#deleteList();
      this.#menuContainer.style.transform = "scaleY(0)";
   }
}
