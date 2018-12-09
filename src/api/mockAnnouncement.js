import delay from './delay';
import announcements from './announcements';

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class announcementApi {

  static getAnnouncement(id) {
    let announcement =   announcements.find(announcement => announcement.id === id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({},announcement));
      }, delay);
    });
  }

  static getAllAnnouncements(type) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], announcements.filter(announcement => announcement.type === type)));
      }, delay);
    });
  }


  static saveAnnouncement(announcement) {
    announcement = Object.assign({}, announcement); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minAnnouncementTitleLength = 1;
        if (announcement.title.length < minAnnouncementTitleLength) {
          reject(`Title must be at least ${minAnnouncementTitleLength} characters.`);
        }
        if (announcement.id) {
          const existingAnnouncementIndex = announcements.findIndex(a => a.id === announcement.id);
          announcements.splice(existingAnnouncementIndex, 1, announcement);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          announcement.id = guid();
          announcements.push(announcement);
        }

        resolve(announcement);
      }, delay);
    });
  }
  /*
        static deleteOffer(offerId) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const indexOfOfferToDelete = offers.findIndex(offer => {
                offer.id === offerId;
              });
              offers.splice(indexOfOfferToDelete, 1);
              resolve();
            }, delay);
          });
        }*/
}

export default announcementApi;