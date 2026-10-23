

// clear to solid nav (homepage only) 

const homeNav = document.querySelector(".homePage nav");

if (homeNav) {

    // Keep banner behind clear nav
    function adjustBanner() {
        document.body.style.setProperty(
            "--nav-height",
            homeNav.offsetHeight + "px"
        );
    }

    // Change nav to solid when scrolling
    function changeNav() {
        const announcement = document.querySelector(".homePage header");

        if (window.scrollY >= announcement.offsetHeight) {
            homeNav.classList.add("scrolled");
        } else {
            homeNav.classList.remove("scrolled");
        }
    }

    adjustBanner();
    changeNav();

    window.addEventListener("scroll", changeNav);
    window.addEventListener("resize", adjustBanner);
}











// Homepage below banner revolving text

const beansBanner = document.querySelector(".homePage #textBanner p");

if (beansBanner) {

    // Creates a copy of the original text
    const original = document.createElement("span");
    original.innerHTML = beansBanner.innerHTML;

    // Duplicate the text for text roll
    const duplicate = original.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");

    beansBanner.innerHTML = "";
    beansBanner.appendChild(original);
    beansBanner.appendChild(duplicate);
}












// product image grid gallary for BOTH pages

// Additional photos assoicted for prodcut 
const extraPhotos = {
    "front1.png": [
        "images/product1a.webp",
        "images/product1b.webp",
        "images/product1c.webp"
    ],

    "front2.png": [
        "images/product2a.webp",
        "images/product2b.webp",
        "images/product2c.webp"
    ],

    "front3.png": [
        "images/product3a.webp",
        "images/product3b.webp",
        "images/product3c.webp"
    ],

    "front4.png": [
        "images/jam1.webp",
        "images/jam2.webp",
        "images/jam3.webp",
        "images/jam4.webp"
    ],

    "front5.png": [
        "images/product5a.webp",
        "images/product5b.webp"
    ]
};

// Ables to find product images on either page since use same ID and Class
const productGalleries = document.querySelectorAll("#productsGrid .productImage");

productGalleries.forEach(function(gallery) {

    const front = gallery.querySelector(".front");
    const back = gallery.querySelector(".back");

    // FInds specific product by its image filename
    const filename = front.getAttribute("src").split("/").pop();

    // Skip products without extra photos
    if (!extraPhotos[filename]) {
        return;
    }

    // Combine existing photos with extra photos
    const photos = [front.src, back.src, ...extraPhotos[filename]];

    let currentPhoto = 1;

    // Create left arrow
    const leftArrow = document.createElement("button");
    leftArrow.type = "button";
    leftArrow.className = "galleryArrow galleryPrev";
    leftArrow.textContent = "<";
    leftArrow.setAttribute("aria-label", "Previous product photo");

    // Create right arrow
    const rightArrow = document.createElement("button");
    rightArrow.type = "button";
    rightArrow.className = "galleryArrow galleryNext";
    rightArrow.textContent = ">";
    rightArrow.setAttribute("aria-label", "Next product photo");

    gallery.appendChild(leftArrow);
    gallery.appendChild(rightArrow);

    // Display selected photo
    function showPhoto() {
        back.src = photos[currentPhoto];
    }

    // Previous photo
    leftArrow.addEventListener("click", function() {
        currentPhoto--;

        if (currentPhoto < 0) {
            currentPhoto = photos.length - 1;
        }

        showPhoto();
    });

    // Next photo
    rightArrow.addEventListener("click", function() {
        currentPhoto++;

        if (currentPhoto >= photos.length) {
            currentPhoto = 0;
        }

        showPhoto();
    });

    // Reset when mouse leaves
    gallery.addEventListener("mouseleave", function() {
        currentPhoto = 1;
        showPhoto();
    });

});












// OUT OF THE JAM MAIN IMAGE GALLERY

const jamGallery = document.querySelector("#jamGallery");

if (jamGallery) {

    // Photos in right  order
    const jamPhotos = [
        "images/jam.png",
        "images/jam1.webp",
        "images/jam2.webp",
        "images/jam3.webp",
        "images/jam4.webp",
        "images/jam5.webp"
    ];

    const mainImage = document.querySelector("#jamMainImage");
    const thumbnails = document.querySelector("#jamThumbnails");
    const prevArrow = document.querySelector("#jamPrev");
    const nextArrow = document.querySelector("#jamNext");
    let currentImage = 0;

    // ShoW the image seledted
    function showJamImage(index) {

        currentImage = index;
        mainImage.src = jamPhotos[currentImage];

        // Update selected thumbnail border color
        const allThumbnails = thumbnails.querySelectorAll(".jamThumb");
        // ADD and Remove rules
        allThumbnails.forEach(function(thumb, number) {
            if (number === currentImage) {
                thumb.classList.add("selected");
            } else {
                thumb.classList.remove("selected");
            }
        });
    }

    // Creating each thumbnail
    jamPhotos.forEach(function(photo, index) {

        const button = document.createElement("button");
        button.type = "button";
        button.className = "jamThumb";
        button.setAttribute("aria-label", "View product photo " + (index + 1));

        const image = document.createElement("img");
        image.src = photo;
        image.alt = "Product photo " + (index + 1);

        button.appendChild(image);
        thumbnails.appendChild(button);
        // Change image when thumbnail is clicked
        button.addEventListener("click", function() {
            showJamImage(index);
        });
    });
  
    // Insure the first image on page is displayted
    showJamImage(0);
}














// CLOSE SIGN UP BUTTON

const closeSignUp = document.querySelector("#close");

if (closeSignUp) {
    closeSignUp.addEventListener("click", function() {
        document.querySelector("#signUpBox").style.display = "none";
    });
}







// OUT OF THE JAM (JAM SELCETION) INDICATOR
const jamOptionButtons = document.querySelectorAll("#jamChoice button");

jamOptionButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        // Remove selected class from both buttons
        jamOptionButtons.forEach(function(option) {
            option.classList.remove("selected");
        });
        // Add selected class to clicked button
        button.classList.add("selected");
    });
});





// OUT OF THE JAM CART NUMBER

const jamAmount = document.querySelector("#jamAmount");
if (jamAmount) {

    const buttons = jamAmount.querySelectorAll("button");
    const number = jamAmount.querySelector("span");
    let quantity = 1;

    // Minus button STOPS at -1 (pay me)
    buttons[0].addEventListener("click", function() {
        if (quantity > -1) {
            quantity--;
            number.textContent = quantity;
        }
    });
    // Plus button STOPS at 7
    buttons[1].addEventListener("click", function() {
        if (quantity < 7) {
            quantity++;
            number.textContent = quantity;
        }
    });
}