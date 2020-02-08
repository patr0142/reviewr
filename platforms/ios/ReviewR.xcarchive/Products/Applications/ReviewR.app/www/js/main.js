

const app = {
    reviews: [],
    KEY: null,
    reviewList: document.querySelector(".review-list"),
    aReview: {},

    init: ()=>{
        //set key based on device id
        //app.KEY = "device" in window ? "REVIEW" + device.uuid : "REVIEWTEMPKEY";
        app.KEY = "REVIEWTEMPKEY";

        //initial
        window.localStorage.setItem(app.KEY, JSON.stringify(app.reviews));

        //check localstorage for list of reviews
        app.getReviews();

        //add click listeners for navigation
        app.addListeners();
    },

    getPicture: ()=> {
        let opts =  { 
            // quality: 50,
            // destinationType: Camera.DestinationType.DATA_URL
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
        };

        navigator.camera.getPicture(app.onSuccess, app.onFail, opts);
    },

    onSuccess: (imageData) =>{
            //let image = document.getElementById('imgDetails');
            let image = document.getElementById('imgAdd');
            //image.src = "data:image/jpeg;base64," + imageData;
            image.src = imageData;
            app.aReview.pathImg = imageData;
            app.aReview.id = Date.now();

            document.getElementById("add").classList.add("hasPhoto");
            document.getElementById("rating_description").textContent = "";
            app.aReview.title = document.querySelector("#name").value = "";
    },

    onFail: (message)=>{
            alert('Failed because: ' + message);
    },

    getReviews: ()=>{
        if (localStorage.getItem(app.KEY)) {
            let str = localStorage.getItem(app.KEY);
            app.reviews = JSON.parse(str);
            console.log("app.reviews ", app.reviews );
        }
    },

    setReviews: ()=>{
        app.aReview.title = document.querySelector("#name").value;
        //app.aReview.rating = document.querySelector("#name").value;

        app.getReviews();
        app.reviews.push(app.aReview);
        window.localStorage.setItem(app.KEY, JSON.stringify(app.reviews));

    },

    homeDisplay(){
        let reviewList = document.querySelector(".review-list")
        reviewList.innerHTML = "";
        app.getReviews();

        app.reviews.forEach(review=>{
            let div = document.createElement('div');
            div.setAttribute('data-id',review.id);

            let img = document.createElement('img');
            img.src = review.pathImg;
            img.setAttribute('data-id',review.id);
            div.appendChild(img);

            let title = document.createElement('p');
            title.setAttribute('data-id',review.id);
            title.textContent = review.title;
            div.appendChild(title);

            let rating = document.createElement('p');
            rating.setAttribute('data-id',review.id);
            rating.textContent = review.rating;
            div.appendChild(rating);

            reviewList.appendChild(div);
        })
    },

    addListeners: ()=> {
        //from home to details
        document.getElementById("btnAdd").addEventListener("click",app.nav);

        //from home to add
        document.getElementById("btnDetailsBack").addEventListener("click",app.nav);

        //from add to home
        document.getElementById("btnAddBack").addEventListener("click",app.nav);

        document.getElementById("btnTakePhoto").addEventListener("click",app.getPicture);

        document.getElementById("btnSave").addEventListener("click",app.setReviews);

        document.getElementById("star5").addEventListener("click",ev=>{
            app.aReview.rating = 5;
            document.getElementById("rating_description").textContent = "5 stars";
        });
        document.getElementById("star4").addEventListener("click",ev=>{
            app.aReview.rating = 4;
            document.getElementById("rating_description").textContent = "4 stars";
        });
        document.getElementById("star3").addEventListener("click",ev=>{
            app.aReview.rating = 3;
            document.getElementById("rating_description").textContent = "3 stars";
        });
        document.getElementById("star2").addEventListener("click",ev=>{
            app.aReview.rating = 2;
            document.getElementById("rating_description").textContent = "2 stars";
        });
        document.getElementById("star1").addEventListener("click",ev=>{
            app.aReview.rating = 1;
            document.getElementById("rating_description").textContent = "1 stars";
        });

    },

    nav: ev => {
        let btn = ev.target;
        let target = btn.getAttribute("data-target");
        console.log("Navigate to",target);
        document.querySelector(".page.active").classList.remove("active");
        document.getElementById(target).classList.add("active");

        if(target === "home"){
            app.homeDisplay();
        } else if (target === "add"){
            let addArea = document.querySelector("#add");
            if ((addArea.classList.contains('hasPhoto'))) {
                addArea.classList.remove('hasPhoto');
            };  
        }
    },

};

const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, app.init);


