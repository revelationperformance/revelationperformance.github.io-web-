window.onload = () => {
    const loader = document.querySelector(".load-wrapper");
    const main = document.querySelector(".main");
    loader.style.display = "none";
    main.style.display = "block";
    langLoader("tr");
    svgMapLoad();
};

const hamburger = document.querySelector(".hamburger");
const hams = document.querySelectorAll(".ham");
const hamburgerAnims = ["ham1-active", "ham2-active", "ham3-active"];
const navbar = document.querySelector(".navbar");
const body = document.querySelector("body");
let langGauge = document.querySelector(".lang-change-block");
let selectedLang = "tr";
let startGaugeDeg = -40;
let langObject = null;

let franchiseListTurkey = [
    {
        city: "İstanbul (Asya)",
        number: "+90 553 486 28 80",
        instagram: "https://www.instagram.com/revelation.performance/",
    },
    {
        city: "Samsun",
        number: "+90 530 791 03 22",
        instagram: "https://www.instagram.com/revelationsamsun/",
    },
    {
        city: "Ankara",
        number: "+90 537 795 46 47",
        instagram: "https://www.instagram.com/revelationankara/",
    }
];

let franchiseListUkraine = [
    {
        city: "Kharkiv",
        number: "+380 635 592 79 0",
        instagram: "https://www.instagram.com/revelationperformance.ua/",
    }
]

const pageObject = {
    timer:2000,
    photoChanger:true
};

let pages = {
    "index.html": "ana sayfa",
    "contact.html": "iletişim"
}

function getPageName(){
    var path = window.location.pathname;
    return path.split("/").pop();
}

// navbar.addEventListener("click", (e) => {
//     if( e.target.localName == "a" )
//     {
//         console.log(e.target.classList);
//     }  
// });

// const listForCurrentPage = navbar.querySelectorAll(".navbar ul li");
// listForCurrentPage.forEach(key => {
//     //console.log(pages[getPageName()]);
// })


// hamburger.addEventListener("click", () => {
//     hams.forEach((ham, index) => {
//         ham.classList.toggle(hamburgerAnims[index]);
//     })
//     navbar.classList.toggle("nav-active");
// });

// const gallery = document.querySelector(".photos");
// const photos = {
//     1: "../images/s3-1.jpg",
//     2: "../images/s3-2.jpg",
//     3: "../images/s3-3.jpg",
// }

// let i = 2;
// const galleryChange = () => {
//     if(i == 4) i = 1;  
//     gallery.style.backgroundImage = `url(${photos[i]})`;
//     document.querySelectorAll(".index").forEach(index => {
//         index.classList.remove("active-index");
//     })
//     document.querySelector(`div[data-index="${i}"]`).classList.add("active-index");
//     i++;
// };

// if(getPageName() == "index.html"){
//     setInterval(function(){
//         if(pageObject.photoChanger)
//         {
//             galleryChange();
//         }
//     }, pageObject.timer);
//     gallery.addEventListener("mouseenter", () => {
//         pageObject.photoChanger = false;
//     });
    
//     gallery.addEventListener("mouseleave", () => {
//         pageObject.photoChanger = true;
//     });
// }

let langLoader = async function (lang) {
    langObject = await fetch(`../lang/${lang}.json`)
    .then(res => { return res.json() });
    langUpdate(lang);
};

async function langUpdate (lang) {
    const footerYear = document.querySelector(".footer-bottom");
    console.log(footerYear);
    const year = new Date();
    footerYear.innerHTML =
    `
        <p>${langObject["footer-copyright"]} &copy; ${year.getFullYear()}</p>
        <p>Designed by <a href='https://www.linkedin.com/in/mert-ulas/' target='_blank'>Mert ULAS</a></p>
    `;

    document.querySelector(".social h2").innerHTML = langObject["follow-us"];
    document.querySelector(".footer .info p").innerHTML = langObject["footer-short-info"];

    langGauge.title = langObject["lang-changer"];
    document.querySelector(".turkey-map").title = langObject["map.turkey"]
    document.querySelector(".ukraine-map").title = langObject["map.ukraine"]

    document.querySelector(".under-construction p").innerHTML = 
    `
        <i class="fas fa-hammer"></i>
        ${langObject["construction"]}
    `;

    let addressBookTurkey = [
        `Eyüp Sultan ${langObject["neighborhood"]} Mehmet Akif ${langObject["avenue"]}${ lang === "tr" ? "si" : "" }, Yadigar ${langObject["street"]} Otomer Galericiler ${langObject["site"]}, B Blok - No: 3 /34885, Sancaktepe/Istanbul/TURKEY"`,
        `Fenk ${langObject["neighborhood"]} Elmalık ${langObject["street"]}, No: 4 /TERME, Terme/Samsun/TURKEY`,
        `Inonu ${langObject["neighborhood"]} 1749. ${langObject["avenue"]}, No: 8 /06370, Yenimahalle/Ankara/TURKEY`
    ];

    franchiseListTurkey = franchiseListTurkey.map((cityObject, index) => {
        return {
            ...cityObject,
            address: addressBookTurkey[index]
        }
    })

    let addressBookUkraine = [
        "Kharkiv/UKRAINE"
    ];

    franchiseListUkraine = franchiseListUkraine.map((cityObject, index) => {
        return {
            ...cityObject,
            address: addressBookUkraine[index]
        }
    })
}

