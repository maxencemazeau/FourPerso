 #include <Adafruit_SSD1206.h>
 #include <string> 


 class MyOledViewWorkingWifiAP : public MyOledViewWorking {

    public :

       void setNomDuSysteme(std::string val);
       void setSsIDDuSysteme(std::string val);
       void setpassDuSysteme(std::string val);

    private:
     
        std::string NomDuSysteme;
        std::string IdDuSysteme; 
        std::string passDuSysteme;

         virtual void update(Adafruit_SSD1306 *adafruit) = 0;
         virtual void display( Adafruit_SSD1306 *adafruit) = 0;


 }