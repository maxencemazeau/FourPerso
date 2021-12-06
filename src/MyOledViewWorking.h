// /**
//     Class MyOledView : Gestion d'une VUE pour le OLed
//     @file MyOledViewInitialisation.h
//     @author Samuel GASSAMA
//     @version 1.0 11/08/2021
    
//     Historique des versions   
//                             Versions  Date      Auteur      Description
//                             1.1      11/08/21   Samuel       Première version de la classe
                            
                            
//     platform = espressif32
//     board = esp32doit-devkit-v1
//     framework = arduino
//     lib_deps = 
//         Aucune
//     Autres librairies (à copier dans le répertoire lib)
//         Aucune
    
//     Exemple d'utilisation 
//         //Définition 
//             #include "MyOledView.h"
//             class MyOledViewInitialisation: public MyOledView {
//                 public:
                
//                 private:
//                     //Mettre la vue dans cette méthode
//                     void display( Adafruit_SSD1306 *adafruit);
//         ...
//         //Utilisation
//         myOledViewInitialisation = new MyOledViewInitialisation();
//         myOled->displayView(myOledViewInitialisation);
// **/

// #include <Adafruit_SSD1306.h>
// #include <string>
// using namespace std;

// class MyOledViewWorking : public MyOledView {

//     public: 

//         void init(std::string _id);
//         virtual void display( Adafruit_SSD1306 *adafruit) = 0;
//         virtual void update(Adafruit_SSD1306 *adafruit) = 0;



//     protected:
//         int IndexFire;
//         int IndexFireDelay;
//         unsigned char Fire24x24Pointers = 6;
    
// }
