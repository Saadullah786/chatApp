let ul = document.getElementById("ul")
let text = document.getElementById("input");
let mainContainer = document.getElementById("main-container")
let loginSetup = document.getElementById("loginSetup")
let key = firebase.database().ref().push().key






// Sign in with facebook
const facebook_login = () => {
mainContainer.removeAttribute("class","hide")
loginSetup.setAttribute("class","hide")
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

document.getElementById("h1").innerHTML=user.displayName
document.getElementById("uimg").setAttribute("src",user.photoURL)

// ///////////////////////////////////////////
        // ...
      }).catch(function(error) {
        console.log(error.message);
      });
    }

  function send(){

      if(document.getElementById("h1")===""){
    
        input.value = "";
        alert("Please Facebook Login");
        
      
        mainContainer.setAttribute("class", "hide"); 
        loginSetup.removeAttribute("class", "hide")
      }
      else{
    
        let key = firebase.database().ref("message").push().key
    
        let message = {
          Name : document.getElementById("h1"),
          sendMessage : text.value,
          key : key
        }
    
        firebase.database().ref("message/" + key).set(message)
     
    }
  }
    





// Get Data From Firebase Database
firebase.database().ref("message").on("child_added", (data)=>{
    // Create li
let li = document.createElement("li");
// Create li Text
let liText = document.createTextNode(data.val().sendMessage);

li.appendChild(liText);
ul.appendChild(li);
text.value = "";
})



// Sign out Function

const signOut = () => {
  firebase.auth().signOut()
  .then(()=>{
    mainContainer.setAttribute("class", "hide"); 
    loginSetup.removeAttribute("class", "hide");
    alert("You Sign Out Successfully");
  })
  .catch(()=>{
    
  })
}