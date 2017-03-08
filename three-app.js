var scene, camera, renderer, cameraControls;
var gui;
var values = {
    squareColor: 14494549
};

var render = function () {
    requestAnimationFrame(render);
    updateScene();
    renderer.render(scene, camera);
};

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener('change', function () { renderer.render(scene, camera); });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);

    createGUI();
    createScene();
}

function createGUI() {
    var gui = new dat.GUI();
    gui.addColor(values, 'squareColor').onChange(() => {
        let box = scene.getObjectByName('myBox');
        if (box) {
            box.material.color.set(values.squareColor);
        }
    });
}

function createScene() {
    setupLighting();
    setupCamera();
    createGeometries();
}

function updateScene() {
    updateGeometries();
    updateLighting();
    updateCamera();
}

function createGeometries() {
    let material = new THREE.MeshLambertMaterial({ color: 0x22ccddd });
    let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10,10,10),
        new THREE.MeshLambertMaterial({ color: values.squareColor })
    );
    mesh.name = 'myBox';
    scene.add(mesh);
    // scene.add(new THREE.Mesh(
    //     box,
    //     new THREE.MeshLambertMaterial({ color: values.squareColor })
    // ));
}

function updateGeometries() {
    scene.children.forEach(c => {
        c.rotation.x += .05;
        c.rotation.y += .1;
    });
}


function setupLighting() {
    let light = new THREE.PointLight(0xffffff, .5, 0);
    light.position.set(0, 400, 0);
    scene.add(light);

    let light2 = new THREE.PointLight(0xffaaaa, .3, 0);
    light2.position.set(400, 0, 0);
    scene.add(light2);

    let light3 = new THREE.PointLight(0xffffff, .1, 0);
    light3.position.set(0, 0, 400);
    scene.add(light3);

    scene.add(new THREE.AmbientLight(0xff9999, 0.7));
}

function updateLighting() {

}

function setupCamera() {
    camera.position.z = 100;
}

function updateCamera() {

}

function vec3ToString(vec) {
    return (`${vec.x},${vec.y},${vec.z}`);
}

