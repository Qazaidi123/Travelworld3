// HERO AUTO CHANGE
let heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
];

let hero = document.querySelector(".hero");

if (hero) {
  let i = 0;
  setInterval(() => {
    hero.style.backgroundImage = `url('${heroImages[i]}')`;
    i = (i + 1) % heroImages.length;
  }, 3000);
}
// NAV
function hideAll(){
["home","explore","gallery","package"].forEach(id=>{
document.getElementById(id).classList.add("hidden");
});
}

function showHome(){
hideAll();
document.getElementById("home").classList.remove("hidden");
}

function showExplore(){
hideAll();
document.getElementById("explore").classList.remove("hidden");
}

// DATA
const data = {
India:[
"https://images.unsplash.com/photo-1598091383021-15ddea10925d",
"https://images.unsplash.com/photo-1587474260584-136574528ed5",
"https://images.unsplash.com/photo-1548013146-72479768bada"
],
Bali:[
"https://images.unsplash.com/photo-1518548419970-58e3b4079ab2",
"https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
],
Maldives:[
"https://images.unsplash.com/photo-1501117716987-c8e1ecb210c1",
"https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
"https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce"
],
Dubai:[
"https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
"https://images.unsplash.com/photo-1518684079-3c830dcef090",
"https://images.unsplash.com/photo-1498496294664-6bdf2b6a7b8c"
],
Switzerland:[
"https://images.unsplash.com/photo-1501785888041-af3ef285b470",
"https://images.unsplash.com/photo-1527668752968-14dc70a27c95",
"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
],
Thailand:[
"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
"https://images.unsplash.com/photo-1528184039930-bd03972bd974",
"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
]
};

// GALLERY
function showGallery(place){
hideAll();
let g=document.getElementById("gallery");
g.classList.remove("hidden");
g.innerHTML="";

data[place].forEach(src=>{
let img=document.createElement("img");
img.src=src;
img.onclick=()=>showPackage(place);
g.appendChild(img);
});
}

// PACKAGE
function showPackage(place){
hideAll();
let p=document.getElementById("package");
p.classList.remove("hidden");
p.innerHTML="";

data[place].forEach(img=>{
let div=document.createElement("div");
div.innerHTML=`
<img src="${img}">
<div style="position:absolute;bottom:10px;left:10px">
${place}<br>
<button onclick="openModal()">Book Now</button>
</div>
`;
p.appendChild(div);
});
}

// MODAL
function openRegister(){
  console.log("clicked");
  document.getElementById("registerModal").classList.remove("hidden");
}

function closeRegister(){
  document.getElementById("registerModal").classList.add("hidden");
}

function generateID(){
  return "REG" + Math.random().toString(36).substr(2,6).toUpperCase();
}

function submitForm(){

  let data = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    destination: document.getElementById("destination").value,
    members: document.getElementById("members").value
  };

  if(!data.name || !data.mobile || !data.destination || !data.members){
  alert("All fields are required");
  return;
}

  fetch("/api.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    mobile,
    destination,
    members
  })
})
.then(res => res.json())
.then(data => {
  document.getElementById("successMsg").innerText =
    "Thanks for Registration. Your Registration ID " + data.reg_id;
})
.catch(err => {
  console.error(err);
});
      }  
  
