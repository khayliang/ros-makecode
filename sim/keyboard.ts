/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.keyboard {
  /**
   * key
   * @param type
   * @param speed
   */
  //% blockId=key block="on press of $key"
  export function onPress(key: KeyTypes, body: RefAction){
    const b = board()
    const expectedKey = 37 + key;

    document.addEventListener('keydown', (e)=>{
      const code = e.keyCode
      if (code === expectedKey){
        b.bus.queue(expectedKey, expectedKey, expectedKey)
      }
    })
    b.bus.listen(expectedKey, expectedKey, body)
  }
}