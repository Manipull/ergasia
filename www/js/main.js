function hideAll() {
	const allSide = document.querySelectorAll(".sideDiv");
	for (const aMenu of allSide){
		aMenu.classList.add("hidden");
	}
}

function showBio() {
	hideAll();
	const bioDiv = document.querySelector("#bio");
	bioDiv.classList.remove("hidden");
}

function showPhotos() {
	hideAll();
	const bioDiv = document.querySelector("#photos");
	bioDiv.classList.remove("hidden");
}

function showWorks() {
	hideAll();
	const bioDiv = document.querySelector("#works");
	bioDiv.classList.remove("hidden");
}

function showLinks() {
	hideAll();
	const bioDiv = document.querySelector("#links");
	bioDiv.classList.remove("hidden");
}

function showAdmin() {
	hideAll();
	const bioDiv = document.querySelector("#admin");
	bioDiv.classList.remove("hidden");
}

function getJSONDataLinks(){
	fetch("./data/links.json", { method: "GET"})
	.then((res) => res.json())
	.then((json) => showJSONDataLinks((json)))
	.catch((err) => console.error("error:",err));
}
function showJSONDataLinks(links) {
	let anHTML = "<table><tr><th>ID</th><th>Link</th></tr>";
	for (let aLink of links) {
		anHTML += "<tr><td>" +
		 aLink.id + "</td><td><a href='" +
		 aLink.url + "' target='_blank'>" +
		 aLink.title + "</a></td></tr>";
	}
	anHTML += "</table>";
	document.getElementById("links_div").innerHTML = anHTML;
}

function getJSONDataLinks2(){
	fetch("./data/links2.json", { method: "GET"})
	.then((res) => res.json())
	.then((json) => showJSONDataLinks2((json)))
	.catch((err) => console.error("error:",err));
}
function showJSONDataLinks2(links) {
	let anHTML = "<table><tr><th>ID</th><th>Link</th></tr>";
	for (let aLink of links) {
		anHTML += "<tr><td>" +
		 aLink.id + "</td><td><a href='" +
		 aLink.url + "' target='_blank'>" +
		 aLink.title + "</a></td></tr>";
	}
	anHTML += "</table>";
	document.getElementById("links2_div").innerHTML = anHTML;
}

function getJSONDataWorks(json_file,result_div){
	fetch("./data/"+json_file, { method: "GET"})
	.then((res) => res.json())
	.then((json) => showJSONDataWorks(json,result_div))
	.catch((err) => console.error("error:",err));
}
function showJSONDataWorks(works,result_div) {
	let anHTML = "<table><tr><th>????????????</th><th>????????????????????</th></tr>";
	for (let aWork of works) {
		anHTML += "<tr><td>" +
		 aWork.title + "</td><td>" +
		 aWork.date + "</td></tr>";
	}
	anHTML += "</table>";
	document.getElementById(result_div).innerHTML = anHTML;
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}