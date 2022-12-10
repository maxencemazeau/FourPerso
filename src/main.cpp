/* Copyright (C) 2021 Alain Dube
 * All rights reserved.
 *
 * Projet Sac
 * Ecole du Web
 * Cours Objets connectés (c)2021
 *  
    @file     main.cpp
    @author   Alain Dubé
    @version  1.1 21/08/15 

    Historique des versions
           Version    Date       Auteur       Description
           1.1        21/08/15  Alain       Première version du logiciel

    platform = espressif32
    board = esp32doit-devkit-v1
    framework = arduino
    lib_deps = 
                      
            ESPAsyncWebServer-esphome                   (Pour accéder au Wifi)
            AsyncTCP-esphome                            (Pour utiliser les focntionnalités TCP)
            bblanchon/ArduinoJson@^6.17.2               (Pour accéder au fonctionnalités Json)

    Autres librairies (à copier dans le répertoire lib)
         WifiManagerDevelopment
            //Remarques
            //Pour trouver le WifiManager (dans la branche development)
            //   https://github.com/tzapu/WiFiManager/tree/development
            //   Ne pas oublier d'appuyez sur l'ampoule et choisir : ajouter Lib
    
    Fonctions utiles (utilitaires)
        /lib/MYLIB/myFunctions.cpp
            //Pour vérifier plus simplement que deux chaines sont identiques
            bool isEqualString(std::string line1, std::string line2)
            //Pour extraire une partie d'une chaine de caractères avec l'aide d'un index
            std::string getValue(std::string data, char separator, int index)
            //Pour remplacer plus facilement une sous chaine
            bool replaceAll(std::string& source, const std::string& from, const std::string& to)
            //Pour obtenir un chaine aléatoire d'une certaine longeur
            std::string get_random_string(unsigned int len)

    Classes du système
         
        MyServer                        V1.0    Pour la gestion des routes pour le site WEB
            /data                               Répertoire qui contient les fichiers du site WEB 
                index.html              V1.0    Page index du site WEB
                index.css               V1.0    CSS
                script.js               V1.0    JS (fonctions JavaScript)
              
 * */

#include <iostream>
#include <string>

#include <Arduino.h>
#include <ArduinoJson.h>

#include "myFunctions.cpp" //fonctions utilitaires

using namespace std;

#include <HTTPClient.h>


#include <WiFiManager.h>

WiFiManager wm;
#define WEBSERVER_H

//Pour la gestion du serveur ESP32
#include "MyServer.h"
MyServer *myServer = NULL;

#include "MyOledViewWifiAp.h"
MyOledViewWifiAp *myOledViewWifiAp = NULL;

#include "MyOledViewInitialisation.h"
MyOledViewInitialisation *myOledViewInitialisation = NULL;

#include "MyOledViewWorkingOFF.h"
MyOledViewWorkingOFF *myOledViewWorkingOFF = NULL;

#include "MyOledViewWorkingCOLD.h"
MyOledViewWorkingCOLD *myOledViewWorkingCOLD = NULL;

#include "MyOledViewWorkingHEAT.h"
MyOledViewWorkingHEAT *myOledViewWorkingHEAT = NULL;

//Variable pour la connection Wifi
const char *SSID = "Led_";
const char *PASSWORD = "led_";
String ssIDRandom;

#include "MyOled.h"
MyOled *myOled = NULL;

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

#define OLED_RESET     15 // Reset pin # (or -1 if sharing Arduino reset pin)
#define addrI2C 0x3C
bool splashScreen = true;

#include "TemperatureStub.h"
#define DHTPIN  15   // Pin utilisée par le senseur DHT11 / DHT22
#define DHTTYPE DHT22  //Le type de senseur utilisé (mais ce serait mieux d'avoir des DHT22 pour plus de précision)
TemperatureStub *temperatureStub = NULL;
float temperature;
int currentTemperatureDisplayed = 0;
char strTemperature[128];

#define GPIO_PIN_LED_LOCK_ROUGE         12 //GPIO12
#define GPIO_PIN_LED_OK_GREEN             14 //GPIO14
#define GPIO_PIN_LED_HEAT_YELLOW        27 //GPIO27
String stateFour = "";

//Variable pour la gestion des informations du bois reçues
int drying = 0;
int dryingBois = 0;
int tempMin = 0;
int compteur = 0;
bool isDrying = false;

int delayOnLoop = 1000;

#define nomSystem "SAC System"
string idDuSysteme = "21546";

#include "MyButton.h"
MyButton *myButtonAction = NULL;
MyButton *myButtonReset = NULL;

