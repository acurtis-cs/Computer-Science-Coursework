

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
