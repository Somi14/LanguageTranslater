const selectTag=document.querySelectorAll("select"),
 formText=document.querySelector(".from-text"),
 toText=document.querySelector(".to-text"),
translateBtn=document.querySelector("button"),
exchangeIcon=document.querySelector(".exchange");
const icons=document.querySelectorAll(".row i");
 const iconsArray = Array.from(icons);


selectTag.forEach((tag, id)=>{
    for (const country_code in countries) {
       
        let selected;
        if(id==0 && country_code=="en-GB")
        {
            selected="selected"
        }
        else if(id==1 && country_code=="hi-IN")
        {
            selected="selected"

        }

       
       let option= `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
       tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener("click", ()=>{
    let tempText = formText.value,
    tempLang = selectTag[0].value;
    formText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", ()=>{
    let text=formText.value;
    let traslateFrom=selectTag[0].value;
    let traslateTo=selectTag[1].value;
    console.log(text);

   let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${traslateFrom}|${traslateTo}`
    
   fetch(apiUrl).then(res=> res.json()).then(data=>{
    console.log(data);
    toText.value=data.responseData.translatedText;
   })
    
});

iconsArray.forEach(icon=>{
    icon.addEventListener("click", ({target}) => {
        if(!formText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(formText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(formText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});
