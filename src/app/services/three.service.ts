import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  constructor() { }

  // Controles
  private controls!: PointerLockControls;
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private prevTime = performance.now();
  private movementSpeed = 25.0; // Velocidade de movimento

  // Renderer, cena e câmera
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;

  // Variável de escala global
  scale = 1;

  // Inicializa a cena e adiciona iluminação
  public initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf4f4f4);
    this.addLighting();
    return this.scene;
  }

  // Adiciona iluminação à cena
  private addLighting() {
    const light = new THREE.HemisphereLight(0xFFFFFF, 0x080820, 2);
    this.scene.add(light);
  }

  // Inicializa a câmera com uma posição padrão
  public initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 1.7, 0); // Posição inicial da câmera
    return this.camera;
  }

  // Cria um objeto simples
  public createObj(x: number, y: number, z: number, color = 0x348feb): THREE.Mesh {
    const material = new THREE.MeshLambertMaterial({ color: color });
    return new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material);
  }

  // Cria um objeto com textura
  public createObjWithTexture(x: number, y: number, z: number, texturePath: string): THREE.Mesh {
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(x, z);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    return new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material);
  }

  // Adiciona um objeto à cena
  public addObject(object: THREE.Object3D) {
    this.scene.add(object);
  }

  // Carrega e adiciona um arquivo .obj à cena com posição e escala específicas
  public loadObj(scene: THREE.Scene ,objPath: string, position: THREE.Vector3, scale: number) {
    const loader = new OBJLoader();
    loader.load(objPath, (obj) => {
      const group = new THREE.Group();
      group.add(obj);
      group.position.copy(position);
      scene.add(group);
    });
  }

  // Carrega e adiciona um arquivo .glb à cena com posição e escala específicas
  public loadGlb(glbPath: string, position: THREE.Vector3, scale: number) {
    const loader = new GLTFLoader();
    loader.load(glbPath, (gltf) => {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.scale.set(scale, scale, scale); // Ajusta a escala do objeto
        }
      });
      const group = new THREE.Group();
      group.add(gltf.scene);
      group.position.copy(position);
      this.scene.add(group);
    });
  }

  // Define a posição de um objeto
  public setPosition(obj: THREE.Object3D, x: number, y: number, z: number) {
    obj.position.set(x, y, z);
  }

  // Inicializa o renderizador
  public initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.addControls();
    this.animate();
    return this.renderer;
  }

  // Adiciona os controles de movimento
  private addControls() {
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.moveRight = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.moveLeft = true;
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = false;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.moveRight = false;
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.moveLeft = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    const clickToStart = () => {
      this.controls.lock();
    };

    document.addEventListener('click', clickToStart);
  }

  // Função de animação responsável por atualizar a cena e a câmera
  private animate() {
    // Solicita que o navegador chame esta função antes do próximo repintura
    requestAnimationFrame(() => this.animate());

    // Verifica se os controles estão travados (o jogador está ativo)
    if (!this.controls.isLocked) return

    // Obtém o tempo atual para calcular o intervalo de tempo desde a última atualização
    const time = performance.now();
    const delta = (time - this.prevTime) / 1000; // Calcula o intervalo de tempo em segundos

    // Aplica a física de movimento de acordo com as teclas pressionadas e a velocidade
    this.velocity.x -= this.velocity.x * 10.0 * delta; // Aplica atrito no eixo X
    this.velocity.z -= this.velocity.z * 10.0 * delta; // Aplica atrito no eixo Z

    // Calcula a direção de movimento com base nas teclas pressionadas
    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
    this.direction.normalize(); // Normaliza o vetor de direção para garantir movimento consistente em todas as direções

    // Aplica a velocidade de movimento de acordo com as teclas pressionadas e a velocidade definida
    if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * this.movementSpeed * delta;
    if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * this.movementSpeed * delta;

    // Move os controles da câmera na cena com base na velocidade calculada
    this.controls.moveRight(-this.velocity.x * delta); // Move os controles para a direita ou esquerda
    this.controls.moveForward(-this.velocity.z * delta); // Move os controles para frente ou para trás

    // Atualiza o tempo anterior para o próximo ciclo de animação
    this.prevTime = time;

    // Renderiza a cena com a câmera atual
    this.renderer.render(this.scene, this.camera);
  }

  // Função que calcula a escala com base no valor fornecido e na escala global
  calcScale(value: number){
    return value * this.scale;
  }
}
