const form = document.getElementById("form");
const cellphone = document.getElementById("inp-cellphone");
const email = document.getElementById("inp-email");
const password = document.getElementById("inp-password");


const isempty = (valor) =>{
    valor === "" ? true : false;
    console.log("holis")
}

const showError = (input, message)  =>{
    const formf = input.parentElement;

    formf.classList.remove("success");
    formf.classList.add("error");
    

    const errorfield = formf.querySelector("small");

    errorfield.textContent = message ;
}

const showsucces = (input) =>{
    const formfield = input.parentElement;

    formfield.classList.remove("error");
    formfield.classList.add("success");
    

    const errorfield = formfield.querySelector("small");

    errorfield.textContent = "" ;
}

const isemailsecure = (emailinput) =>{
    const regexemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regexemail.test(emailinput)

}

const ispasswordsecure = (passwordinp) =>{

    const regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    return regexpassword.test(passwordinp);
}

const iscellphonesecure = (cellphoneinput) =>{
    const regexcellphone = /^[0-9]{10}$/

    return regexcellphone.test(cellphoneinput)
}
const checkemail = () =>{
    
    let valid = false;

    const emailinput = email.value.trim();

    if (isempty(emailinput)) {
        showError(email,"El mail es obligatorio");
    } else if (!isemailsecure(emailinput)){
            showError(email,"El mail no es valido")
    }else{
        showsucces(email,"")

        valid = true;
    }
    
    return valid;
};

const checkcellphone = () =>{

    let valid = false;

    const cellphoneinput = cellphone.value.trim();

    if (isempty(cellphoneinput)) {
        showError(cellphone,"El telefono es obligatorio");
    }else if (!iscellphonesecure(cellphoneinput)) {
        showError(cellphone,"El telefono es incorrecto")
    }else{
        showsucces(cellphone)
        valid = true;
    };

    return valid;

};

const checkpassword = () => {
    let valid = false;

    const passwordinp = password.value.trim();


    if (isempty(passwordinp)) {
       showError(password, "La contraseña es obligatoria") ;
    } else if (!ispasswordsecure(passwordinp)){
        showError(password, "La contraseña es incorrecta")
    }else{
        showsucces(password)
        valid = true;
    };

    return valid;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    
    return (...args) =>{
        if (timeoutId) {
            clearTimeout(timeoutId);
            console.log("anda el time")            
        };
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    }
}

form.addEventListener(
    "input",
    debounce ((e) => {
    switch (e.target.id) {
        case "inp-email":
            checkemail();
            break;
        case "inp-cellphone":
            checkcellphone();
            break;
        case "inp-password":
            checkpassword();
            break;
    }
})
);