//fonction statique qui permet aux objets d'envoyer des messages (callBack) 
//  arg0 : Action 
// arg1 ... : Parametres
std::string CallBackMessageListener(string message) {
    while(replaceAll(message, std::string("  "), std::string(" ")));
    //Décortiquer le message
    string actionToDo = getValue(message, ' ', 0);
    string arg1 = getValue(message, ' ', 1);
    string arg2 = getValue(message, ' ', 2);
    string arg3 = getValue(message, ' ', 3);
    string arg4 = getValue(message, ' ', 4);
    string arg5 = getValue(message, ' ', 5);
    string arg6 = getValue(message, ' ', 6);
    string arg7 = getValue(message, ' ', 7);
    string arg8 = getValue(message, ' ', 8);
    string arg9 = getValue(message, ' ', 9);
    string arg10 = getValue(message, ' ', 10);

    if (string(actionToDo.c_str()).compare(string("button")) == 0) {
        if(string(arg1.c_str()).compare(string("getlisteBois")) == 0) {
            return(String("Ok").c_str());
            }
        if(string(arg1.c_str()).compare(string("getTemperatureSensor")) == 0) {       
            return(String(temperature).c_str());
            }
        if(string(arg1.c_str()).compare(string("sendBoisInfo")) == 0) {
            drying = atoi(arg2.c_str());
            dryingBois = atoi(arg2.c_str());
            tempMin = atoi(arg3.c_str());
            isDrying = true;
            return(String("Ok").c_str());
            }
        if(string(arg1.c_str()).compare(string("getStateLed")) == 0) {
            return(stateFour.c_str());
            }
    }

}

 void displayGoodScreen(){
  delay(10);
  sprintf(strTemperature, "%g", temperature);
  if(isEqualString(stateFour.c_str(), string("HEAT"))) myOled->updateCurrentView(myOledViewWorkingHEAT);
  if(isEqualString(stateFour.c_str(), string("DONE"))) {
    myOledViewWorkingOFF = new MyOledViewWorkingOFF();
    myOledViewWorkingOFF->setParams("nomDuSysteme", nomSystem);
    myOledViewWorkingOFF->setParams("idDuSysteme", idDuSysteme);
    myOledViewWorkingOFF->setParams("temperature", strTemperature);
    myOledViewWorkingOFF->setParams("ipDuSysteme",WiFi.localIP().toString().c_str());
    myOled->displayView(myOledViewWorkingOFF);
    currentTemperatureDisplayed = temperature;
  }

  if(isEqualString(stateFour.c_str(), string("COLD"))) {
    myOledViewWorkingCOLD = new MyOledViewWorkingCOLD();
    myOledViewWorkingCOLD->setParams("nomDuSysteme", nomSystem);
    myOledViewWorkingCOLD->setParams("idDuSysteme", idDuSysteme.c_str());
    myOledViewWorkingCOLD->setParams("temperature", strTemperature);
    myOledViewWorkingCOLD->setParams("ipDuSysteme",WiFi.localIP().toString().c_str());
    myOled->displayView(myOledViewWorkingCOLD);
    currentTemperatureDisplayed = temperature;
  }

  if(isEqualString(stateFour.c_str(), string("HEAT"))) {
    myOledViewWorkingHEAT = new MyOledViewWorkingHEAT();
    myOledViewWorkingHEAT->setParams("nomDuSysteme", nomSystem);
    myOledViewWorkingHEAT->setParams("idDuSysteme", idDuSysteme);
    myOledViewWorkingHEAT->setParams("temperature", strTemperature);
    myOledViewWorkingHEAT->setParams("ipDuSysteme",WiFi.localIP().toString().c_str());
    myOled->displayView(myOledViewWorkingHEAT);
    currentTemperatureDisplayed = temperature;
  }
} 

