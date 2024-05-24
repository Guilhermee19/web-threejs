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
  url_obj: string,
  scale: number,
}

export const NOCLAF_511: TObject3D[] = [
  {
    name: 'RoomFloor',
    type: 'IMG',
    width: 5,
    height: 0.1,
    depth: 15.75,
    position:{
      x: 0,
      y: 0,
      z: 0
    },
    color: 0xf242f5,
    texture: 'assets/texturas/piso_chao.png',
    url_obj: '',
    scale: 1
  },
  {
    name: 'Logo',
    type: 'GLB',
    width: 0.002,
    height: 0.002,
    depth: 0.002,
    position:{
      x: 0,
      y: 1.9,
      z:-4
    },
    color: 0x348feb,
    texture: '',
    url_obj: 'assets/object_3d/logo_noclaf/ImageToStl.com_logo.obj',
    scale: 1
  },
  // {
  //   name: 'RoomWindow',
  //   type: 'IMG',
  //   width: 6,
  //   height: 5,
  //   depth: 0.1,
  //   position:{
  //     x: 0,
  //     y: 2.4,
  //     z: -5
  //   },
  //   color: 0x3b0d69,
  //   texture: 'assets/texturas/piso_chao.png',
  //   url_obj: '',
  //   scale: 1
  // },
]

