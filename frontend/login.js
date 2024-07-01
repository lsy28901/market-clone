const form = document.querySelector("#login-form");


const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const sha256Password = sha256(formData.get('password'))
    formData.set("password", sha256Password);

    const res = await fetch('/login', {
        method: "post",
        body: formData,
    })
    const data = await res.json();
    const accessToken = data.access_token;
    window.localStorage.setItem('token', accessToken)

    if (res.status === 200) {
        alert("로그인에 성공했습니다.")
        window.location.pathname = "/"
    } else if (res.status === 401) {
        alert("id 혹은 password가 틀렸습니다.")
    }
}



form.addEventListener("submit", handleSubmit)