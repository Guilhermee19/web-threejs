import { Component, OnInit, HostListener } from '@angular/core';
import { NOCLAF_511, TObject3D } from 'src/app/constants/noclaf';
import { ThreeService } from 'src/app/services/three.service';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.adjustWindowSize();
  }

  constructor(
    public threeService: ThreeService
  ){}

  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;

  noclaf: TObject3D[] = NOCLAF_511

  ngOnInit() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.addElements();

    setTimeout(() => {
      this.adjustWindowSize();
    }, 10);
  }

  private initScene() {
    this.scene = this.threeService.initScene();
  }

  private initCamera() {
    this.camera = this.threeService.initCamera();
  }

  private async initRenderer() {
    const container = document.getElementById('scene') as HTMLDivElement;
    this.renderer = await this.threeService.initRenderer();
    await container.appendChild(this.renderer.domElement);
  }

  private addElements() {
    this.noclaf.forEach(el => {
      if(el.type === 'IMG'){
        const floor = this.threeService.createObjWithTexture(
          el.width, el.height, el.depth, el.texture
        );
        this.threeService.setPosition(floor, el.position.x, el.position.y, el.position.z);
        this.scene.add(floor);
      }
      else if(el.type === 'OBJ'){
        const floor = this.threeService.createObj( el.width, el.height, el.depth, el.color);
        this.threeService.setPosition(floor, el.position.x, el.position.y, el.position.z);
        this.scene.add(floor);
      }
      else if(el.type === 'GLB'){
          const loader = new OBJLoader();
          loader.load(el.url_obj, (object) => {
          // Ajustar a posição do objeto
          object.position.set(el.position.x, el.position.y, el.position.z); // Exemplo: X, Y, Z

          // Criar material com cor
          const material = new THREE.MeshBasicMaterial({ color: 0xf6c837 }); // Vermelho

          // Aplicar o material ao objeto
          object.traverse(function (child) {
              if (child instanceof THREE.Mesh) {
                  child.material = material;
              }
          });

          // Ajustar a escala do objeto
          object.scale.set(el.width, el.height, el.depth); // Exemplo: Escala X, Y, Z

          this.scene.add(object);
        }
      );
        // const position = new THREE.Vector3(el.position.x, el.position.y, el.position.z); // Ajuste conforme necessário
        // this.threeService.loadObj(this.scene, el.texture, position, 1);
      }
    });
  }


  private adjustWindowSize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
