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
    console.log(x+", "+y);
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

    var canvas_state = this;

    this.canvas.addEventListener("mousedown", function(e){
      if(canvas_state.courses_list[0].mouse_inside(e.pageX, e.pageY)){
        console.log("inside");
      }else{
        console.log("outside");
      }
      canvas_state.dragging = true;
      canvas_state.valid = false;
    }, true);

    this.canvas.addEventListener("mousemove", function(e){
      if(canvas_state.dragging){
        var x = e.pageX;
        var y = e.pageY;
        canvas_state.refresh(x, y);
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
}

var canvas_state = new CanvasState(document.querySelector(canvas_id));
canvas_state.addCourse(50, 30);
