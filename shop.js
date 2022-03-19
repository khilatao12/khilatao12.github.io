const myJSON = `[{"img":"https://thienduongmaldives.com/wp-content/uploads/2019/09/193995542-1200x800.jpg","title":"Hard Rock Hotel","type":"Hotel"},
{"img":"https://q-xx.bstatic.com/xdata/images/hotel/840x460/264010334.jpg?k=349e902b6c66d2eb044dedbc34ab498d42d036742dc3c9e6edd886a9404323e4&o=","title":"Sheraton Maldives Full Moon","type":"Resort"}]`
$(document).ready(function(){
    $(window).scroll(function(){
        
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
    })
})
let progress = document.getElementById('progressbar');
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    window.onscroll = function(){
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
        loop:true,
    });

let section = document.querySelector('section.banner-container')
const hotels = JSON.parse(myJSON)
    let newHotels = hotels.map(hot => `<div class="banner">
    <img src="${hot.img}" alt="">
    <div class="content">
        <span>${hot.title}</span>
        <h3>${hot.type}</h3>
        <a href="#" class="btn">shop now</a>
    </div>
</div>`)
newHotel = newHotels.join('')
section.innerHTML = newHotel
console.log(hotel)
