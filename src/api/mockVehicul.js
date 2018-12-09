import delay from './delay';
import marks from './carMarks'


class VehiculApi {



  static getAllMarks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], marks));
      }, delay);
    });
  }
  

}

export default VehiculApi;