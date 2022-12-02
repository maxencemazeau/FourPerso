
   var boisChoisi;
   var temperature;
   var etat;
   
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
                        boisChoisi = description.results[i];
                        document.getElementById("tempMin").innerHTML = description.results[i].tempMin;
                        document.getElementById("nomDuBois").innerHTML = description.results[i].nom;
                        document.getElementById("typeBois").innerHTML = description.results[i].type;
                        document.getElementById("origineBois").innerHTML = description.results[i].origine;
                        document.getElementById("dryingBois").innerHTML = description.results[i].drying;
                        document.getElementById("nomDuBois2").innerHTML = description.results[i].nom;
                        document.getElementById("tempMin2").innerHTML = description.results[i].tempMin;
                        document.getElementById("dryingBois2").innerHTML = description.results[i].drying;
                       // etat="OFF";
                        document.getElementById("rouge").style.visibility = 'visible';
                        document.getElementById("orange").style.visibility = 'hidden';
                        document.getElementById("vert").style.visibility = 'hidden';
                        var xhttp2 = new XMLHttpRequest()
                        xhttp2.open("GET", "etatFour?etat="+"OFF", true);
                        xhttp2.send();
                    }
                    document.getElementById("four").addEventListener("click", four);
                }
            }
        };
    xhttp.open("GET", "bois?idBois="+idBois, true);
    xhttp.send();
}

  function four(){
    var i = 0;
    var temp = parseInt(temperature);
    if( temp >= boisChoisi.tempMin) {
            var timer = setInterval(function(){
                
            i++
            document.getElementById("timer").innerHTML = i;
            document.getElementById("rouge").style.visibility = 'hidden';
            document.getElementById("orange").style.visibility = 'visible';
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "etatFour?etat="+"HEATING", true);
            xhttp.send();
            if(i == boisChoisi.drying){
                
                clearInterval(timer);
                document.getElementById("orange").style.visibility = 'hidden';
                document.getElementById("vert").style.visibility = 'visible';
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "etatFour?etat="+"COLD", true);
            }
            
    }, 1000);
    
}
};

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
