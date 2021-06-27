
const rad = 20;

class node {
    lvl = 1;
    selected = false
    left = null;
    right = null;
    parent = null;
    constructor(x, y, value, canvas) {
      this.x = x;
      this.y = y;
      this.value= value;
      this.canvas =canvas
      this.context = canvas.getContext("2d");
    }
    cutCircle(){
        this.context.arc(this.x, this.y, rad, 0, Math.PI*2, true);
        this.context.fill();
    }

    select(){

        this.selected = true;

        this.draw();
    }
    deselect(){

        this.selected = false;

        this.draw();
    }

    setRight(val){
        this.right = new node( this.x + (110/(this.lvl)) , this.y + (110/(this.lvl)), val, this.canvas)
        this.right.parent = this;
        this.right.lvl = this.lvl + 0.5;
        this.right.draw()
        this.connect(this.right)
    }
    setLeft(val){
        this.left = new node( this.x - (110/(this.lvl)) , this.y + (110/(this.lvl)), val, this.canvas)
        this.left.parent = this;
        this.left.lvl = this.lvl + 0.5;
        this.left.draw()
        this.connect(this.left)
    }

    draw(){
        var ctx = this.context
        ctx.beginPath();
        
            ctx.globalCompositeOperation = 'destination-out'
            ctx.arc(this.x, this.y, rad, 0, 2 * Math.PI);
            ctx.fill();
        
        ctx.globalCompositeOperation='destination-over';
        ctx.font = "25px Arial";
        ctx.fillText(this.value, this.x-13, this.y+10);
        ctx.arc(this.x, this.y, rad, 0, 2 * Math.PI);
        ctx.stroke();
        if(this.selected){
        ctx.fillStyle = "pink"
        }
        else{
            ctx.fillStyle = "white"
        }
        ctx.fill();
        ctx.fillStyle = "black"
        
        
    }

    connect(circle){
        var xx = circle.x;
        var yy = circle.y;
        var ctx = this.context
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(xx, yy);
        ctx.stroke();
    }
}

class Tree{
    constructor(value, can) {
        this.root = new node(350,50, value, can)
        this.root.draw()

    }
}

var gameTree;
var temp; 
var display;
var disval = 14;
function preOrderTraverse(node) {
    if (node != null) {
        node.deselect();
        this.preOrderTraverse(node.left);
        this.preOrderTraverse(node.right);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function start(){
    
    var cn = document.getElementById("yes")
    disval = getRandomInt(10,99)
    display = new node(70, 35, disval, cn)
    display.draw();
    gameTree = new Tree(50, cn)
    gameTree.root.select();
}


document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {

    preOrderTraverse(gameTree.root);
    var keyCode = e.keyCode;
    if(keyCode == 39){

        if(temp == null){
            if(gameTree.root.right != null){
                if(disval > gameTree.root.value){
                    temp = gameTree.root.right;
                    temp.select();
                }
                else{
                    alert("ошибка")
                }
            }
            else{
                if(disval > gameTree.root.value){
                    gameTree.root.setRight(disval)
                    gameTree.root.select();
                    disval = getRandomInt(10,99)
                    display.value = disval;
                    display.draw();
                }
                else{
                    alert("ошибка")
                }

            }  
        }
        else{
            if(temp.right != null){
                if(disval > temp.value){
                    temp = temp.right;
                    temp.select();
                }
                else{
                    alert("ошибка")
                    
                }

            }
            else{
                if(disval > temp.value){
                    temp.setRight(disval)
                    temp = null;
                    gameTree.root.select();
                    disval = getRandomInt(10,99)
                    display.value = disval;
                    display.draw();
                }
                else{
                    alert("ошибка")
                    
                }
            }
        }

    }
    if(keyCode == 37){

        if(temp == null){
            if(gameTree.root.left != null){
                if(disval <= gameTree.root.value){
                    temp = gameTree.root.left;
                    temp.select();
                }
                else{
                    alert("ошибка")
                }
            }
            else{
                if(disval <= gameTree.root.value){
                    gameTree.root.setLeft(disval)
                    gameTree.root.select();
                    disval = getRandomInt(10,99)
                    display.value = disval;
                    display.draw();
                }
                else{
                    alert("ошибка")
                }

            }    
        }
        else{
            if(temp.left != null){
                if(disval <= temp.value){
                    temp = temp.left;
                    temp.select();
                }
                else{
                    alert("ошибка")

                }
            }
            else{
                if(disval <= temp.value){
                    temp.setLeft(disval)
                    temp = null;
                    gameTree.root.select();
                    disval = getRandomInt(10,99)
                    display.value = disval;
                    display.draw();
                }
                else{
                    alert("ошибка")
                }
                
            }
        }

    }
    if(keyCode == 38){

        if(temp == null){
            return;
        }
        else{
            if(temp.parent != null){
                temp = temp.parent;
                temp.select();
            }
        }

    }
}

start();