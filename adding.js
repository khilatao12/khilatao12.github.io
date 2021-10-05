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
let add = document.querySelector("#add")
add.onsubmit = (e) => {
    e.preventDefault();

    let name = document.querySelector("#name").value
    let benefit1 = document.querySelector("#benefit-1").value
    let benefit2 = document.querySelector("#benefit-2").value
    let benefit3 = document.querySelector("#benefit-3").value
    let discribe = document.querySelector("#discribe").value
    let img = document.querySelector("#img").value
    let price = document.querySelector("#price").value

    updateHotel(name, benefit1, benefit2, benefit3, discribe, img, price)
    document.querySelector("#name").value=""
    document.querySelector("#benefit-1").value =""
    document.querySelector("#benefit-2").value=""
    document.querySelector("#benefit-3").value=""
    document.querySelector("#discribe").value =""
    document.querySelector("#img").value=""
    document.querySelector("#price").value=""
}

let updateHotel = async (n, benefit1, benefit2, benefit3, discr, url, prce) => {
    if (n | benefit1 | benefit2 | benefit3 | discr | url | prce) {
        await firebase.firestore().collection("room").add({
            name: n,
            benefit: [benefit1, benefit2, benefit3],
            discribe: discr,
            img: url,
            price: prce, 
            status: "active"
        })
        sweetAlert("success", "Đã thêm hotel")
    }
    else {
        sweetAlert("error", "Cần điền đầy đủ thông tin")
    }
}