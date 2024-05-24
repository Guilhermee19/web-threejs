export interface TObject3D {
  name: string,
  type: 'IMG' | 'OBJ' | 'GLB'
  width: number,
  height: number,
  depth: number,
  position: {
    x: number,
    y: number,
    z: number
  },
  color: number,
  texture: string,
  scale: number,
}

export const NOCLAF_511: TObject3D[] = [
  {
    name: 'Area',
    type: 'OBJ',
    width: 1000,
    height: 0.1,
    depth: 1000,
    position:{
      x: 0,
      y: -0.2,
      z: 0
    },
    color: 0x808080,
    texture: '',
    scale: 1
  },
  {
    name: 'RoomFloor',
    type: 'IMG',
    width: 6,
    height: 0.1,
    depth: 10,
    position:{
      x: 0,
      y: 0,
      z: 0
    },
    color: 0xf242f5,
    texture: 'assets/texturas/piso_chao.jpg',
    scale: 1
  },
  {
    name: 'Door',
    type: 'OBJ',
    width: 1,
    height: 2.1,
    depth: 0.035,
    position:{
      x:0,
      y:0,
      z:-4
    },
    color: 0x348feb,
    texture: '',
    scale: 1
  },
  {
    name: 'RoomWindow',
    type: 'IMG',
    width: 6,
    height: 5,
    depth: 0.1,
    position:{
      x: 0,
      y: 2.4,
      z: -5
    },
    color: 0x3b0d69,
    texture: 'assets/texturas/piso_chao.jpg',
    scale: 1
  },
]

