// const { addListener } = require("nodemon");


// Fonction qui permet d'obtenir le nom du système (actualisée toutes les secondes)
/*setInterval(function getNomSysteme(){
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(this.status == 200) {
            document.getElementById("nomSysteme").value = this.responseText;
        }
    };

    xhttp.open("GET", "lireNomDuSysteme", true);
    xhttp.send();
}, 10000); */

function getFromESP_getNom () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.getElementById("nom").innerHTML = this.responseText;
    
    }
    
    };
    xhttp.open("GET", "getNomEsp", true);
    xhttp.send();
    

   }

   var boisChoisi;
   var temperature;

/* window.addEventListener("load", getNomBois());
function getNomBois(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200) {
                if(this.responseText.length > 0) {            
                    var description = JSON.parse(this.responseText);
                    var listeBois = [];
                    var listeNomBois = [];
                    for(var i = 0; i < description.results.length; i++) {
                        listeBois.push(JSON.parse(description.results[i].description));
                    }
                    console.log("oui");
                    console.log(listeBois);
                    listeBois.forEach(function(element) {
                        console.log(element.name);
                        console.log(element.type);
                        var option = document.createElement("option");
                        option.text = element.name;
                        document.getElementById("nomBois").appendChild(option);
                        listeNomBois.push(element.name);
                        document.getElementById('type').innerHTML = element.type;
                        listeNomBois.push(element.type);
                        document.getElementById('tempsSechage').innerHTML = element.drying;
                        listeNomBois.push(element.drying);
                    });
                }

            }
        };
    xhttp.open("GET", "oui", true);
    xhttp.send();
*/

 //window.addEventListener("load", getNomBois());
 /*function getNomBois(){


  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200) {
                if(this.responseText.length > 0) {            
                    var description = JSON.parse(this.responseText);
                    console.log(description);
                    for(var i = 0; i < description.results.length; i++) {
                        
                        var nomBois = description.results[i].nom;
                        var idBois = description.results[i].id;
                        //var type = description.results[i].type;
                      
                        document.getElementById("nomBois").innerHTML += "<option value='" + idBois + "'>" + nomBois + "</option>";

                        document.getElementById("nomBois").addEventListener("change", function(){
                          var idBois = document.getElementById("nomBois").value;
                          for(var i = 0; i < description.results.length; i++) {
                              if(description.results[i].id == idBois) {
                                  document.getElementById("typeBois").innerHTML = description.results[i].type;
                                  document.getElementById("nomDuBois").innerHTML = description.results[i].nom;
                                  document.getElementById("origineBois").innerHTML = description.results[i].origine;
                                  document.getElementById("dryingBois").innerHTML = description.results[i].drying;
                                  document.getElementById("tempMin").innerHTML = description.results[i].tempMin;
                                  document.getElementById("tempMin2").innerHTML = description.results[i].tempMin;
                                  document.getElementById("dryingBois2").innerHTML = description.results[i].drying;
                              }
                          }
                      });
                      
                    }
                }

            }
        };
    xhttp.open("GET", "oui", true);
    xhttp.send(); */


    function getInfoWood(){

        var x = document.getElementById('typeBois_ListBox_Select');
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var arrayOfStrings = JSON.parse(this.responseText);
                console.log(arrayOfStrings);
                for (i = 0; i < arrayOfStrings.results.length; i++) {
                    if(x.value == arrayOfStrings.results[i].id){
                        boisChoisi = arrayOfStrings.results.id[i].id;
                        console.log(boisChoisi);
                        document.getElementById("nomDuBois").innerHTML = arrayOfStrings.results[i].nom;
                        document.getElementById("typeBois").innerHTML = arrayOfStrings.results[i].type;
                        document.getElementById("origineBois").innerHTML = arrayOfStrings.results[i].origine;
                        document.getElementById("dryingBois").innerHTML = arrayOfStrings.results[i].drying;
                        document.getElementById("tempMin").innerHTML = arrayOfStrings.results[i].tempMin;
                        }

                }
            }
        };
                xhttp.open("GET", "oui", true);
                xhttp.send(); 
    }

  /*function getIdBois(){

    var id = document.getElementById("list");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200) {
                if(this.responseText.length > 0) {            
                    var description = JSON.parse(this.responseText);
                    console.log(description);
                    for( i = 0; i < description.results.id.length; i++){
                      if(id.value == description.results[i].id){
                      console.log(description.results.id);
                      document.getElementById("nomDuBois").innerHTML = description.results[i].id;
                      }
                    }
                }        
            }
  }
  xhttp.open("GET", "oui", true);
  xhttp.send(); 

} */

  document.getElementById("four").addEventListener("click", function(){
    var i = 0;
    var temp = parseInt(temperature);
    if( temp >= boisChoisi.tempMin) {
       var timer = setInterval(function(){
            i++
            document.getElementById("timer").innerHTML = i;
            console.log(i);
            if(i == boisChoisi.drying){
                clearInterval(timer);
            }
            
        }, 1000);
    } else {
        console.log('non');
    }
    
});


function getFromESP_getAllWoodOptions() {
    var xhttp = new XMLHttpRequest();
    console.log("ici");
    xhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
            var arrayOfStrings = JSON.parse(this.responseText);
            console.log("la");
            for (i = 0; i < arrayOfStrings.results.length; i++) {
                var x = document.getElementById("typeBois_ListBox_Select");
                var option = document.createElement("option");
                option.value = arrayOfStrings.results[i].id;
                option.text = arrayOfStrings.results[i].nom;
                //x.appendChild(t)
                //document.getElementById("typeBois_ListBox_Select").appendChild(t);
                
                x.add(option);
                } 
           

            //Refresh le contenu
            var siteHeader = document.getElementById('typeBois_ListBox_Select');
            siteHeader.style.display='none';
            siteHeader.offsetHeight; // no need to store this anywhere, the reference is enough
            siteHeader.style.display='block';

    //}
            

    };
    xhttp.open("GET", "oui", true);
    xhttp.send();
}


setInterval(function getFromEsp_TemperatureSensor(){
    var xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("temp").innerHTML = this.responseText;
            temperature = this.responseText;
            
        }
    };
    xhttp.open("GET", "getTemperatureSensor", true);
    xhttp.send();
    
    }, 3000);

    // The active locale
/*
const locale = "fr";

// We can have as many locales here as we want,

// and use any locales we want. We have English

// and Arabic as locales here as examples.

const translations = {

  // English translations

  "en": {

    "app-title": "Type of wood",

    "lead": "control of the drying oven",

  },

  // French translations

  "fr": {

    "app-title": "Type de bois",

    "lead": "Controle du four de séchage",

  },

};

// When the page content is ready...

document.addEventListener("DOMContentLoaded", () => {

  document

    // Find all elements that have the key attribute

    .querySelectorAll("[data-i18n-key]")

    .forEach(translateElement);

});

// Replace the inner text of the given HTML element

// with the translation in the active locale,

// corresponding to the element's data-i18n-key

function translateElement(element) {

  const key = element.getAttribute("data-i18n-key");

  const translation = translations[locale][key];
  element.innerText = translation;

}

const defaultLocale = "fr";
let locale;
// ...
// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
  setLocale(defaultLocale);
  bindLocaleSwitcher(defaultLocale);
});

function bindLocaleSwitcher(initialValue) {
    const switcher =
      document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
      // Set the locale to the selected option[value]
      setLocale(e.target.value);
    };
  }

*/

    
}