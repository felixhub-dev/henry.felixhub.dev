let photos;
let photo_template;
function photosOnLoad() {
    // return; // still a WIP
    console.log("photosOnLoad");
    fetch("/api/photos.json").then(response => 
        response = response.text()
    ).then( response =>
        // Bad hack: comments have to have a space after the // or /* to not break quote parsing
        JSON.parse(response.replaceAll(/\/\/ (.*?)\n/gi,"").replaceAll(/\/\* (.*?)\*\//gmi, "")) // remove comments
    ).then(data => {
        console.log(data);
        photos = data;
        if (!!photos && !!photo_template) { // either this or the other one will finish first, so it should *in theory* only run once
            renderPhotos();
        }
    });
    fetch("/html/templates/photo.html").then(response => response.text()).then(data => {
        console.log(data);
        photo_template = data;
        if (!!photos && !!photo_template) {
            renderPhotos();
        }
    });
    console.log(photo_template);

    $('photos-loading').classList.remove("hidden");
}
function renderPhotos() {
    console.log("renderProjects");
    $('photos-loading').classList.add("hidden");
    if (isOnMobile()) {
        photos = photos.mobile;
    } else {
        photos = photos.desktop;
    }

    // Dynamically fill photos
    for (let i = 0; i < photos.length; i++) {
        let photo = photos[i];
        console.log(photo);
        var newPhoto = structuredClone(photo_template);
        newPhoto = newPhoto.replaceAll(
            "{{url}}", `/images/${isOnMobile() ? 'mobile' : 'desktop'}/` + photo.url).replaceAll(
            "{{name}}", photo.name).replaceAll(
            "{{id}}", photo.id).replaceAll(
            "{{date}}", (new Date(photo.date)).toDateString()).replaceAll(
            "{{location}}", photo.location).replaceAll(
            "{{photo_location_hidden}}", photo.location ? "" : "hidden")
        $('photos-container').innerHTML += newPhoto;
    }

    $('photos-container').classList.remove("hidden");
}

function swapPhoto(id) {
    console.log("stuff")
}