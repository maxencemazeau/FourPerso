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

   
   /*function getInfoWood(){

        //var x = document.getElementById("typeBois_ListBox_Select");
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var arrayOfStrings = JSON.parse(this.responseText);
                console.log(arrayOfStrings);
                for (i = 0; i < arrayOfStrings.results.length; i++) {
                    var id = arrayOfStrings.results[i].id;
                      document.getElementById("liste").innerHTML += "<option value='" + arrayOfStrings.results[i].id + "'>" + arrayOfStrings.results[i].nom + "</option>";
                            
                      document.getElementById("liste").addEventListener("change", function(){
                        var idBois = document.getElementById("liste").value;
                        for(var i = 0; i < arrayOfStrings.results.length; i++) {
                            if(arrayOfStrings.results[i].id == idBois) {
                                document.getElementById("nomDuBois").innerHTML = arrayOfStrings.results[i].nom;
                                
                            }
                        }
                    });         
                     }              
            }
        };
                xhttp.open("GET", "oui", true);
                xhttp.send(); 
    } */
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


function getCaracteristiqueBois(){
    var idBois = document.getElementById("listeBois").value;
    console.log(idBois);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200) {
                if(this.responseText.length > 0) {            
                    var description = JSON.parse(this.responseText);
                    console.log(description);
                    for(i = 0; i < description.results.length; i++){
                        boisChoisi = description.results[i].id;
                        document.getElementById("tempMin").innerHTML = description.results[i].tempMin;
                        document.getElementById("nomDuBois").innerHTML = description.results[i].nom;
                        document.getElementById("typeBois").innerHTML = description.results[i].type;
                        document.getElementById("origineBois").innerHTML = description.results[i].origine;
                        document.getElementById("dryingBois").innerHTML = description.results[i].drying;
                        document.getElementById("nomDuBois2").innerHTML = description.results[i].nom;
                        document.getElementById("tempMin2").innerHTML = description.results[i].tempMin;
                        document.getElementById("dryingBois2").innerHTML = description.results[i].drying;
                    }
                }
            }
        };
    xhttp.open("GET", "bois?idBois="+idBois, true);
    xhttp.send();
}

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

    