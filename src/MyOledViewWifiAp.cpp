 #include <MyOledViewWifiAp.h>
 #include <Arduino.h>
 using namespace std;


 void MyOledViewWifiAp::update(Adafruit_SSD1306 *adafruit){
     Serial.println('Update Display Adafruit')
 }

 void MyOledViewWifiAp::display(Adafruit_SSD1306 *adafruit){

       adafruit-> setTextSize(1);
       adafruit->setTextColor(WHITE);
       adafruit->setCursor(0,0);
       adafruit->println("Hello, world!");
       adafruit->setTextColor(BLACK, WHITE); // 'inverted' text
       adafruit->println(3.141592);
       adafruit->setTextSize(2);
       adafruit->setTextColor(WHITE);
       adafruit->print("0x"); display.println(0xDEADBEEF, HEX);
       adafruit->display();
 }