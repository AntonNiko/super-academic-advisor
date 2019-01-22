const course_bg_color = "#66ccff";
const canvas_id = "#course-panel";


class Course {
  constructor(ctx, x, y){
    this.height = 30;
    this.width = 50;
    this.x = 0;
    this.y = 0;
    this.draw(ctx, x, y);
  }

  draw(ctx, x, y){
    ctx.fillStyle = course_bg_color;
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(x || 0, y || 0, this.width, this.height);
    this.x = x;
    this.y = y;
  }

  mouse_inside(x, y){
    console.log("Shape x: "+this.x+"->"+(this.x+this.width));
    console.log("Shape y: "+this.y+"->"+(this.y+this.width));
    var result = (this.x <= x) && (this.x + this.width >= x) &&
                 (this.y <= y) && (this.y + this.height >= y);
    return result;
  }
}

class CanvasState {
  constructor(canvas){
    this.canvas = canvas;
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;
    this.ctx = canvas.getContext("2d");
    this.dragging = false;
    this.dragoffx = 0;
    this.dragoffy = 0;

    this.valid = false;
    this.courses_list = [];

    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
      this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
      this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
      this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
      this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;


    var canvas_state = this;

    this.canvas.addEventListener("mousedown", function(e){
      var mouse_coordinates = canvas_state.getMouseCoordinates(e);
      if(canvas_state.courses_list[0].mouse_inside(mouse_coordinates.x, mouse_coordinates.y)){
        canvas_state.dragoffx = mouse_coordinates.x - canvas_state.courses_list[0].x;
        canvas_state.dragoffy = mouse_coordinates.y - canvas_state.courses_list[0].y;
        canvas_state.dragging = true;
        canvas_state.valid = false;
        console.log("INSIDE!!!");
      }
    }, true);

    this.canvas.addEventListener("mousemove", function(e){
      var mouse_coordinates = canvas_state.getMouseCoordinates(e);
      if(canvas_state.dragging){

        //var mouse_coordinates = canvas_state.getMouseCoordinates(e);
        //canvas_state.refresh(mouse_coordinates.x, mouse_coordinates.y);
      }
    }, true);

    this.canvas.addEventListener("mouseup", function(e){
      canvas_state.dragging = false;
    }, true)
  }

  addCourse(x, y){
    var new_shape = new Course(this.ctx, x, y);
    this.courses_list.push(new_shape);
  }

  refresh(x, y){
    this.courses_list[0].draw(this.ctx, x, y);
  }

  getMouseCoordinates(e){
    // GIVE CREDIT https://github.com/simonsarris/Canvas-tutorials/blob/master/shapes.js
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    if(element.offsetParent !== undefined){
      do {
        offsetX+=element.offsetLeft;
        offsetY+=element.offsetTop;
      }while((element = element.offsetParent));
    }

    offsetX+=this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY+=this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

   mx = e.pageX - offsetX;
   my = e.pageY - offsetY;
   return {x: mx, y: my};
  }
}

var canvas_state = new CanvasState(document.querySelector(canvas_id));
canvas_state.addCourse(0, 0);