void setup() { 
    Serial.begin(9600);
    delay(100);
      //Initialisation des boutons
    myButtonAction = new MyButton();
    myButtonAction->init(T8);
    int sensibilisationButtonAction = myButtonAction->autoSensibilisation();
    
    myButtonReset = new MyButton();
    myButtonReset->init(T9);
    int sensibilisationButtonReset = myButtonReset->autoSensibilisation();
    char strBoutonAction[128];
    sprintf(strBoutonAction, "%d", sensibilisationButtonAction);

    char strBoutonReset[128];
    sprintf(strBoutonReset, "%d", sensibilisationButtonReset);
    // ----------- Stub de la temperature ----------------<
    temperatureStub = new TemperatureStub();
    temperatureStub->init(DHTPIN, DHTTYPE);
    //Connection au WifiManager
    String ssIDRandom, PASSRandom;
    String stringRandom;
    stringRandom = get_random_string(4).c_str();
    ssIDRandom = SSID;
    ssIDRandom = ssIDRandom + stringRandom;
    stringRandom = get_random_string(4).c_str();
    PASSRandom = PASSWORD;
    PASSRandom = PASSRandom + stringRandom;

char strToPrint[128];
    sprintf(strToPrint, "Identification : %s   MotDePasse: %s", ssIDRandom, PASSRandom);
    Serial.println(strToPrint);


 if (!wm.autoConnect(ssIDRandom.c_str(), PASSRandom.c_str())){
        Serial.println("Erreur de connexion.");
      
        }
    else {
        Serial.println("Connexion Établie.");
        }

    // ----------- Routes du serveur ----------------
    myServer = new MyServer(80);
    myServer->initAllRoutes();
    myServer->initCallback(&CallBackMessageListener);

    // ----------- Affichage sur l'écran ----------------
    myOled = new MyOled(&Wire, addrI2C, SCREEN_HEIGHT, SCREEN_WIDTH);
    if (splashScreen) {
        myOled->init();
        splashScreen = false;
    }
    myOledViewInitialisation = new MyOledViewInitialisation();
    myOledViewInitialisation->setIdDuSysteme(idDuSysteme.c_str());
    myOledViewInitialisation->setNomDuSysteme(nomSystem);
    myOledViewInitialisation->setSensibiliteBoutonAction(strBoutonAction);
    myOledViewInitialisation->setSensibiliteBoutonReset(strBoutonReset);
    myOled->displayView(myOledViewInitialisation);
    delay(2000);
    myOled->clearDisplay();

    myOledViewWifiAp = new MyOledViewWifiAp();
    myOledViewWifiAp->setNomDuSysteme(nomSystem);
    myOledViewWifiAp->setSsIDDuSysteme(ssIDRandom.c_str());
    myOledViewWifiAp->setPassDuSysteme(PASSRandom.c_str());
    myOled->displayView(myOledViewWifiAp);
    delay(2000);
    myOled->clearDisplay();

    // ----------- Gestion de la LED ----------------
    pinMode(GPIO_PIN_LED_LOCK_ROUGE , OUTPUT);
    pinMode(GPIO_PIN_LED_HEAT_YELLOW, OUTPUT);
    pinMode(GPIO_PIN_LED_OK_GREEN, OUTPUT);

    for(int i = 0; i < 2; i++){
    digitalWrite(GPIO_PIN_LED_LOCK_ROUGE,HIGH);
    digitalWrite(GPIO_PIN_LED_OK_GREEN,HIGH);
    digitalWrite(GPIO_PIN_LED_HEAT_YELLOW,HIGH);
    delay(1000);
    digitalWrite(GPIO_PIN_LED_LOCK_ROUGE,LOW);
    digitalWrite(GPIO_PIN_LED_OK_GREEN,LOW);
    digitalWrite(GPIO_PIN_LED_HEAT_YELLOW,LOW);
    delay(1000);
    }

    digitalWrite(GPIO_PIN_LED_LOCK_ROUGE,HIGH);
    digitalWrite(GPIO_PIN_LED_OK_GREEN,HIGH);
    digitalWrite(GPIO_PIN_LED_HEAT_YELLOW,HIGH);

 }


void loop() {
    temperature = temperatureStub->getTemperature();

    if (isDrying == false && digitalRead((GPIO_PIN_LED_HEAT_YELLOW) == HIGH)) {
            digitalWrite(GPIO_PIN_LED_LOCK_ROUGE , LOW);
            digitalWrite(GPIO_PIN_LED_HEAT_YELLOW, HIGH);
            digitalWrite(GPIO_PIN_LED_OK_GREEN, HIGH);
        }

    
    if (isDrying == true)
    {
        delayOnLoop = 10;
        if(drying % 1000 == 0) {
        compteur = drying/1000;

        if(dryingBois == compteur && digitalRead((GPIO_PIN_LED_OK_GREEN) == LOW)) {
            digitalWrite(GPIO_PIN_LED_OK_GREEN, LOW);
            digitalWrite(GPIO_PIN_LED_HEAT_YELLOW, HIGH);
            stateFour = "DONE";
            }
        else if(temperature >= tempMin && compteur < dryingBois && digitalRead((GPIO_PIN_LED_LOCK_ROUGE) == LOW)) {
            digitalWrite(GPIO_PIN_LED_LOCK_ROUGE, HIGH);
            digitalWrite(GPIO_PIN_LED_HEAT_YELLOW, LOW);
            digitalWrite(GPIO_PIN_LED_OK_GREEN, HIGH);
            stateFour = "HEAT";
            }
        else if(temperature < tempMin && dryingBois > compteur) {
            //decrease compteur
            digitalWrite(GPIO_PIN_LED_OK_GREEN, HIGH);
            digitalWrite(GPIO_PIN_LED_HEAT_YELLOW, HIGH);
            digitalWrite(GPIO_PIN_LED_LOCK_ROUGE, LOW);
            drying -= 10;
            stateFour = "COLD";
            }
            displayGoodScreen();
        }
        drying += 10;
        
    }
    
    
    delay(delayOnLoop);
  }


