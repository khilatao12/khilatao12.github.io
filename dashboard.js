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
    let result = await firebase.firestore().collection("dashboard").get()
    let data = getDataFromDocs(result.docs)
    let customers = document.querySelector("#customer")
    
    let order = document.querySelector("#order")
    order.innerHTML = data.length
    customers.innerHTML = data.length
    
    render(data)
}
availableRoom()

let render = (data) => {
    let dom = document.querySelector("#body")
    for (let i = 0; i < data.length; i++) {
        if (`${data[i].status}` == "pending") {
            let html = ` <tr>
            <td class="id"  id="c${i}">${data[i].id}</td>
        <td class="customer"><img
                src="https://freerangestock.com/sample/116135/handsome-man-avatar-.jpg"
                width="40px" height="40px" alt=""> ${data[i].username}</td>
        <td class="td-hotel">${data[i].hotelname}</td>
        <td>${data[i].date}</td>
        <td class="td-status"><span class="status blue"></span> ${data[i].status}</td>
        <td class="contact">
            <span class="las la-user-circle"></span>
            <span class="las la-comment"></span>
            <span class="las la-phone"></span>
        </td>
        <td id="td${i}" class="td-button"><button class="accept" id="accept${i}" >Accept</button>
        <button id="reject${i}" class="reject" >Reject</button>
        </td>
        <td>
            <i id="check${i}" class="fas fa-check disapere"></i>
            <i id="times${i}" class="fas fa-times disapere"></i>
        </td>
    </tr>`
            dom.innerHTML += html
        }
        if (`${data[i].status}` == "accept") {
            let html = ` <tr>
            <td class="id"  id="c${i}">${data[i].id}</td>
        <td class="customer"><img
                src="https://freerangestock.com/sample/116135/handsome-man-avatar-.jpg"
                width="40px" height="40px" alt=""> ${data[i].username}</td>
        <td class="td-hotel">${data[i].hotelname}</td>
        <td>${data[i].date}</td>
        <td class="td-status"><span class="status green"></span> ${data[i].status}</td>
        <td class="contact">
            <span class="las la-user-circle"></span>
            <span class="las la-comment"></span>
            <span class="las la-phone"></span>
        </td>  
        <td id="td${i}" class="td-button disapere"><button class="accept" id="accept${i}" >Accept</button>
        <button id="reject${i}" class="reject" >Reject</button>
        </td>     
        <td>
            <i id="check${i}" class="fas fa-check"></i>
        </td>
    </tr>`
            dom.innerHTML += html
        }
        if (`${data[i].status}` == "reject") {
            let html = ` <tr>
            <td class="id" id="c${i}">${data[i].id}</td>
        <td class="customer"><img
                src="https://freerangestock.com/sample/116135/handsome-man-avatar-.jpg"
                width="40px" height="40px" alt=""> ${data[i].username}</td>
        <td class="td-hotel">${data[i].hotelname}</td>
        <td>${data[i].date}</td>
        <td class="td-status"><span class="status orange"></span> ${data[i].status}</td>
        <td class="contact">
            <span class="las la-user-circle"></span>
            <span class="las la-comment"></span>
            <span class="las la-phone"></span>
        </td>       
        <td id="td${i}" class="td-button disapere"><button class="accept" id="accept${i}" >Accept</button>
        <button id="reject${i}" class="reject" >Reject</button>
        </td>     
        <td>
            <i id="check${i}" class="fas fa-times"></i>
        </td>
    </tr>`
            dom.innerHTML += html
        }
    }
    for (let i = 0; i < data.length; i++) {
        document.querySelector(`#accept${i}`).addEventListener("click", () => {
            const currentid = document.querySelector(`#c${i}`).textContent
            const button = document.querySelector(`#td${i}`)
            button.classList.add("disapere")
            const tick = document.querySelector(`#check${i}`)
            tick.classList.add("appear")
            updateStatus(currentid, "accept", data[i].idRoom, "deactive")
        })
        document.querySelector(`#reject${i}`).addEventListener("click", () => {
            const currentid = document.querySelector(`#c${i}`).textContent
            const button = document.querySelector(`#td${i}`)
            button.classList.add("disapere")
            const x = document.querySelector(`#times${i}`)
            x.classList.add("appear")
            updateStatus(currentid, "reject", data[i].idRoom, "active")
        })
    }
    let deal = document.querySelector("#deal")
    let deals = 0
    for (let i = 0; i < data.length; i++) {
        if(`${data[i].status}` =="accept" ){
            deals += 1
            deal.innerHTML = deals
        }
    }
}

let updateStatus = async (id, sta, roomID, rst) => {
    await firebase.firestore().collection("dashboard").doc(id).update({
        status: sta,
    })
    await firebase.firestore().collection("room").doc(roomID).update({
        status: rst,
    })
}