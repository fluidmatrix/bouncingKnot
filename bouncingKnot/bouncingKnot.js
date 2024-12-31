	// set the scene size
	var WIDTH = 500, HEIGHT = 500;

	// set some camera attributes
	var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 1000;

	// get the DOM element to attach to
	var $container = $('#container');

	// create a WebGL renderer, camera, and a scene
      
    var renderer = new THREE.WebGLRenderer();
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);
	 // the camera starts at 0,0,0 so pull it back
	camera.position.z = 200;    	
	// add the camera to the scene
	scene.add(camera)
   
	// set up the camera controls.  Please keep in mind that what this does is move the entire scene around.
	// because the entire scene is moving the position of the camera and lights in relation to objects within 
	// the scene doesn't change so the lighting on the surface of the object(s) will not change either
	var cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.addEventListener( 'mousemove', renderer );
    cameraControls.autoRotate = true;
      
	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	$container.append(renderer.domElement);


// Set up the scene
const scene = new THREE.Scene();

// Set up the camera with a field of view of 75, aspect ratio based on the window size,
// and a near and far clipping plane of 0.1 and 1000 respectively.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set up the WebGL renderer and make it fill the entire screen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the geometry for the torus knot (a 3D twisted shape)
const geometry = new THREE.SphereGeometry(1, 0.35, 100, 64);

// Create a standard material for the object (using mesh standard for better lighting)
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

// Create a mesh combining the geometry and material
const ball = new THREE.Mesh(geometry, material);
scene.add(ball);  // Add the mesh to the scene

// Set the initial position of the torus knot
ball.position.set(0, 0, 0);

// Set up the camera to be positioned at a distance from the origin
camera.position.z = 15;

// Add a point light to the scene with a yellow color (0xFFFFAA)
const light = new THREE.PointLight(0xFFFFAA, 1); // Light-yellow color
light.position.set(-10, 10, 10); // Position the light at the upper-left
light.castShadow = true; // Enable shadow casting from the light
scene.add(light);  // Add the light to the scene

// Optional: Set the background color of the scene
scene.background = new THREE.Color(0xFFFFAA); // Light yellow background

// Variables for the ball's movement (speed in x and y directions)
let dx = 1.10;  // Speed in the x direction
let dy = 1.05;  // Speed in the y direction

// Function to randomly change the color of the ball
function changeBallColor() {
  const randomColor = Math.random() * 0xffffff;  // Generate a random color
  ball.material.color.set(randomColor);  // Set the new random color to the ball
}

// Animation loop to continuously update the scene
function animate() {
  requestAnimationFrame(animate);  // Request the next frame

  // Move the ball in the x and y directions
  ball.position.x += dx;
  ball.position.y += dy;

  // Check for collision with the edges of the viewport (adjusted for ball size)
  // If the ball moves beyond the boundaries, reverse its direction and change its color
  if (ball.position.x > 20 || ball.position.x < -20) {
	dx = -dx;  // Reverse direction in the x axis
	changeBallColor();  // Change the color when bouncing
  }

  if (ball.position.y > 10 || ball.position.y < -10) {
	dy = -dy;  // Reverse direction in the y axis
	changeBallColor();  // Change the color when bouncing
  }

  // Render the scene with the updated camera view
  renderer.render(scene, camera);
}

// Start the animation
animate();

// Adjust the aspect ratio and renderer size when the window is resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});