firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     
      var uid = user.uid;
    firebase.database().ref(`users/${uid}`).once('value',(data)=>{
    
      let loader=document.getElementById("loader");

      let username=document.getElementById("username");
      let email=document.getElementById("email");
      let DOB=document.getElementById("DOB");
      let userprofile = document.getElementById("userprofile");
      userprofile.setAttribute('src', data.val().profile)
      loader.style.display="none"
      username.innerHTML=data.val().username;
      email.innerHTML="Email: "+data.val().email;
      DOB.innerHTML="DOB: "+data.val().DOB;

      console.log(data.val());

         })
   
    } else {
        window.location="index.html"
     
    }
  });

  let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}


  edit=()=>{
    let pdiv=document.getElementById("pdiv")
    pdiv.style.display="none"

    let ediv=document.getElementById("ediv")
    ediv.style.display="block"

       firebase.auth().onAuthStateChanged((user) => {
      if (user) {
       
        var uid = user.uid;
      firebase.database().ref(`users/${uid}`).once('value',(data)=>{
      
  
  
        let eusername=document.getElementById("eusername");
        let EDOB=document.getElementById("EDOB");
        let Eemail=document.getElementById("Eemail");
  
        eusername.value=data.val().username;
        EDOB.value=data.val().DOB;
        Eemail.value=data.val().email;
  
        console.log(data.val());
  
           })
     
      } else {
          window.location="index.html"
       
      }
    });
    
    

  }


 saveProfile=async()=>{

  let eusername=document.getElementById("eusername");
  let EDOB=document.getElementById("EDOB");
  let Eemail=document.getElementById("Eemail");
  

  let user = firebase.auth().currentUser;
  let uid;
  if(user != null){
      uid = user.uid;
  }
  var firebaseRef = firebase.database().ref();
  var userData = {
      username: eusername.value,
      email:Eemail.value,
      DOB: EDOB.value,
  
  }
  firebaseRef.child(`users/${uid}`).update(userData);
  console.log(userData)
  setTimeout(()=>{
    window.location="profile.html"
  },3000)
  swal({
    type:'success',
    title:'Profile Edited'
  }

  )
  }
  cancell=()=>{
    window.location="profile.html"
  }
    

  
 
// let userFormFirebase= new Promise((resolve,reject)=>{
//     firebase.auth().onAuthStateChanged((user)=>{
//         if(user){
//             resolve(user.uid)
//         }

//     })
// });
  
let updateProfile = async () => {
  let editProfile = document.getElementById('editProfile');
  let closeBtn = document.getElementById('closeBtn');
  let userprofile = document.getElementById("userprofile");
  let uploadedImage = await uploadFiles(editProfile.files[0])
  firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref(`users/${user.uid}`).update({ profile: uploadedImage })
          .then(() => {
              userprofile.setAttribute('src', uploadedImage)
              closeBtn.click()
          })
  })
}

let logout=()=>{
    firebase.auth().signOut()
    .then(()=>{
       
        window.location= "login.html"
    });
}
