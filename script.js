document.addEventListener("DOMContentLoaded", async () => {
  // Firebase imports
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js");
  const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js");
  const { getStorage, ref, uploadBytes, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js");

  const text = "Bu site sadece Zeynep(Baronun Fıstığı) için tasarlanmıştır!";
  const container = document.getElementById("animatedText");
  const words = text.split(" ");

const firebaseConfig = {
  apiKey: "AIzaSyBhrc1BMoIZNEyYoJKMs95kc2pN1D8BeF0",
  authDomain: "zeyn-5e1d3.firebaseapp.com",
  projectId: "zeyn-5e1d3",
  storageBucket: "zeyn-5e1d3.firebasestorage.app",
  messagingSenderId: "742409981033",
  appId: "1:742409981033:web:bba59b030f675f9776e6f8",
  measurementId: "G-02836DG7WS"
};

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);

  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.style.animationDelay = `${i * 0.6}s`;
    container.appendChild(span);
  });

  setTimeout(() => {
    document.getElementById("animatedText").style.display = "none";
    document.getElementById("nextStep").style.display = "block";
  }, words.length * 600 + 1500);

  const fileInput = document.getElementById("imageUpload");
  const changeBtn = document.getElementById("changePhotoBtn");
  const continueBtn = document.getElementById("continueBtn");

  let selectedFile = null;

  changeBtn.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    selectedFile = this.files[0];
    const preview = document.getElementById("previewImage");

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        changeBtn.style.display = "inline";
        continueBtn.disabled = false;
        continueBtn.classList.add("enabled");
        continueBtn.style.cursor = "pointer";
      };
      reader.readAsDataURL(selectedFile);
    } else {
      preview.src = "";
      preview.style.display = "none";
      changeBtn.style.display = "none";
      continueBtn.disabled = true;
      continueBtn.classList.remove("enabled");
      continueBtn.style.cursor = "not-allowed";
    }
  });

  continueBtn.addEventListener("click", function () {
    if (!selectedFile) return;

    continueBtn.disabled = true;
    continueBtn.classList.remove("enabled");
    continueBtn.style.cursor = "not-allowed";

    const imagesRef = ref(storage, 'images/' + selectedFile.name);
    uploadBytes(imagesRef, selectedFile)
      .then(snapshot => getDownloadURL(snapshot.ref))
      .then(downloadURL => {
        console.log("Yükleme başarılı. URL:", downloadURL);
        window.location.href = "kandirildin.html";
      })
      .catch(error => {
        alert("Yükleme başarısız: " + error.message);
        continueBtn.disabled = false;
        continueBtn.classList.add("enabled");
        continueBtn.style.cursor = "pointer";
      });
  });
});