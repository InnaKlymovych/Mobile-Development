import Component from "./component.js";


export default class Button extends Component{
   
   callback;
   constructor(elemID){
      super(elemID);

   }

   onClick(callback){
      this.element.onclick = () => {
         callback("toggle button");
      }
   }
};
