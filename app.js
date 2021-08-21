let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
      let progress1 = document.getElementById("progress");
      let bar = document.getElementById("bar");
      progress1.style.display = "block"
      let uploading = storageRef.put(file)
      uploading.on('state_changed',
          (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              bar.style.width = Math.round(progress.toFixed()) + "%";
              bar.innerHTML = Math.round(progress.toFixed()) + "%";
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

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     window.location="profile.html"
    
//   } else {
   
//   }
// });


let register= async ()=>{
    let username=document.getElementById("username");
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    let DOB=document.getElementById("DOB");
    let profile = document.getElementById("profile");
    let image = await uploadFiles(profile.files[0]);
    let loaderText=document.getElementById("loaderText");
    let loader=document.getElementById("loader");
    loaderText.style.display="none";
    loader.style.display="block"
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res)=>{
      firebase.database().ref(`users/${res.user.uid}`).set({
        username:username.value,
        email:email.value,
        password:password.value,
        DOB:DOB.value,
        profile: image

      })
      .then(() => {
  
        // var user = res.user;
        // console.log("user==>" , user)
    
        let successDiv= document.getElementById("successDiv");
        successDiv.innerHTML=" User register succesfully";
        successDiv.style.display="block"
        username.value="";
        email.value="";
        password.value="";
        errorDiv.style.display="none";
        loaderText.style.display="block"
        loader.style.display=("none")
    
        setTimeout(()=>{
          window.location="login.html"
        },1000)
       
      })
      .catch((err) => {
        
        // var errorMessage = err.message;
        // console.log(err)
        let errorDiv=document.getElementById("errorDiv");
        errorDiv.innerHTML=err.message;
        errorDiv.style.display="block"
        loaderText.style.display="block"
        loader.style.display=("none")
      });
    })
}








function login(){

  let email=document.getElementById("email");
  let password=document.getElementById("password");
  let loaderText=document.getElementById("loaderText");
  let loader=document.getElementById("loader");
  loaderText.style.display="none";
  loader.style.display="block"

  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((res) => {
    
          // console.log("user==>" ,res.user.uid)
        
          var user = res.user;
      
          let successDiv= document.getElementById("successDiv");
          successDiv.innerHTML=" User Login succesfully";
          successDiv.style.display="block"
         
          email.value="";
          password.value="";
      
          errorDiv.style.display="none";
          loaderText.style.display="block"
          loader.style.display=("none")

          setTimeout(()=>{
              window.location="profile.html"
            },1000)
    
      })
      .catch((error) => {
      
      var errorMessage = error.message;
      let errorDiv=document.getElementById("errorDiv");
        errorDiv.innerHTML=err.message;
        errorDiv.style.display="block"
        loaderText.style.display="block"
        loader.style.display=("none")


      });
  
     
}





