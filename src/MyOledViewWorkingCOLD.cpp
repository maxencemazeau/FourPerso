/**
    Gestion d'une VUE pour le OLed : Base pour les écrans de travail
    @file MyOledViewWorkingCold.cpp
    @author Maxence MAZEAU
    @version 1.1 22/12/08 
*/

#include <Arduino.h>
#include "MyOledViewWorkingCOLD.h"

using namespace std;

void MyOledViewWorkingCOLD::display(Adafruit_SSD1306 *adafruit){

    MyOledViewWorking::display(adafruit);

    adafruit->setTextSize(1);
    adafruit->setCursor(70,20);
    adafruit->print("Waiting");

    //displayGifFire(adafruit, 80, 30);

    adafruit->setTextSize(2);
    adafruit->setCursor(10, 30);
    adafruit->print(getTag("temperature").c_str());

    adafruit->display();
}

void MyOledViewWorkingCOLD::update(Adafruit_SSD1306 *adafruit){
    Serial.println("Update my view MyOledViewWorkingCOLD");
}