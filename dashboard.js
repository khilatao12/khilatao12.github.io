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
    render(data)
    console.log(data);
}
availableRoom()

let render = (data) => {
    let dom = document.querySelector("#body")
    for (let i = 0; i < data.length; i++) {

        let html = ` <tr>
        <td class="customer"><img
                src="https://freerangestock.com/sample/116135/handsome-man-avatar-.jpg"
                width="40px" height="40px" alt=""> ${data[i].username}</td>
        <td class="td-hotel">${data[i].hotelname}</td>
        <td>${data[i].date}</td>
        <td class="td-status"><span class="status blue"></span> away</td>
        <td class="contact">
            <span class="las la-user-circle"></span>
            <span class="las la-comment"></span>
            <span class="las la-phone"></span>
        </td>
        <td class="td-button"><button class="accept" onclick="acceptButton()">Accept</button>
        <button class="reject" onclick="rejectButton()">Reject</button>
        </td>
        <td>
            <i class="fas fa-check disapere"></i>
            <i class="fas fa-times disapere"></i>
        </td>
    </tr>`
        dom.innerHTML += html
    }
}
let acceptButton = () => {
   
    const button = document.querySelector(".td-button")
    button.classList.add("disapere")
    const tick = document.querySelector(".fa-check")
    tick.classList.add("appear")
}
let rejectButton = () => {
    const button = document.querySelector(".td-button")
    button.classList.add("disapere")
    const x = document.querySelector(".fa-times")
    x.classList.add("appear")
}