import Component from "./Component.js";

export default class Button extends Component {
  constructor(elemID, callback) {
    super(elemID, callback);

    if (this.element) this.element.onclick = () => this.callback();
  }

  setElement(element) {
    super.setElement(element);
    this.element.onclick = () => this.callback();
  }

  get text() {
    return this.element.querySelector("label").innerText;
  }
  set text(val) {
    this.element.querySelector("label").innerText = val;
  }

  get color() {
    return this.element.querySelector("label").style.color;
  }
  set color(val) {
    this.element.querySelector("label").style.color = val;
  }
}