let svgMapLoad = function () {
    const turkeyMap = document.querySelector('#svg-turkiye-haritasi');
    const info = document.querySelector('.il-isimleri');

    document.querySelectorAll('#svg-turkiye-haritasi path').forEach(path => {
        if (franchiseListTurkey.map(cityObject => cityObject.city)
        .includes(path.parentElement.getAttribute("data-iladi"))) {
            path.style.fill = "rgb(214, 31, 31)";
            path.innerHTML = `
                <animate
                attributeType="XML"
                attributeName="fill"
                values="#800;#f00;#800;#800"
                dur="0.8s"
                repeatCount="indefinite"/>
            `
        }

    });

    document.querySelectorAll(".ukraine-map path").forEach(path => {
        if (franchiseListUkraine.map(cityObject => cityObject.city)
        .includes(path.getAttribute("name"))) {
            path.style.fill = "rgb(214, 31, 31)";
            path.innerHTML = `
                <animate
                attributeType="XML"
                attributeName="fill"
                values="#800;#f00;#800;#800"
                dur="0.8s"
                repeatCount="indefinite"/>
            ` 
        }
    });
  
    turkeyMap.addEventListener(
      'mouseover',
      function (event) {
        if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
          info.innerHTML = 
            `
            <div>
            ${event.target.parentNode.getAttribute('data-iladi')}
            </div>
            `
        }
      }
    );
  
    turkeyMap.addEventListener(
      'mousemove',
      function (event) {
        info.style.top = event.pageY + -50 + 'px';
        info.style.left = event.pageX + -24 + 'px';
      }
    );
  
    turkeyMap.addEventListener(
      'mouseout',
      function (event) {
        info.innerHTML = '';
      }
    );
  
    document.addEventListener('click', event => {
        let addressInfoCard = document.querySelector(".franchise-info-block");
        if (event.target.closest(".franchise-info-block") === null) {
            addressInfoCard.style.display = "none";
        }
        if (event.target.tagName === 'path') {
            const parent = event.target.parentNode;
            franchiseListTurkey.forEach(cityObject => {
                if (cityObject.city === parent.getAttribute("data-iladi")) {
                    addressInfoCard.innerHTML = 
                    `
                    <h5 class='franchise-info-block-header'>
                        ${cityObject.city.replaceAll(/İ/g, "I")}
                    </h5>
                    <p>
                        <i class="fas fa-phone"></i>
                        <a href='tel:${cityObject.number}'>${cityObject.number}
                    </p>
                    <ul class='franchise-info-block-adrress'>
                    `;

                    cityObject.address.split(",").forEach(addressPart => {
                        addressInfoCard.innerHTML += 
                        `
                            <li>${addressPart}</li>
                        `;
                    });
                    addressInfoCard.innerHTML += "</ul>";
                    
                    addressInfoCard.innerHTML += 
                    `
                    <div class='franchise-info-block-social'>
                    <a href='${cityObject.instagram}' target="_blank"><i class="fab fa-instagram"></i></a>
                    </div>
                    `

                    addressInfoCard.style.display = "flex";
                }
            });

            franchiseListUkraine.forEach(cityObject => {
                if (cityObject.city === event.target.getAttribute("name")) {
                    addressInfoCard.innerHTML = 
                    `
                    <h5 class='franchise-info-block-header'>
                        ${cityObject.city.replaceAll(/İ/g, "I")}
                    </h5>
                    <p>
                        <i class="fas fa-phone"></i>
                        <a href='tel:${cityObject.number}'>${cityObject.number}
                    </p>
                    <ul class='franchise-info-block-adrress'>
                    `;

                    cityObject.address.split(",").forEach(addressPart => {
                        addressInfoCard.innerHTML += 
                        `
                            <li>${addressPart}</li>
                        `;
                    });
                    addressInfoCard.innerHTML += "</ul>";

                    addressInfoCard.innerHTML += 
                    `
                    <div class='franchise-info-block-social'>
                    <a href='${cityObject.instagram}' target="_blank"><i class="fab fa-instagram"></i></a>
                    </div>
                    `

                    addressInfoCard.style.display = "flex";

                }
            });
        }

    });


    const ukraineMap = document.querySelector('#svg-ukraine-map');

    ukraineMap.addEventListener("mouseover", event => {
        if (event.target.tagName === 'path') {
            info.innerHTML = 
            `
            <div>
              ${event.target.getAttribute('name')}
            </div>;
            `
        }
    });

    ukraineMap.addEventListener('mousemove', event => {
        info.style.top = event.pageY + -50 + 'px';
        info.style.left = event.pageX + -24 + 'px';
    });

    ukraineMap.addEventListener('mouseout', event => {
        info.innerHTML = '';
    });

  }

for (let i = 0; i < 9; i++) {
    langGauge.innerHTML += 
    `
        <div class='ghost-parent-tick' 
            style='transform: translate(-50%, -45%) rotate(${startGaugeDeg + i * 10}deg)'>
            <div class='tick'></div>
        </div>`;
}

let gauge = document.createElement("div");
gauge.className = "gauge";
langGauge.appendChild(gauge);
let gaugeDeg = 60;

langGauge.addEventListener("click", event => {
    gaugeDeg *= -1;
    gauge.style.transform = `translate(-60%, 15%) rotate(${gaugeDeg}deg)`;
    selectedLang = selectedLang === "tr" ? "en" : "tr";
    langLoader(selectedLang);
});