import * as THREE from 'three';


export const ConfigWebGLRenderer = new THREE.WebGLRenderer( { antialias: true } );

ConfigWebGLRenderer.setPixelRatio(
  window.devicePixelRatio // Deixa da maxima qualidade possivel do computador
)

ConfigWebGLRenderer.setSize( window.innerWidth, window.innerHeight );
