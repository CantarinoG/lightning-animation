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
spotLight1.intensity = 4;
scene.add(spotLight1);
scene.add(spotLight1.target);

const spotLight2 = new THREE.SpotLight(0x00FF00);
spotLight2.position.set(0, 1, 0);
spotLight2.target.position.set(0, 0, 0);
spotLight2.angle = Math.PI;
spotLight2.penumbra = 0.1;
spotLight2.intensity = 4;
scene.add(spotLight2);
scene.add(spotLight2.target);

const spotLight3 = new THREE.SpotLight(0x0000FF);
spotLight3.position.set(0, 1, 0);
spotLight3.target.position.set(0, 0, 0);
spotLight3.angle = Math.PI;
spotLight3.penumbra = 0.1;
spotLight3.intensity = 4;
scene.add(spotLight3);
scene.add(spotLight3.target);

//Add meshes
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF, shininess: 10000 }),
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

    animate();
});

//Animate loop
const radius = 2;
const angIncreaseRate = 0.05;
const lightIntensity = 10;
const flickeringRate = 5;
const danceIntensity = 0.2;
const danceSpeed = 5;
let shouldDance = true;
let ang = 0;
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    spotLight1.position.x = radius * Math.cos(ang);
    spotLight1.position.z = radius * Math.sin(ang);
    spotLight1.intensity = (lightIntensity / 2) * (Math.cos(ang * flickeringRate) + 1);

    spotLight2.position.x = radius * Math.cos(ang + 2);
    spotLight2.position.z = radius * Math.sin(ang + 2);
    spotLight2.intensity = (lightIntensity / 2) * (Math.cos(ang * flickeringRate) + 1);

    spotLight3.position.x = radius * Math.cos(ang + 4);
    spotLight3.position.z = radius * Math.sin(ang + 4);
    spotLight3.intensity = (lightIntensity / 2) * (Math.cos(ang * flickeringRate) + 1);

    if (shouldDance) {
        duck1.position.y = (danceIntensity / 2) * (Math.sin(ang * danceSpeed) + 1);
        duck1.rotation.z = (danceIntensity / 2) * Math.sin(ang * danceSpeed);

        duck2.position.y = (danceIntensity / 2) * (Math.sin(ang * danceSpeed) + 1);
        duck2.rotation.z = (danceIntensity / 2) * Math.sin(ang * danceSpeed);
    }

    ang += angIncreaseRate;

    renderer.render(scene, camera);
}

//DOM Manipulation
const danceOption = document.getElementById("dance_option");
danceOption.addEventListener("change", function () {
    if (this.checked) {
        shouldDance = true;
    } else {
        shouldDance = false;
        duck1.position.set(-1, 0, 1);
        duck2.position.set(1, 0, -1);
    }
});

const ambientOption = document.getElementById("ambient_option");
ambientOption.addEventListener("change", function () {
    if (this.checked) {
        scene.add(ambientLight);
    } else {
        scene.remove(ambientLight);
    }
});

const directionalOption = document.getElementById("directional_option");
directionalOption.addEventListener("change", function () {
    if (this.checked) {
        scene.add(directionalLight);
    } else {
        scene.remove(directionalLight);
    }
});

const spotlightOption = document.getElementById("spotlight_option");
spotlightOption.addEventListener("change", function () {
    if (this.checked) {
        scene.add(spotLight1);
        scene.add(spotLight2);
        scene.add(spotLight3);
    } else {
        scene.remove(spotLight1);
        scene.remove(spotLight2);
        scene.remove(spotLight3);
    }
});
