const qrPreview = document.getElementById("qrPreview")
const qrText = document.getElementById("qrText")
const qrColor = document.getElementById("qrColor")
const bgColor = document.getElementById("bgColor")
const qrLogo = document.getElementById("qrLogo")
const download = document.getElementById("download")
const qrQuality = document.getElementById("qrQuality")
const qrMargin = document.getElementById("qrMargin")
const transparentBg = document.getElementById("transparentBg")
const format = document.getElementById("format")
const sP = document.getElementById("savePreset")
const lP = document.getElementById("loadPreset")
const rQ = document.getElementById("resetQR")
const styleq = document.getElementById("dotStyle")

const qrCode = new QRCodeStyling({
    width:512,
    height:512,
    data:"AzkaPrata",
    margin:5,
    dotsOptions:{
        color:"#000000",
        type: "rounded"
    },
    backgroundOptions:{
        color:"#ffffff"
    },
    imageOptions:{
        crossOrigin: "anonymous",
        margin:8,
        imageSize: 0.25
    },
    type:"canvas"
})

qrCode.append(qrPreview)

qrText.addEventListener("input", ()=>{
    if(!qrText.value){
        qrCode.update({
            data:"AzkaPrata"
        })
    }else{
        qrCode.update({
            data:qrText.value
        })
    }
})

qrColor.addEventListener("input", ()=>{
    qrCode.update({
        dotsOptions:{
            color:qrColor.value
        }
    })
})

bgColor.addEventListener("input", ()=>{
    qrCode.update({
        backgroundOptions:{
            color:bgColor.value
        }
    })
})

qrLogo.addEventListener("input", ()=>{
    const file = qrLogo.files[0]
    if(!file) return;
    const reader = new FileReader()
    reader.onload = ()=>{
        qrCode.update({
            image: reader.result
        })
    }
    reader.readAsDataURL(file)
})

download.addEventListener('click', ()=>{
    let num = Math.floor(Math.random()*9999).toString()
    let date = new Date()
    let year= date.getFullYear().toString()
    let day = date.getDate().toString()
    let month = date.getMonth()+1
    const qrQuality = document.getElementById("qrQuality")
    const size = parseInt(qrQuality.value)
    const fileName = "QR-"+num+year+day+month
    const formatFile = format.value
    qrCode.update({
        width:size,
        height:size,
        backgroundOptions:{
            color: transparentBg.checked ? "transparent" : bgColor.value
        }
    })
    qrCode.download({
        name: fileName,
        extension: formatFile
    })
})

qrMargin.addEventListener("input", ()=>{
    qrCode.update({
        imageOptions:{
            margin: qrMargin.value
        }
    })
})

styleq.addEventListener("change", ()=>{
    console.log(styleq.value)
    qrCode.update({
        dotsOptions:{
            type:styleq.value
        }
        
    })
})



