/**
    Gestion de la vue
    @file script.js
    @author Maxence MAZEAU
    @version 1.0 API 2022-10-20 
    @version 1.2 FOUR 2022-12-09
*/

var boisChoisi;
var temperature = 0;

//Récupération et affichage de la liste de bois
window.addEventListener("load", getNomBois());
function getNomBois(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200) {
                if(this.responseText.length > 0) {            
                    var description = JSON.parse(this.responseText);
                    
                    for(var i = 0; i < description.results.length; i++) {
                        var nomBois = description.results[i].nom;
                        var idBois = description.results[i].id;
                        document.getElementById("listeBois").innerHTML += "<option value='" + idBois + "'>" + nomBois + "</option>";
                    }
                    
                    document.getElementById("listeBois").addEventListener("change", getCaracteristiqueBois);
                    window.addEventListener("load", getCaracteristiqueBois());
                }
            }
        };
    xhttp.open("GET", "getlisteNomBois", true);
    xhttp.send();
}

//Récupération et affichage des caractéristiques des bois
function getCaracteristiqueBois(){
    var idBois = document.getElementById("listeBois").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200) {
                if(this.responseText.length > 0) {            
                    var description = JSON.parse(this.responseText);
                    
                    for(i = 0; i < description.results.length; i++){
                        boisChoisi = description.results[i];
                        document.getElementById("tempMin").innerHTML = description.results[i].tempMin;
                        document.getElementById("nomDuBois").innerHTML = description.results[i].nom;
                        document.getElementById("typeBois").innerHTML = description.results[i].type;
                        document.getElementById("origineBois").innerHTML = description.results[i].origine;
                        document.getElementById("dryingBois").innerHTML = description.results[i].drying;
                        document.getElementById("nomDuBois2").innerText = description.results[i].nom;
                        document.getElementById("dryingBois2").innerText = description.results[i].drying;
                        document.getElementById("tempMin2").innerText = description.results[i].tempMin;
                        document.getElementById("dryingBois2").value = description.results[i].drying
                        document.getElementById("tempMin2").value = description.results[i].tempMin;
                        document.getElementById("cercleVert").style.backgroundColor = "white";
                        document.getElementById("cercleRouge").style.backgroundColor = "red";
                        document.getElementById("cercleOrange").style.backgroundColor = "white";

                        
                    }
                    document.getElementById("four").addEventListener("click", four);
                    
                }
            }
        };
    xhttp.open("GET", "bois?idBois="+idBois, true);
    xhttp.send();
}

//Récupération de la température et affichage
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

    //Compteur et envoie d'information du timer au main
function four(){
     var i = 0;
            var timer = setInterval(function(){                
            i++
            
            document.getElementById("timer").innerHTML = i;
            if(i == boisChoisi.drying){              
                clearInterval(timer);
    }
            }, 1000); 
        
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "sendBoisInfo?drying="+boisChoisi.drying+"&tempMin="+boisChoisi.tempMin, true);
    xhttp.send();
}

//Gestion des affichages de l'état sur la page web
window.addEventListener("load", getFromEsp_StateLed());
function getFromEsp_StateLed(){
    setInterval(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(this.responseText == "DONE"){
                    document.getElementById("cercleVert").style.backgroundColor = "green";
                    document.getElementById("cercleRouge").style.backgroundColor = "white";
                    document.getElementById("cercleOrange").style.backgroundColor = "white";
                }
                else if(this.responseText == "COLD"){
                    document.getElementById("cercleVert").style.backgroundColor = "white";
                    document.getElementById("cercleRouge").style.backgroundColor = "red";
                    document.getElementById("cercleOrange").style.backgroundColor = "white";
                }
                else if(this.responseText == "HEAT"){
                    document.getElementById("cercleVert").style.backgroundColor = "white";
                    document.getElementById("cercleRouge").style.backgroundColor = "white";
                    document.getElementById("cercleOrange").style.backgroundColor = "orange";
                }
                
            }
        };
        xhttp.open("GET", "getStateLed", true);
        xhttp.send();
    }, 1000);
    };



            
