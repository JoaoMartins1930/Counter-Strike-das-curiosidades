var renderer = null,
    scene = null,
    camera = null,
    mesh = null;   // The three.js object that represents the model
var arma;
var velocidade = 1.5;
var camera1, camera2;
var direcao = 0;
var rotacao = 0;
var disparo = false;
var balas = [];
var ak;
var eixo;
var camera1Ativada = true;
var obstaculos = [];
var caixa_cima;
var controls;
var boneco;
var acertosAnimate = 0;
var mexer = "subir";
var nBalas = 30;
var matou = false;
var cur = 0;

window.onload = function init() {
    // Create the Three.js renderer
    renderer = new THREE.WebGLRenderer();
    // Set the viewport 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#AAAAAA");
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    // Create a new Three.js scene
    scene = new THREE.Scene();

    //CAMERA PARA TESTES

    // // Add  a camera so we can view the scene
    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    // camera.position.y = 30;
    // scene.add(camera);


    //controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function () { renderer.render(scene, camera); });


    //camera menos aproximada

    camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    scene.add(camera1);

    //camera mais aproximada
    camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    scene.add(camera2);

    var directionalLight = new THREE.DirectionalLight({ color: "white" });
    directionalLight.position.y = 90;
    directionalLight.position.x = 75;
    directionalLight.castShadow = true;

    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 600;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;

    directionalLight.shadow.mapSize.width = 2000;
    directionalLight.shadow.mapSize.height = 2000;

    scene.add(directionalLight);

    // var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(helper);


    //INTERIOR

    var texture = new THREE.TextureLoader().load('images/tejoleira2.jpg');

    //chão
    var geometry = new THREE.PlaneGeometry(250, 350);
    var material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, flatShading: true, wireframe: false });
    var chao = new THREE.Mesh(geometry, material);
    chao.rotation.x = Math.PI / 2;
    chao.receiveShadow = true;
    scene.add(chao);


    var texture = new THREE.TextureLoader().load('images/parede.jpg');

    //teto
    var geometry = new THREE.PlaneGeometry(250, 150);
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, flatShading: true, wireframe: false });
    var teto = new THREE.Mesh(geometry, material);
    teto.rotation.x = Math.PI / 2
    teto.position.y = 90;
    scene.add(teto);

    //paredes
    var geometry2 = new THREE.PlaneGeometry(150, 90);
    var material2 = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var parede_esquerda = new THREE.Mesh(geometry2, material2);
    parede_esquerda.rotation.y = Math.PI / 2
    parede_esquerda.position.x = -125
    parede_esquerda.position.y = 45
    scene.add(parede_esquerda);

    obstaculos.push(parede_esquerda);

    var parede_direita = new THREE.Mesh(geometry2, material2);
    parede_direita.rotation.y = Math.PI / 2
    parede_direita.position.x = 125
    parede_direita.position.y = 45
    scene.add(parede_direita);

    obstaculos.push(parede_direita);


    var geometry = new THREE.PlaneGeometry(105, 90);
    var parede_frente_esq = new THREE.Mesh(geometry, material2);
    parede_frente_esq.position.set(-72.5, 45, 75);
    scene.add(parede_frente_esq);

    obstaculos.push(parede_frente_esq);


    var geometry = new THREE.PlaneGeometry(80, 90);
    var parede_frente_dir = new THREE.Mesh(geometry, material2);
    parede_frente_dir.position.set(85, 45, 75);
    scene.add(parede_frente_dir);

    obstaculos.push(parede_frente_dir);


    var geometry = new THREE.PlaneGeometry(120, 90);
    var parede_tras_dir = new THREE.Mesh(geometry, material2);
    parede_tras_dir.position.set(65, 45, -75);
    scene.add(parede_tras_dir);

    obstaculos.push(parede_tras_dir);



    var geometry = new THREE.PlaneGeometry(55, 90);
    var parede_tras_esq = new THREE.Mesh(geometry, material2);
    parede_tras_esq.position.set(-97.5, 45, -75);
    scene.add(parede_tras_esq);

    obstaculos.push(parede_tras_esq);



    var geometry = new THREE.PlaneGeometry(80, 90);
    var parede_frente_esq2 = new THREE.Mesh(geometry, material2);
    parede_frente_esq2.rotation.y = Math.PI / 2;
    parede_frente_esq2.position.set(-20, 45, 115);
    scene.add(parede_frente_esq2);

    obstaculos.push(parede_frente_esq2);



    var parede_frente_dir2 = new THREE.Mesh(geometry, material2);
    parede_frente_dir2.rotation.y = Math.PI / 2;
    parede_frente_dir2.position.set(45, 45, 115);
    scene.add(parede_frente_dir2);

    obstaculos.push(parede_frente_dir2);


    var geometry = new THREE.PlaneGeometry(80, 65);
    var tetoTunelPequeno = new THREE.Mesh(geometry, material2);
    tetoTunelPequeno.rotation.x = Math.PI / 2;
    tetoTunelPequeno.rotation.z = Math.PI / 2;
    tetoTunelPequeno.position.set(12.5, 90, 115)
    scene.add(tetoTunelPequeno);

    obstaculos.push(tetoTunelPequeno);


    var geometry = new THREE.PlaneGeometry(100, 90);
    var parede_tras_esq2 = new THREE.Mesh(geometry, material2);
    parede_tras_esq2.rotation.y = Math.PI / 2
    parede_tras_esq2.position.set(-70, 45, -125);
    scene.add(parede_tras_esq2);

    obstaculos.push(parede_tras_esq2);


    var parede_tras_dir2 = new THREE.Mesh(geometry, material2);
    parede_tras_dir2.rotation.y = Math.PI / 2
    parede_tras_dir2.position.set(5, 45, -125);
    scene.add(parede_tras_dir2);

    obstaculos.push(parede_tras_dir2);



    var geometry = new THREE.PlaneGeometry(100, 75);
    var tetoTunelPequeno = new THREE.Mesh(geometry, material2);
    tetoTunelPequeno.rotation.x = Math.PI / 2;
    tetoTunelPequeno.rotation.z = Math.PI / 2;
    tetoTunelPequeno.position.set(-32.5, 90, -125)
    scene.add(tetoTunelPequeno);

    obstaculos.push(tetoTunelPequeno);


    //caixas
    var texture = new THREE.TextureLoader().load('images/madeira.jpg')

    var geometry3 = new THREE.BoxGeometry(20, 25, 40);
    var material3 = new THREE.MeshPhongMaterial({ map: texture });
    var caixa_baixo = new THREE.Mesh(geometry3, material3);
    caixa_baixo.position.set(-110, 12.5, -50);
    caixa_baixo.castShadow = true;
    scene.add(caixa_baixo);

    obstaculos.push(caixa_baixo);



    caixa_cima = new THREE.Mesh(geometry3, material3);
    caixa_cima.position.set(-110, 37.5, -50);
    caixa_cima.rotation.y = Math.PI / 17;
    caixa_cima.castShadow = true;
    scene.add(caixa_cima);

    obstaculos.push(caixa_cima);



    var texture = new THREE.TextureLoader().load('images/madeira.jpg')

    var geometry = new THREE.BoxGeometry(15, 12, 30);
    var caixa_pequena = new THREE.Mesh(geometry, material3);
    caixa_pequena.position.set(30, 6, -30);
    caixa_pequena.rotation.y = -Math.PI / 15;
    caixa_pequena.castShadow = true;
    caixa_pequena.receiveShadow = true;
    scene.add(caixa_pequena);

    obstaculos.push(caixa_pequena);



    //barril
    var texture = new THREE.TextureLoader().load('images/barril.jpg')

    var geometry = new THREE.CylinderGeometry(8, 8, 25, 20);
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var barril = new THREE.Mesh(geometry, material);
    barril.position.set(-110, 12.5, 60);
    barril.rotation.y = -Math.PI / 2
    barril.castShadow = true;
    barril.receiveShadow = true;
    scene.add(barril);

    obstaculos.push(barril);


    //cano
    var texture = new THREE.TextureLoader().load('images/tubo.jpg')

    var geometry = new THREE.CylinderGeometry(2, 2, 90, 20);
    var material4 = new THREE.MeshPhongMaterial({ map: texture });
    var cano = new THREE.Mesh(geometry, material4);
    cano.position.set(115, 45, 65);
    cano.castShadow = true;
    scene.add(cano);

    obstaculos.push(cano);


    var geometry = new THREE.BoxGeometry(7, 2, 7);
    var base_cano = new THREE.Mesh(geometry, material4);
    base_cano.position.set(115, 1, 65);
    scene.add(base_cano)

    obstaculos.push(base_cano);



    //pilares

    //pilar1
    var texture = new THREE.TextureLoader().load('images/azulejo.jpg');

    var geometry = new THREE.BoxGeometry(15, 3, 15);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(128, 128, 128)" });
    var pilar1_base = new THREE.Mesh(geometry, material);
    pilar1_base.position.set(-40, 1.5, 60);
    pilar1_base.castShadow = true;
    scene.add(pilar1_base)

    obstaculos.push(pilar1_base);

    var geometry = new THREE.BoxGeometry(12, 2, 12);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(102, 102, 102)" });
    var pilar1_base2 = new THREE.Mesh(geometry, material);
    pilar1_base2.position.set(-40, 4, 60);
    pilar1_base2.castShadow = true;
    scene.add(pilar1_base2)

    obstaculos.push(pilar1_base2);


    var geometry = new THREE.CylinderGeometry(5, 5, 80, 20);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(51, 51, 51)" });
    var pilar1 = new THREE.Mesh(geometry, material);
    pilar1.position.set(-40, 45, 60);
    pilar1.castShadow = true;
    scene.add(pilar1);

    obstaculos.push(pilar1);


    var geometry = new THREE.BoxGeometry(12, 2, 12);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(102, 102, 102)" });
    var pilar1_base2 = new THREE.Mesh(geometry, material);
    pilar1_base2.position.set(-40, 86, 60);
    pilar1_base2.castShadow = true;
    scene.add(pilar1_base2)

    obstaculos.push(pilar1_base2);


    var geometry = new THREE.BoxGeometry(15, 3, 15);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(128, 128, 128)" });
    var pilar1_base = new THREE.Mesh(geometry, material);
    pilar1_base.position.set(-40, 88.5, 60);
    pilar1_base.castShadow = true;
    scene.add(pilar1_base);

    obstaculos.push(pilar1_base);



    //pilar2
    var geometry = new THREE.BoxGeometry(15, 3, 15);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(128, 128, 128)" });
    var pilar2_base = new THREE.Mesh(geometry, material);
    pilar2_base.position.set(80, 1.5, -50);
    pilar2_base.castShadow = true;
    scene.add(pilar2_base)

    obstaculos.push(pilar2_base);


    var geometry = new THREE.BoxGeometry(12, 2, 12);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(102, 102, 102)" });
    var pilar2_base2 = new THREE.Mesh(geometry, material);
    pilar2_base2.position.set(80, 4, -50);
    pilar2_base2.castShadow = true;
    scene.add(pilar2_base2);

    obstaculos.push(pilar2_base2);


    var geometry = new THREE.CylinderGeometry(5, 5, 80, 20);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(51, 51, 51)" });
    var pilar2 = new THREE.Mesh(geometry, material);
    pilar2.position.set(80, 45, -50);
    pilar2.castShadow = true;
    scene.add(pilar2);

    obstaculos.push(pilar2);


    var geometry = new THREE.BoxGeometry(12, 2, 12);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(102, 102, 102)" });
    var pilar2_base2 = new THREE.Mesh(geometry, material);
    pilar2_base2.position.set(80, 86, -50);
    pilar2_base2.castShadow = true;
    scene.add(pilar2_base2);

    obstaculos.push(pilar2_base2);


    var geometry = new THREE.BoxGeometry(15, 3, 15);
    var material = new THREE.MeshPhongMaterial({ color: "rgb(128, 128, 128)" });
    var pilar2_base = new THREE.Mesh(geometry, material);
    pilar2_base.position.set(80, 88.5, -50);
    pilar2_base.castShadow = true;
    scene.add(pilar2_base);

    obstaculos.push(pilar2_base);


    //céu

    var texture = new THREE.TextureLoader().load('./images/ceu.jpg');

    var geometry = new THREE.SphereGeometry(750, 64, 64);
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var ceu = new THREE.Mesh(geometry, material);
    scene.add(ceu);


    //fora

    var texture1 = new THREE.TextureLoader().load('images/sand.jpg')
    var texture3 = new THREE.TextureLoader().load('images/brick.jpeg');

    var geometry = new THREE.PlaneGeometry(250, 350);
    var material = new THREE.MeshPhongMaterial({ map: texture1, side: THREE.DoubleSide });
    var chao_fora = new THREE.Mesh(geometry, material);
    chao_fora.rotation.x = Math.PI / 2;
    chao_fora.position.set(0,0,-350)
    chao_fora.receiveShadow = true
    scene.add(chao_fora);


    var geometry = new THREE.PlaneGeometry(350, 90);
    var material = new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide });
    var parede_esquerda_fora = new THREE.Mesh(geometry, material);
    parede_esquerda_fora.rotation.y = Math.PI / 2
    parede_esquerda_fora.position.set(-125,0,-350)
    scene.add(parede_esquerda_fora);
    obstaculos.push(parede_esquerda_fora)

    var geometry = new THREE.PlaneGeometry(350, 90);
    var material = new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide });
    var parede_direita_fora = new THREE.Mesh(geometry, material);
    parede_direita_fora.rotation.y = Math.PI / 2
    parede_direita_fora.position.set(125,0,-350)
    scene.add(parede_direita_fora);
    obstaculos.push(parede_direita_fora)

    var geometry = new THREE.PlaneGeometry(250, 90);
    var material = new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide });
    var parede_frente_fora = new THREE.Mesh(geometry, material);
    //parede_frente_fora.rotation.y = Math.PI / 2
    parede_frente_fora.position.set(0,0,-525)
    scene.add(parede_frente_fora);
    obstaculos.push(parede_frente_fora)

    var geometry = new THREE.PlaneGeometry(150, 90);
    var material = new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide });
    var parede_tras_direita_fora = new THREE.Mesh(geometry, material);
    //parede_frente_fora.rotation.y = Math.PI / 2
    parede_tras_direita_fora.position.set(80,0,-175)
    scene.add(parede_tras_direita_fora);
    obstaculos.push(parede_tras_direita_fora)

    var geometry = new THREE.PlaneGeometry(60, 90);
    var material = new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide });
    var parede_tras_esquerda_fora = new THREE.Mesh(geometry, material);
    //parede_frente_fora.rotation.y = Math.PI / 2
    parede_tras_esquerda_fora.position.set(-100,0,-175)
    scene.add(parede_tras_esquerda_fora);
    obstaculos.push(parede_tras_esquerda_fora)

    //caixas
    var texture = new THREE.TextureLoader().load('images/madeira.jpg')

    var geometry3 = new THREE.BoxGeometry(20, 25, 40);
    var material3 = new THREE.MeshPhongMaterial({ map: texture });
    var caixa_baixo1 = new THREE.Mesh(geometry3, material3);
    caixa_baixo1.position.set(-110, 12.5, -450)
    caixa_baixo1.castShadow = true
    scene.add(caixa_baixo1);
    obstaculos.push(caixa_baixo1)


    var geometry3 = new THREE.BoxGeometry(50, 25, 40);
    var material3 = new THREE.MeshPhongMaterial({ map: texture });
    var caixa_baixo = new THREE.Mesh(geometry3, material3);
    caixa_baixo.position.set(100, 12.5, -195)
    caixa_baixo.castShadow = true
    scene.add(caixa_baixo);
    obstaculos.push(caixa_baixo)


    var texture = new THREE.TextureLoader().load('images/outro.jpg')

    var geometry3 = new THREE.BoxGeometry(40, 27, 40);
    var material3 = new THREE.MeshPhongMaterial({ map: texture });
    var caixa_palete = new THREE.Mesh(geometry3, material3);
    caixa_palete.position.set(-14.5, 20, -303)
    caixa_palete.castShadow = true
    scene.add(caixa_palete);
    obstaculos.push(caixa_palete)


    var textureMadeira = new THREE.TextureLoader().load('images/madeira.jpg')
    var materialMadeira = new THREE.MeshPhongMaterial({ map: textureMadeira });
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("./models/palete.mtl", function (materials) {
        materials.preload(); //load a material's resource
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./models/');
        objLoader.load("palete.obj", function (object) { //load a geometry resource
            palete = object;
            palete.children[0].material = materialMadeira
            palete.position.set(-10,0,-300)
            palete.scale.set(0.2, 0.2, 0.2)
            palete.castShadow = true
            scene.add(palete);
            obstaculos.push(palete)
        })
    })   

    //barril
    var texture = new THREE.TextureLoader().load('images/barril.jpg')

    var geometry = new THREE.CylinderGeometry(8, 8, 25, 20);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    var barril1 = new THREE.Mesh(geometry, material);
    barril1.position.set(0, 12.5, -500);
    barril1.rotation.y = -Math.PI / 2
    barril1.castShadow = true;
    scene.add(barril1);
    obstaculos.push(barril1)

    var geometry = new THREE.CylinderGeometry(8, 8, 25, 20);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    var barril2 = new THREE.Mesh(geometry, material);
    barril2.position.set(100, 12.5, -400);
    barril2.rotation.y = -Math.PI / 2
    barril2.castShadow = true;
    scene.add(barril2);
    obstaculos.push(barril2)


    //portao
    var texture = new THREE.TextureLoader().load('./images/Portao.jpg')

    var geometry = new THREE.BoxGeometry(5, 40, 65);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var portao = new THREE.Mesh(geometry, material);
    portao.position.set(12.5, 20, 152.5);
    portao.rotation.y = Math.PI / 2;
    //portao.castShadow = true;
    scene.add(portao);

    obstaculos.push(portao);

    //ak

    eixo = new THREE.Object3D;
    eixo.position.y = 30;
    eixo.position.z = 90;
    eixo.position.x = 10;
    scene.add(eixo);

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("./models/AK2.mtl", function (materials) {
        materials.preload(); //load a material's resource
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("./models/");
        objLoader.load("AK2.obj", function (object) { //load a geometry resource
            ak = object;
            ak.position.z = 5;
            ak.position.x = 12;
            ak.rotation.y = Math.PI;
            ak.scale.set(0.01, 0.01, 0.01)
            ak.castShadow = true;
            ak.receiveShadow = true;
            eixo.add(ak);

        })
    })


    //inimigo

    var texture = new THREE.TextureLoader().load('images/hitler.jpg');
    var geometry = new THREE.BoxGeometry(15, 15, 15);
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    boneco = new THREE.Mesh(geometry, material);
    boneco.position.y = 25;
    boneco.position.x = 50;
    scene.add(boneco);

    animate();
}

