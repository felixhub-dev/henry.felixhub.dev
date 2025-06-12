const username = $('username')
const UsernameCopyStrings = [username.innerText, "Copied!", "Double Copy!", "Triple Copy!", "Dominating!!", "Rampage!!", "Mega Copy!!", "Unstoppable!!", "Wicked Sick!!", "Monster Copy!!!", "GODLIKE!!!", "BEYOND GODLIKE!!!!"];
let UsernameCopyIndex = 0;
username.onclick = function() {
    // console.log("On mobile: " + isOnMobile());
    
    navigator.clipboard.writeText('Cootshk').catch(() => {alert("Failed to copy username to clipboard")});
    // console.log("Copied username to clipboard");
    UsernameCopyIndex++;
    let CurrentUsernameCopyIndex = UsernameCopyIndex; // In case this gets called multiple times before the timeout
    if (UsernameCopyIndex >= UsernameCopyStrings.length) {
        UsernameCopyIndex = UsernameCopyStrings.length-1; // Reset index if it exceeds the array length
        CurrentUsernameCopyIndex = UsernameCopyIndex; // Update current index to the last valid index
    }
    username.innerText = UsernameCopyStrings[UsernameCopyIndex];
    // Add shake effect
    // console.log("UsernameCopyIndex: " + UsernameCopyIndex);
    // console.log("CurrentUsernameCopyIndex: " + CurrentUsernameCopyIndex);
    
    
    if (!isOnMobile() && CurrentUsernameCopyIndex >= UsernameCopyStrings.length - 1) {
        username.classList.add('large-shake');
        username.classList.remove('shake');
        // console.log("beyond godlike");
    } else if (!isOnMobile() && CurrentUsernameCopyIndex >= UsernameCopyStrings.length - 2) {
        username.classList.add('shake');
        // console.log("godlike");
    }
    setTimeout(function() {
        if (UsernameCopyIndex === CurrentUsernameCopyIndex) {
            UsernameCopyIndex = 0; // Reset index after timeout
            username.innerText = UsernameCopyStrings[0]; // Reset to original username
            username.classList.remove('shake');
            username.classList.remove('large-shake');
        }
    }, username.classList.contains('large-shake') ? 3000 : 2000);
}

// function for the buttons
function loadSubPage(page, firstLoad) {
    console.log(document.location.hash, " vs ", page);
    if ((document.location.hash === "#" + page || document.location.hash === "#" || !page) && !firstLoad) {
        // console.log("First load: ", firstLoad);
        // clear page
        $('target').innerHTML = "";
        $('target').classList.add('hidden');
        document.location.hash = "";
        return;
    }
    $('target').classList.remove('hidden');
    document.location.hash = page;
    let onLoad;
    switch (page) {
        case "projects":
            page = '/html/projects.html';
            onLoad = projectsOnLoad;
            break;
        case "contact":
            page = '/html/contact.html';
            onLoad = contactOnLoad;
            break;
        case "photos":
            page = '/html/photos.html';
            onLoad = photosOnLoad;
            break;
        default:
            document.location.hash = "";
            throw new Error('Invalid page: ' + page);
    }
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            $('target').innerHTML = data;
            onLoad();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// mobileLayoutChanges = function() {
//     // console.log("Window resized");
//     if (isOnMobile()) {
//         $('projects-button').attributes['hx-get'].value = '/html/projects-mobile.html';
//         $('contact-button').attributes['hx-get'].value = '/html/contact-mobile.html';
//         $('photos-button').attributes['hx-get'].value = '/html/photos-mobile.html';
//     } else {
//         $('projects-button').attributes['hx-get'].value = '/html/projects.html';
//         $('contact-button').attributes['hx-get'].value = '/html/contact.html';
//         $('photos-button').attributes['hx-get'].value = '/html/photos.html';
//     }
// }
// document.addEventListener('resize',mobileLayoutChanges);
// document.addEventListener('DOMContentLoaded', mobileLayoutChanges);

// jump to
// #projects, #contact, #photos
console.log(document.location.hash);
if (document.location.hash) {
    let location = document.location.hash;
    document.location.hash = "";
    loadSubPage(location.substring(1), true); // remove the #
}