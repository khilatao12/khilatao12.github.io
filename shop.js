
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
let user1 = ""
let currentUser = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
        user1 = user.email
    }
    )
}
currentUser()

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
// let getData = async () => {
//     let result = await firebase.firestore().collection("room").get()
//     let data = getDataFromDocs(result.docs)
//     setTimeout(function (hotelname) {
//         let btns = Array.from(document.getElementsByClassName("btn"))
//         console.log(btns)
//         btns.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 let x = btn.id
//                 hotelname = data[x].name
//                 console.log(hotelname);
//             })
//         })

//     }, 1500)

// }
// getData()

let availableRoom = async () => {
    let result = await firebase.firestore().collection("room").get()
    let data = getDataFromDocs(result.docs)
    render(data)
}
availableRoom()
// let booked = ()=>{
//     sweetAlert("error","Phòng này đã được book")
// }
let hotel = []
let render = (data) => {
    let dom = document.querySelector(".rooms-container")
    for (let i = 0; i < data.length; i++) {
        if (`${data[i].status}` == "active") {
            let html = ` <article class="room room-${i}">
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
            <button type="button" class="btn" id="c${i}">book now</button>
        </div>
    </article>`
            dom.innerHTML += html
        }
        else {
            let html = ` <article class="room room-${i}">
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
            <button type="button" class="btn" id="c${i}">book now</button>
        </div>
    </article>`
            dom.innerHTML += html
        }
    }
    for (let i = 0; i < data.length; i++) {
        if (`${data[i].status}` == "active") {
            document.querySelector(`#c${i}`).addEventListener("click", () => {
                hotel.push(`${data[i].name}`)
                getInfo(data[i].name, data[i].id)
            })
        }
        else {
            document.querySelector(`#c${i}`).addEventListener("click", () => {
                sweetAlert("error", "Phòng này đã được book")
            })
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

let checkLogin = async () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

        } else {
            sweetAlert("error", "Please signin")
            setTimeout(function () { open("./login.html", "_self"); }, 1000);;
        }

    }
    )
}
let setLi = async () => {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let log = document.querySelector("#account")
            log.innerHTML = `<a href="#" onclick="signOut()">SignOut</a>`

        } else {
            let log = document.querySelector("#account")
            log.innerHTML = `<a href="login.html">SignIn</a>`
        }
    }
    )
}
setLi()
let signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            open("./login.html", "_self");
        })
        .catch((error) => {
            sweetAlert("error", error.message);
        });
};

let booking = document.querySelector(".booking")
booking.onclick = (e) => {
    e.preventDefault()
    checkLogin()
    scrollBooking()

}

let updateDashboard = async (user, hotel, date1, id) => {
    if (user || hotel || date1) {
        console.log(user);
        console.log(hotel);
        console.log(date1);
        await firebase.firestore().collection("dashboard").add({
            username: user,
            hotelname: hotel,
            date: date1,
            status: "pending",
            idRoom: id
        })
        sweetAlert("success", "Booking thành công")
        setTimeout(function () {
            open("./shop.html", "_self")
        }, 1000)
    }
    else {
        sweetAlert("error", "Kiểm tra lại thông tin")
    }
}
let getInfo = (hotelname, id) => {
    let username = user1
    if (document.querySelector("#checkin").value == "" || document.querySelector("#checkout").value == "") {
        sweetAlert("error", "Điền đầy đủ thông tin")
    } else {
        checkInDate = document.querySelector("#checkin").value
        checkOutDate = document.querySelector("#checkout").value
    }
    let date = checkInDate + " đến " + checkOutDate

    updateDashboard(username, hotelname, date, id)
}

let scrollBooking = () => {
    let scroll = document.querySelector("#rooms")
    scroll.scrollIntoView();
}