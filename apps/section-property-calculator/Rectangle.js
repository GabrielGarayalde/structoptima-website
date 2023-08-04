import { drawRect } from "./grid.js";

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = Rectangle.all.length;
    Rectangle.all.push(this);
  }

  get right() {
    if (this.w < 0) {
      return this.x;
    } else {
      return this.x + this.w;
    }
  }
  get bottom() {
    if (this.h < 0) {
      return this.y;
    } else {
      return this.y + this.h;
    }
  }
  get top() {
    if (this.h < 0) {
      return this.y + this.h;
    } else {
      return this.y;
    }
  }
  get left() {
    if (this.w < 0) {
      return this.x + this.w;
    } else {
      return this.x;
    }
  }

  render() {
    drawRect(this.x, this.y, this.w, this.h, "lightgrey");
  }

  delete() {
    Rectangle.all.splice(this.i, 1);
  }

  static all = [];
}

export default Rectangle;
