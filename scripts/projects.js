let projects;
let template;
function projectsOnLoad() {
    console.log("projectsOnLoad");
    fetch("/api/projects.json").then(response => 
        response = response.text()
    ).then( response =>
        // Bad hack: comments have to have a space after the // or /* to not break quote parsing
        JSON.parse(response.replaceAll(/\/\/ (.*?)\n/gi,"").replaceAll(/\/\* (.*?)\*\//gmi, "")) // remove comments
    ).then(data => {
        console.log(data);
        projects = data;
        if (!!projects && !!template) { // either this or the other one will finish first, so it should *in theory* only run once
            renderProjects();
        }
    });
    fetch("/html/templates/project.html").then(response => response.text()).then(data => {
        console.log(data);
        template = data;
        if (!!projects && !!template) {
            renderProjects();
        }
    });
    console.log(template);

    $('projects-loading').classList.remove("hidden");
}
let replaceable = ["name", "description", "id", "links.icon", "links.url", "links.github", "links.discord", "links.matrix"];
function renderProjects() {
    console.log("renderProjects");
    $('projects-loading').classList.add("hidden");

    const projectsHTML = replaceProjects(projects.projects);
    $('my-projects').innerHTML = projectsHTML;
    const contributedHTML = replaceProjects(projects.contributions);
    $('my-contributions').innerHTML = contributedHTML;


    $('projects-container').classList.remove("hidden");
}
function replaceProjects(projects) {
    var ret = "";
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        console.log(projects[i]);
        var newProject = structuredClone(template);
        for (let j = 0; j < replaceable.length; j++) {
            let key = replaceable[j];
            let keys = key.split(".");
            key = keys.pop(); // get the last key
            var value = project[key];
            if (keys[0] === "links") {
                value = project.links[key] || "";
            }
            if (!value) newProject = newProject.replaceAll(`{{${key}_hidden}}`, "hidden")
            else newProject = newProject.replaceAll(`{{${key}_hidden}}`, "");
            newProject = newProject.replaceAll(`{{${key}}}`, value ?? "");
        }
        ret += newProject;
    }
    return ret;
}