document.onkeydown = function handleKeyDown(event) {

    var key = String.fromCharCode(event.keyCode);

    if (key == "W") {
        direcao = 1;
    }
    if (key == "S") {
        direcao = -1;
    }
    if (key == "D") {
        rotacao = 1;
    }
    if (key == "A") {
        rotacao = -1;
    }
    if (key == "1") {
        console.log(key)
        camera1Ativada = true;
    }
    else if (key == "2") {
        console.log(key)
        camera1Ativada = false
    }
}

document.onkeyup = function handleKeyDown(event) {
    var key = String.fromCharCode(event.keyCode);

    if (key == "W") {
        direcao = 0;
        console.log("rrrrrrrr")
    }
    if (key == "S") {
        direcao = 0;
    }
    if (key == "D") {
        rotacao = 0;
    }
    if (key == "A") {
        rotacao = 0;
    }
}


function clicar()
{
    //crate bullet (sphere geometry)
    var geometry = new THREE.SphereGeometry(1, 5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var sphere = new THREE.Mesh(geometry, material);

    //buller position
    sphere.position = ak.position.clone();

    sphere.position.x += 1220;
    sphere.position.z += 3000;
    sphere.position.y += 300;

    sphere.position.applyMatrix4(ak.matrixWorld);


    var a = new THREE.Vector3(0, 0, 1)
    sphere.direcao = a.applyMatrix4(new THREE.Matrix4().extractRotation(ak.matrixWorld));
    scene.add(sphere);
    sphere.inc = 0;
    disparo = true;
    balas.push(sphere);
    nBalas--;

    document.getElementById("Numero_balas").innerHTML = "Balas: " + nBalas+ "/30"
}

window.addEventListener("click", clicar)

function colisao() {

    var gun = new THREE.Box3().setFromObject(eixo);

    for (var i = 0; i < obstaculos.length; i++) {

        var objetos = new THREE.Box3().setFromObject(obstaculos[i]);

        var collision = gun.intersectsBox(objetos);

        if (collision == true) {
            return true;
        }
    }
    return false;
}

function disparar() {
    for (var i = 0; i < balas.length; i++) {

        var bullet = new THREE.Box3().setFromObject(balas[i]);

        var objetos = new THREE.Box3().setFromObject(boneco);

        var collision2 = bullet.intersectsBox(objetos);

        if (collision2 == true) {
            scene.remove(balas[i]);
            balas.splice(i, 1);
            i--;
            return true;
        }
    }
    return false;
}

function morrer() {
    var gun = new THREE.Box3().setFromObject(eixo);

    var objetos = new THREE.Box3().setFromObject(boneco);

    var collision3 = gun.intersectsBox(objetos);

    return collision3;
}

function animate() {

    var ultRotEixo = eixo.rotation.y;

    var ultPosEixo = eixo.position.clone();

    if (rotacao == 1) {
        eixo.rotation.y -= 0.03;

        if(morrer()){
            window.alert("Perdeste! Não podes tocar nos inimigos!");
            window.open("index.html", "_self");
        }

        if (colisao()) {
            eixo.rotation.y = ultRotEixo;
        }
    }
    else if (rotacao == -1) {
        eixo.rotation.y += 0.03;

        if(morrer()){
            window.alert("Perdeste! Não podes tocar nos inimigos!");
            window.open("index.html", "_self");
        }

        if (colisao()) {
            eixo.rotation.y = ultRotEixo;
        }
    }

    if (direcao == 1) {
        eixo.position.z -= velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x -= velocidade * Math.sin(eixo.rotation.y);

        if(morrer()){
            window.alert("Perdeste! Não podes tocar nos inimigos!");
            window.open("index.html", "_self");
        }

        if (colisao()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;
        }
    }
    else if (direcao == -1) {
        eixo.position.z += velocidade * Math.cos(eixo.rotation.y);

        eixo.position.x += velocidade * Math.sin(eixo.rotation.y);

        if(morrer()){
            window.alert("Perdeste! Não podes tocar nos inimigos!");
            window.open("index.html", "_self");
        }

        if (colisao()) {
            eixo.position.x = ultPosEixo.x;
            eixo.position.z = ultPosEixo.z;
        }
    }

    if (disparo == true) {
        for (var i = 0; i < balas.length; i++) {
            //update buller position (make it move)
            var n = balas[i].direcao.clone();
            balas[i].position.addVectors(balas[i].position.clone(), n.multiplyScalar(balas[i].inc));
            balas[i].inc += 4;
            if (disparar()) {
                if(acertosAnimate != 12 && nBalas <= 0)
                {
                     window.alert("Perdeste! Gastaste todas as tuas balas!");
                     window.open("index.html", "_self");
                }
                else if (acertosAnimate == 0 && nBalas > 0) {
                    window.alert("Nasceu na pequena aldeia de Cabanas de Viriato, concelho do Carregal do Sal, no sul do Distrito de Viseu a 19 de Julho de 1885");
                    boneco.position.y = 35;
                    boneco.position.x = -70;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 1 && nBalas > 0) {
                    window.alert("Formou-se em Direito pela Universidade de Coimbra ao lado do seu irmão gémeo, quando tinha 22 anos de idade");
                    boneco.position.y = 35;
                    boneco.position.x = -70;
                    boneco.position.z = -400;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 2 && nBalas > 0) {
                    window.alert("Em 1908 casa-se com a sua prima Angelina, com quem viria a ter 14 filhos");
                    boneco.position.y = 35;
                    boneco.position.x = 70;
                    boneco.position.z = -300;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 3 && nBalas > 0) {
                    window.alert("Começou a sua carreira diplomática muito jovem e em 1910 tornou-se cônsul de Demerara na Guiana britânica.");
                    boneco.position.y = 35;
                    boneco.position.x = 10;
                    boneco.position.z = 100;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 4 && nBalas > 0) {
                    window.alert("Durante a Segunda Grande Guerra, sob a ditadura de Salazar, Portugal era uma nação alegadamente “neutra”, ainda que de forma bem evidente e não oficial, fosse pró-Hitler");
                    boneco.position.y = 35;
                    boneco.position.x = 100;
                    boneco.position.z = -500;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 5 && nBalas > 0) {
                    window.alert("O governo português emitiu a perversa “Circular 14” a todos os seus diplomatas, negando refúgio seguro aos refugiados, incluindo explicitamente Judeus, Russos e apátridas");
                    boneco.position.y = 35;
                    boneco.position.x = -40;
                    boneco.position.z = -100;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 6 && nBalas > 0) {
                    window.alert("O cônsul português trabalha incessantemente na emissão de vistos, juntamente com dois dos seus filhos, sem parar sequer para comer. Nesses três dias, foram emitidos 30.000 vistos");
                    boneco.position.y = 35;
                    boneco.position.x = 100;
                    boneco.position.z = -250;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 7 && nBalas > 0) {
                    window.alert("Este homem foi severamente castigado por Salazar que lhe retirou o seu cargo e lhe negou qualquer forma de garantir um sustento, o que se revelou trágico, uma vez que Sousa Mendes tinha imensos filhos");
                    boneco.position.y = 35;
                    boneco.position.x = -40;
                    boneco.position.z = 10;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }

                else if (acertosAnimate == 8 && nBalas > 0) {
                    window.alert("A Comunidade Judaica de Lisboa providencia à família abrigo e alimentação, ajudando alguns dos seus filhos a mudar-se para os Estados Unidos ou para o Canadá");
                    boneco.position.y = 35;
                    boneco.position.x = 100;
                    boneco.position.z = -350;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 9 && nBalas > 0) {
                    window.alert("Morre a 3 de Abril de 1954 na miséria, mas de consciência tranquila após os seus atos heroicos");
                    boneco.position.y = 35;
                    boneco.position.x = -100;
                    boneco.position.z = -500;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 10 && nBalas > 0) {
                    window.alert("O primeiro reconhecimento veio em 1966 de Israel que o declarou “Justo entre as Nações”. Em 1986, o Congresso dos Estados Unidos emitiu uma proclamação em honra do seu ato heroico");
                    boneco.position.y = 35;
                    boneco.position.x = -30;
                    boneco.position.z = -90;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13"
                }
                else if (acertosAnimate == 11 && nBalas > 0) {
                    window.alert("Mais tarde foi finalmente reconhecido por Portugal, tendo o Presidente da República de então, Mário Soares, apresentado desculpas à família e o Parlamento português promoveu-o postumamente à categoria de embaixador.");
                    boneco.position.y = 35;
                    boneco.position.x = -50;
                    cur++;
                    document.getElementById("Curiosidades").innerHTML = "Curiosidades:" + cur+ "/13";
                }
                else if (acertosAnimate == 12 && nBalas > 0) {
                    window.alert("Parabéns! Já sabe de quem estamos a falar? Que mundo é este em que é preciso ser louco para fazer o que é certo?, Aristides de Sousa Mendes ");
                    window.open("index.html", "_self");
                }
                acertosAnimate++;               
            }
        }
    }

    if(acertosAnimate != 12 && nBalas <= 0)
    {
        window.alert("Perdeste! Gastaste todas as tuas balas!");
        window.open("index.html", "_self");
    }

    // camera TO object relative offset
    if (ak) {
        if (camera1Ativada == true) {
            var relativeOffset = new THREE.Vector3(-2, 15, 65);
            // updates (multiplies) the offset with the object's global transformation matrix
            var cameraOffset = relativeOffset.applyMatrix4(eixo.matrixWorld);

            camera1.position.copy(cameraOffset);

            // camera looks at the object's position
            camera1.lookAt(eixo.position);

            renderer.render(scene, camera1);
        }
        else {
            var relativeOffset = new THREE.Vector3(-2, 7, 20);
            // updates (multiplies) the offset with the object's global transformation matrix
            var cameraOffset = relativeOffset.applyMatrix4(eixo.matrixWorld);

            camera2.position.copy(cameraOffset);

            // camera looks at the object's position
            camera2.lookAt(eixo.position);
            renderer.render(scene, camera2);
        }
    }

    if(boneco.position.y == 80)
    {
        mexer = "descer";
    }
    else if(boneco.position.y == 10)
    {
        mexer = "subir";
    }

    if(mexer == "subir")
    {
        boneco.position.y += 1;
    }
    else if(mexer == "descer")
    {
        boneco.position.y -= 1;
    }
    

    //renderer.render(scene, camera);
    requestAnimationFrame(animate);
}