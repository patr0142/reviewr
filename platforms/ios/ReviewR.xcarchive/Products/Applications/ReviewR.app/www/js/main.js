const app = {
    reviews: [],
    KEY: null,
    reviewList: document.querySelector(".review-list"),
    aReview: {},

    init: () => {
        //set key based on device id
        //app.KEY = "device" in window ? "REVIEW" + device.uuid : "REVIEWTEMPKEY";
        app.KEY = "REVIEWTEMPKEY";

        //check localstorage for list of reviews
        app.getReviews();

        //add click listeners for navigation
        app.addListeners();
    },

    getPicture: () => {
        let opts = {
            // quality: 50,
            // destinationType: Camera.DestinationType.DATA_URL
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
        };

        navigator.camera.getPicture(app.onSuccess, app.onFail, opts);
    },

    onSuccess: (imageData) => {
        //let image = document.getElementById('imgDetails');
        let image = document.getElementById('imgAdd');
        //image.src = "data:image/jpeg;base64," + imageData;
        image.src = imageData;
        app.aReview.pathImg = imageData;
    },


    onFail: (message) => {
        alert('Failed because: ' + message);
    },

    getReviews: () => {
        if (localStorage.getItem(app.KEY)) {
            let str = localStorage.getItem(app.KEY);
            app.reviews = JSON.parse(str);
        }
    },

    setReviews: () => {
        app.aReview.title = document.querySelector("#name").value;
        //app.aReview.rating = document.querySelector("#name").value;
        app.reviews.push(app.aReview);
        window.localStorage.setItem(app.KEY, JSON.stringify(app.reviews));


    },

    addListeners: () => {
        //from home to details
        document.getElementById("btnAdd").addEventListener("click", app.nav);

        //from home to add
        document.getElementById("btnDetailsBack").addEventListener("click", app.nav);

        //from add to home
        document.getElementById("btnAddBack").addEventListener("click", app.nav);

        document.getElementById("btnTakePhoto").addEventListener("click", app.getPicture);

        document.getElementById("btnSave").addEventListener("click", app.setReviews);
    },

    nav: ev => {
        let btn = ev.target;
        let target = btn.getAttribute("data-target");
        console.log("Navigate to", target);
        document.querySelector(".page.active").classList.remove("active");
        document.getElementById(target).classList.add("active");
    },

    

};

const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, app.init);