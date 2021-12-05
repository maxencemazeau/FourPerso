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

 function getInfoWood(){

    var x = document.getElementById('typeBois_ListBox_Select');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var arrayOfStrings = JSON.parse(this.responseText);
            for (i = 0; i < arrayOfStrings.results.length; i++) {
                if(x.value == arrayOfStrings.results[i].id){
                    boisChoisi = arrayOfStrings.results[i];
                    document.getElementById('nom').innerHTML = arrayOfStrings.results[i].bois;
                    document.getElementById('typeBois').innerHTML = arrayOfStrings.results[i].typeBois;
                    document.getElementById('origine').innerHTML = arrayOfStrings.results[i].origine;
                    document.getElementById('tempsSechage').innerHTML = arrayOfStrings.results[i].tempsSechage;
                    document.getElementById('tempMin').innerHTML = arrayOfStrings.results[i].tempMin;
                }
         }
     }      
} 
xhttp.open("GET", "getAllWoodOptions", true);
xhttp.send();
}

function demarrageFour(){
    var i = 0;
    var temp = parseInt(temperature);
    if( temp >= boisChoisi.tempMin) {
       var timer = setInterval(function(){
            i++
            document.getElementById("timer").innerHTML = i;
            console.log(i);
            if(i == boisChoisi.tempsSechage){
                clearInterval(timer);
            }
            
        }, 1000);
    } else {
        console.log('non');
    }
    
}




function getFromESP_getAllWoodOptions() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var arrayOfStrings = JSON.parse(this.responseText);
            for (i = 0; i < arrayOfStrings.results.length; i++) {
                var x = document.getElementById("typeBois_ListBox_Select");
                var option = document.createElement("option");
                option.value = arrayOfStrings.results[i].id;
                option.text = arrayOfStrings.results[i].bois;
                
                x.add(option);
                } 
           

            //Refresh le contenu
            var siteHeader = document.getElementById('typeBois_ListBox_Select');
            siteHeader.style.display='none';
            siteHeader.offsetHeight; // no need to store this anywhere, the reference is enough
            siteHeader.style.display='block';

            }
            

    };
    xhttp.open("GET", "getAllWoodOptions", true);
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


        

