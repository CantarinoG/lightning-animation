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

//Add meshes
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),
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
            child.material = new THREE.MeshBasicMaterial({ color: 0x999999 });
        }
    });
    scene.add(duck1);
    duck1.position.set(-1, 0, 1);

    duck2 = gltf.scene.clone();
    duck2.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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