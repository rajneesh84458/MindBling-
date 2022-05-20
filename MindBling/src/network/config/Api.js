import { Auth, database } from "./setup";




export const SignUpUser = (email, passswod) => {
  return new Promise(function(resolve, reject) {
    Auth()
      .createUserWithEmailAndPassword(email, passswod)
      .then(() => {
        resolve('Sign Up Successfully');
      })
      .catch(error => {
        reject(error);
      });
  });
};

// export const SignInUser = (email, passswod) => {
//   return new Promise(function(resolve, reject) {
//     Auth()
//       .signInWithEmailAndPassword(email, passswod)
//       .then(() => {
//         resolve('Sign In Successfully');
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
const loginRequest = async (email, password) => {
  try {
    return await Auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};

export default loginRequest;

export const SignOutUser = () => {
  return new Promise(function(resolve, reject) {
    Auth()
      .signOut()
      .then(() => {
        resolve('Sign Out Successfully');
      })
      .catch(error => {
        reject(error);
      });
  });
};

// export const submitUser = (Id,title,choseStartDate,chosetime,num,description,contactName) => {
//   return new Promise(function(resolve, reject) {
//     let key;
//     if (Id != null) {
//       key = Id;
//     } else {
//       key = database()
//         .ref()
//         .push().key;
//     }
//     let dataToSave = {
//       Id: key,
//       title,choseStartDate,chosetime,num,description,contactName,
//       //time: Date.now(),
      

//     };
//     database()
//       .ref('meetups/' + key)
//       .update(dataToSave)
//       .then(snapshot => {
//         resolve(snapshot);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };


export const AddUser = async (name, email, uid, profileImg) => {
    try {
      return await
        database()
        .ref("users/" + uid)
        .set({
          name: name,
          email: email,
          uuid: uid,
          //profileImg: profileImg,
        });
    } catch (error) {
      return error;
    }
  };
  
//   export const UpdateUser = async (uuid, imgSource) => {
//     try {
//       return await 
//         database()
//         .ref("users/" + uuid)
//         .update({
//           profileImg: imgSource,
//         });
//     } catch (error) {
//       return error;
//     }
//   };
  

export const AddPhoneUser = (id, name, phoneNumber) => {
  return new Promise(function(resolve, reject) {
    let key;
    if (id != null) {
      key = id;
    } else {
      key = database()
        .ref()
        .push().key;
    }
    let dataToSave = {
      id: key,
      name,
      phoneNumber
    };
    database()
      .ref('credientials/' + key)
      .update(dataToSave)
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(err => {
        reject(err);
      });
  });
};




export const api = {
  findUser :async (uid) => {
    const u = await database().ref('RegisteredTrainers/') .orderByChild("uid")
      .equalTo(uid)
      .once("value");

    if (u.exists()) {
      return Object.values(u.val())[0];
    }

    return null;
  }
}
  export const updateMessages = async(callback) => {
  database()
    .ref("messages")
    .limitToLast(20)
    .on("child_added", (snapshot) => {
      callback(parse(snapshot));
    });
}


export const saveMessage = async (message) => {
  database().ref("messages").push(message);
}

const parse = (snapshot) => {
  const { createdAt, text, user } = snapshot.val();
  const { key: _id } = snapshot;
  const message = { _id, createdAt, text, user };
  return message;
};
