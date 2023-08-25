import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  ngOnInit(){
    const container = document.getElementById( 'scene' ) as HTMLDivElement;

    const renderer = new THREE.WebGLRenderer(
      { antialias: true } // Retira o pixelado q pode ficar das pontas
    );
    renderer.setPixelRatio(
      window.devicePixelRatio // Deixa da maxima qualidade possivel do computador
    )
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x141414 );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.04 ).texture;

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set( 5, 2, 8 );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0.5, 0 );
    controls.update();
    controls.enablePan = true;
    controls.enableDamping = true;

    const light = new THREE.HemisphereLight(
      0xFFFFFF, 0x080820, 2
    );
    scene.add(light)

    const cube = this.createCubo()
    scene.add(cube)

    renderer.render(scene, camera,)
  }

  createCubo(){
    const material = new THREE.MeshLambertMaterial(
      { color: 0x348feb }
    );

    return new THREE.Mesh(
      new THREE.BoxGeometry(), material
    )
  }
}
