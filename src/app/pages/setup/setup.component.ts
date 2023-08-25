import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  options = {
    targetSelector: '#scene',
    width: 800,
    heigth: 600,
    backgroundColor: 0x141414
  }

  ngOnInit(){
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(
      this.options.width,
      this.options.heigth,
    )
    document.querySelector(this.options.targetSelector)?.append(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      this.options.backgroundColor
    )
    const camera = new THREE.PerspectiveCamera(
      50, (this.options.width/ this.options.heigth)
    );
    camera.position.z = 5;

    const light = new THREE.AmbientLight(
      0xFFFFFF, 4
    );
    scene.add(light)


    const cube = this.createCubo()
    scene.add(cube)

    renderer.setAnimationLoop(() => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera)
    })

  }

  createCubo(){
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial(
      { color: 0xecc035 }
    );

    return new THREE.Mesh(
      geometry, material
    )
  }

}
