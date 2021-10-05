const myJSON = `[{"img":"https://thienduongmaldives.com/wp-content/uploads/2019/09/193995542-1200x800.jpg","title":"Hard Rock Hotel","type":"Hotel"},
{"img":"https://q-xx.bstatic.com/xdata/images/hotel/840x460/264010334.jpg?k=349e902b6c66d2eb044dedbc34ab498d42d036742dc3c9e6edd886a9404323e4&o=","title":"Sheraton Maldives Full Moon","type":"Resort"}]`
$(document).ready(function () {
    $(window).scroll(function () {

        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
    })
})
let progress = document.getElementById('progressbar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}
var swiper = new Swiper(".home-slider", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
});

let section = document.querySelector('section.banner-container')
const hotels = JSON.parse(myJSON)
let newHotels = hotels.map(hot => `<div class="banner">
    <img src="${hot.img}" alt="">
    <div class="content">
        <span>${hot.title}</span>
        <h3>${hot.type}</h3>
        <a href="#" class="btn">book now</a>
    </div>
</div>`)
newHotel = newHotels.join('')
section.innerHTML = newHotel


const sweetAlert = (icon, title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
    Toast.fire({
        icon: icon,
        title: title,
    });
};


let getDataFromDoc = (doc) => {
    let data = doc.data()
    data.id = doc.id
    return data

}

let getDataFromDocs = (docs) => {
    let result = []
    for (let doc of docs) {
        let data = getDataFromDoc(doc)
        result.push(data)
    }
    return result
}

let availableRoom = async () => {
    let result = await firebase.firestore().collection("room").get()
    let data = getDataFromDocs(result.docs)
    console.log(data);
    render(data)
}
availableRoom()

let render = (data) => {
    let dom = document.querySelector(".rooms-container")
    for (let i = 0; i < data.length; i++) {
        if (`${data[i].status}` == "active") {
            let html = ` <article class="room">
        <div class="room-image">
            <img src="${data[i].img}"
                alt="room image">
        </div>
        <div class="room-text">
            <h3>${data[i].name}</h3>
            <ul>
                ${renderBenefit(data[i].benefit)}
            </ul>
            <p>${data[i].discribe}
            <p class="rate">
                <span>$${data[i].price} /</span> Per Night
            </p>
            <button type="button" class="btn">book now</button>
        </div>
    </article>`
            dom.innerHTML += html
        }
        else {
            let html = ` <article class="room">
        <div class="room-image">
            <img src="${data[i].img}"
                alt="room image">
        </div>
        <div class="room-text">
            <h3>${data[i].name}</h3><i class="de-active">-Đã book-</i>
            <ul>
                ${renderBenefit(data[i].benefit)}
            </ul>
            <p>${data[i].discribe}
            <p class="rate">
                <span>$${data[i].price} /</span> Per Night
            </p>
            <button type="button" class="btn">book now</button>
        </div>
    </article>`
            dom.innerHTML += html
        }
    }
}
let renderBenefit = (data) => {
    let html = ""
    for (let i = 0; i < data.length; i++) {
        let h = `<li>
        <i class="fas fa-arrow-alt-circle-right"></i>
        ${data[i]}.
    </li>`
        html += h
    }
    return html
}
