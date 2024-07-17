//Initialize scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

//Initialize controls
const controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.staticMoving = true;

//Add lighting
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFF00, 0.5);
directionalLight.position.set(0, 5, 0);
scene.add(directionalLight);

const spotLight1 = new THREE.SpotLight(0xFF0000);
spotLight1.position.set(0, 1, 0);
spotLight1.target.position.set(0, 0, 0);
spotLight1.angle = Math.PI;
spotLight1.penumbra = 0.1;
spotLight1.castShadow = true;
spotLight1.intensity = 4;
scene.add(spotLight1);
scene.add(spotLight1.target);

const spotLight2 = new THREE.SpotLight(0x00FF00);
spotLight2.position.set(0, 1, 0);
spotLight2.target.position.set(0, 0, 0);
spotLight2.angle = Math.PI;
spotLight2.penumbra = 0.1;
spotLight2.castShadow = true;
spotLight2.intensity = 4;
scene.add(spotLight2);
scene.add(spotLight2.target);

const spotLight3 = new THREE.SpotLight(0x0000FF);
spotLight3.position.set(0, 1, 0);
spotLight3.target.position.set(0, 0, 0);
spotLight3.angle = Math.PI;
spotLight3.penumbra = 0.1;
spotLight3.castShadow = true;
spotLight3.intensity = 4;
scene.add(spotLight3);
scene.add(spotLight3.target);

//Add meshes
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshPhongMaterial({ color: 0xEEEEEE, shininess: 10000 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

let duck1;
let duck2;
const loader = new THREE.GLTFLoader();
loader.load('./assets/duck/Duck.gltf', (gltf) => {
    duck1 = gltf.scene;
    duck1.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshLambertMaterial({ color: 0xFFAAAA });
        }
    });
    scene.add(duck1);
    duck1.position.set(-1, 0, 1);

    duck2 = gltf.scene.clone();
    duck2.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshPhongMaterial({ color: 0xAAAAFF, shininess: 10000 });
        }
    });
    scene.add(duck2);
    duck2.rotation.y = -Math.PI / 2;
    duck2.position.set(1, 0, -1);
});

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();