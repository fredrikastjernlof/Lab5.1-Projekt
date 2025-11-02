"use strict";

//Inväntar att DOM är laddat innan koden exekveras:
document.addEventListener("DOMContentLoaded", () => {

    /*Händelsehanterare för att läsa av införd data till visitkortet, 
    vid klick på knappen 'Generera visitkort' med id="generate" : */
    document.querySelector("#send").addEventListener("click", readInputs);

    document.querySelector("#clear").addEventListener("click", clearAll);


    /* Hämtar element från DOM med hjälp av querySelector och 
        elementens id, elementen lagras i varsin variabel: */

    const fullnameInput = document.querySelector("#fullname");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    /* Hämtar <ul> - element för att lista meddelanden under; */
    const errorList = document.querySelector("#errorList");
    const messageSent = document.querySelector("#messageSent");


    /* Funktion för att läsa av den data som förts in i 
    formuläret och lagra/meddela eventuella felmeddelanden
    när jag klickar på knappen: */
    function readInputs(event) {

        event.preventDefault();

        const errors = []; // Tom array för att lagra felmeddelanden

        //Tömmer listor på eventuella tidigare meddelanden:
        errorList.textContent = "";
        messageSent.textContent = "";

        /* Använder en if-sats för att kontrollera om något värde har försts in
        i formuläret: */
        if (fullnameInput.value === "") { //Kontrollerar om namn är större än en tom textsträng
            errors.push("Du måste ange ett namn"); //Felmeddelande om inget namn har angetts
        }

        if (emailInput.value === "") {//Kontrollerar om epost är större än en tom textsträng
            errors.push("Du måste ange en e-postadress"); //Felmeddelande om ingen epost har angetts
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { /* Använder !regex.test() för att
            kontrollera om epost är giltig. Utropstecknet betyder "inte", så om infört värde inte uppfyller
            villkoren, får vi ett felmeddelande  */
            errors.push("Vänligen ange en giltig e-postadress") //Felmeddelande
        }

        if (messageInput.value === "") { //Kontrollerar om namn är större än en tom textsträng
            errors.push("Meddelandefältet får inte lämnas tomt"); //Felmeddelande om inget namn har angetts
        }


        if (errors.length > 0) {  //Kontrollerar om vi har några fel lagrade i arrayen
            displayErrors(errors); /*Om arrayen har lagrade fel så anropas funktionen displayErrors 
        och felmeddelandena skriv ut enlig funktionen nedan*/
            return errors; //Avslutar funktionen och returerar errors
        } else { /* Om allt ser bra ut anropar vi funktionen generateCard istället */
            showMessageSent();
        }
    }


    /* Funktion för att skriva ut felmeddelanden till en lista: */
    function displayErrors(errors) {

        errors.forEach(error => { /*Loopar genom array error för att plocka ut varje enskilt felmeddelande */
            const list = document.createElement("li"); /* Skapar ett nytt list-element <li></li> */
            list.textContent = error; /*  Lägger in felmeddelande mellan taggarna <li>Felmeddelande</li>*/
            errorList.appendChild(list); /* Lägger till <li> (child-element) med felmeddelande under <ul> 
        (parent-element) */

        });
    }


    /* Funktion för att skriva ut att meddelande skickats */
    function showMessageSent() {

        messageSent.textContent = ""; /* Rensar tidigare meddelanden*/ 
        
        const list = document.createElement("li"); /* Skapar list-element*/
        list.textContent = "Ditt meddelande har skickats!✅"; /* Meddelande */
        messageSent.appendChild(list); /* Lägger till list-element till ul messageSent*/
    }



    /* Funktion för att återställa formulär */
    function clearAll(event) {

        event.preventDefault();

        /*Återställer värdet till ett tomt fält genom
         att ändra värde till en tom textsträng: */
        fullnameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";


        /* Raderar meddelanden genom att ändra
        textinnehållet i listan till en tom textsträng: */
        errorList.textContent = ""
        messageSent.textContent= "" 
        


    }

});