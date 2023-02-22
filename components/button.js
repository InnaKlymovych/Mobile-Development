import Component from "./component.js";


export default class Button extends Component{
   constructor(elemID){
      super(elemID);

   }

   get onClick(){

   }
   set onClick(callBack){
      this.element.onclick = (e) => {
         callBack("button clicked");
      }
   }
};
