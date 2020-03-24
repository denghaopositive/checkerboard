let title = document.querySelector("title");title.innerText="";
titleTextCode.forEach((item) =>{
	title.innerText+=String.fromCodePoint(atob(item));
})
