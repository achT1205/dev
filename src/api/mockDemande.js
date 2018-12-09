import delay from './delay';
const demandes =[
    {

    }
]


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  
  //This would be performed on the server in a real app. Just stubbing in.
  const generateId = (demande) => {
    return replaceAll(demande.title, ' ', '-');
  };

class demandeApi {
    static getAllDemandes() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(Object.assign([], demandes));
        }, delay);
      });
    }



    static saveOffer(demande) {
        demande = Object.assign({}, demande); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate server-side validation
            const minDemandeTitleLength = 1;
            if (demande.title.length < minDemandeTitleLength) {
              reject(`Title must be at least ${minDemandeTitleLength} characters.`);
            }
    
            if (demande.id) {
              const existingDemandeIndex = demandes.findIndex(a => a.id == demande.id);
              demandes.splice(existingDemandeIndex, 1, demande);
            } else {
              //Just simulating creation here.
              //The server would generate ids and watchHref's for new courses in a real app.
              //Cloning so copy returned is passed by value rather than by reference.
              demande.id = generateId(demande);
              demande.watchHref = `http://www.pluralsight.com/courses/${demande.id}`;
              demandes.push(demande);
            }
    
            resolve(demande);
          }, delay);
        });
      }


      static deleteOffer(demandeId) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const indexOfDemandeToDelete = demandes.findIndex(offer => {
                demande.id == demandeId;
            });
            demandes.splice(indexOfDemandeToDelete, 1);
            resolve();
          }, delay);
        });
      }


}

export default demandeApi;