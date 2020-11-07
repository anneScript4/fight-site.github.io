//alias is a shortcut to make things cleaner
const {Engine, Render, Bodies, World, MouseConstraint, Composites} = Matter

//Where is matter being deployed
const sectionTag = document.querySelector("section.shapes")
const w = window.innerWidth
const h = window.innerHeight

//Engine - computation and math
const engine = Engine.create()

//Render - draws engine
const render = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    width: w,
    height: h,
    background: "black",
    wireframes: false,
    pixelRadio: window.devicePixelRatio
  }
})

//Create Trumps face
const createShape = function(x, y){
  return Bodies.rectangle(x, y, 100, 100, {
    render: {
      sprite: {
        texture: "trump-face.png",
        xScale: 0.5,
        yScale: 0.5
      }
    }
  })
}

//Create Knife
const createKnife = function(x, y){
    return Bodies.rectangle(x, y, 100, 100, {
      render: {
        sprite: {
          texture: "knife.png",
          xScale: 0.5,
          yScale: 0.5
        }
      }
    })
  }

//Ground and walls
const wallOptions = {
  isStatic: true,
  render: {
    visible: false
  }
}
const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, - 50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(- 50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)

//Mouse interaction
const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false
    }
  }
})

const initialShapes = Composites.stack(400, 400, 1, 1, 40, 40, function(x, y){
  return createShape(x, y)
})

//add to the World
World.add(engine.world, [
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl,
  initialShapes
])

// Create shape on click
document.addEventListener("click", function(event) {
  const shape = createKnife(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

//Run engine and render
Engine.run(engine)
Render.run(render)
