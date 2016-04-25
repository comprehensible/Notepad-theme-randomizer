 
            /*
            this code runs in unity3d and save notepad themes from an example theme specified as imput string path.
            
            N++ theme randomizer code in all it's glory, in uinty version JS with C# API for system IO. 
            I extended this version to include more randomizations and foudn that it took careful tweaking 
            to get better results than this ersion that just tweaks all the main color fonts, 
            it doesnt change the comment colors, the background, the font type, only the colors of numbers, brackets, 
            normal words, code words, variables and so on.
            
            To make a better version of this you have to carefully read through an XML file and see how it is built, 
            and then you have to add whatever you think is necessary to make this file more flexible and make a better
            variety of themes. there are various clauses for parsing theme XML color codes based on the prefix of the line
            that's all it is. lines starting with wordstyle are all grouped and changed randomly, stuff with widget style i 
            didnt write color randomization as it's already fine for my use. didn't find the font option, it cant be difficult.
            
        
            */
            
            var darks = 0.05; //base contrast , for the moment it's high contrast.
            var brights = 0.95;//base contrast , for the moment it's high contrast.
            var sat = 0.45; //  Saturation... .4 is pastel colors and .8 is distracting candy colors
            //  hue will be random
            var mediums = //base contrast , for the moment it's high contrast.
 
            var sourcexml :  String = "C:/Users/WorkStation/Documents/audiow/Assets/codes/Black board.xml";
            var savetopath : String = "C:/Users/WorkStation/Documents/audiow/Assets/codes/" ;   //these are both paths
 
            function Start(){
 
            for (var i = 0; i < 1000 ; ++i) //Make 1000 themes in 2 seconds, now we're rolling:)
            lineChanger();
 
 
            }
 
                function lineChanger()
                    {
                        var gobalDarkColor = RGBToHex(HSVtoRGB( Vector3( Random.value , sat , darks ) ) ) ;          
                        var globalCommentColor = RGBToHex(HSVtoRGB( Vector3( Random.value , sat , brights*.75 )  ) ); // make comments a bit less bright with a multiplier on the value
                        var arrLine : String[] = File.ReadAllLines(sourcexml);
 
                        for(s in arrLine ){ // Study a theme XML to see how to group color changes by keyword, wordstyle, commment, widgetstyle, global, are the 4 different styles i was going to use
         
                            if ( s.Contains("WordsStyle") && !s.Contains("COMMENT")){// general random colors and a background color
             
                                var randomColor = RGBToHex(HSVtoRGB( Vector3( Random.value , sat , brights )  ) );
                                var pos = s.IndexOf( "bgColor=" );//change background color hex code
                                s= s.Remove(pos+9, 6).Insert(pos+9, gobalDarkColor);
                                pos = s.IndexOf( "fgColor=" );//change foreground color hex code
                 
                                s= s.Remove(pos+9, 6).Insert(pos+9, randomColor);
                 
                 
                            }
             
                            if ( s.Contains("WordsStyle") && s.Contains("COMMENT")){
 
                     // general random all same comment colors. can be less bright
         
         
         
                            }
                            if ( s.Contains("WidgetStyle") && s.Contains("Global")){// has to be same background as uniform background from wordstyles
                //global color should be light or dark and it's the background of page outside of lines and spaces
                            }
             
                            if ( s.Contains("WidgetStyle") && !s.Contains("Global")){// general random all same comment colors can be les bright
         
                                       //this is for tabs and selected lines, marked lines, and so forth in notepad, will perhaps finish this afterwards. Haven't figured out a presets for changing the colors of selected text, matching text markers and so on, however the current above code works a treat to make 1000ds of presets with different colors for the main text, and then just flip through 1000 presets to find one that matches mood, very nice indeed it's quite helpful for concentration, to have psychochromatic balanced colors on the text coding, it's like weaving friendship bracelets, in a programmatic way. :)
                 
         
                            }
 
                        }
                        File.WriteAllLines(savetopath+"ThemeGenV1_"+ Random.Range(0,60000).ToString() +".xml", arrLine);
         
 
                }
 
 
            function Hue( H: float ): Vector3
            {
                var R : float= Mathf.Abs(H * 6 - 3) - 1;
                var G : float= 2 - Mathf.Abs(H * 6 - 2);
                var B : float= 2 - Mathf.Abs(H * 6 - 4);
                return Vector3( Mathf.Clamp01(R),Mathf.Clamp01(G),Mathf.Clamp01(B) );
            }
 
            function HSVtoRGB( HSV: Vector3): Vector4
            {
                //return Vector4(((Hue(HSV.x) - 1) * HSV.y + 1) * HSV.z,1);
                var H = Hue(HSV.x) ;
                H= Vector3 (H.x-1, H.y-1, H.z-1)* HSV.y ;
                H= Vector3 (H.x + 1, H.y + 1, H.z + 1)* HSV.z;
                return Vector4(H.x, H.y, H.z,1);
                    // return Vector4(Mathf.Floor(H.x*255), Mathf.Floor(H.y*255), Mathf.Floor(H.z*255),1);
            }
 
            function rgb2hex(C:Vector4):String{
 
                var rByte  = System.BitConverter.GetBytes(C.x * 256);
                var gByte = System.BitConverter.GetBytes(C.y * 256);
                var bByte = System.BitConverter.GetBytes(C.z * 256);
 
                var rgb :String = rByte.ToString() + gByte.ToString() + bByte.ToString();
            }
 
 
            function GetHex (decimal : int) {
                alpha = "0123456789ABCDEF8";
                    //print("val " + decimal);
                out = "" + alpha[decimal];
                return out;
            };
 
            function HexToInt (hexChar : char) {
                var hex : String = "" + hexChar;
                switch (hex) {
                    case "0": return 0;
                    case "1": return 1;
                    case "2": return 2;
                    case "3": return 3;
                    case "4": return 4;
                    case "5": return 5;
                    case "6": return 6;
                    case "7": return 7;
                    case "8": return 8;
                    case "9": return 9;
                    case "A": return 10;
                    case "B": return 11;
                    case "C": return 12;
                    case "D": return 13;
                    case "E": return 14;
                    case "F": return 15;
                }
            };
 
            function RGBToHex (color : Color):String {
              red = color.r * 255;
              green = color.g * 255;
              blue = color.b * 255;
 
              a = GetHex(Mathf.Floor(red / 16));
              b = GetHex(Mathf.Round(red % 16));
              c = GetHex(Mathf.Floor(green / 16));
              d = GetHex(Mathf.Round(green % 16));
              e = GetHex(Mathf.Floor(blue / 16));
              f = GetHex(Mathf.Round(blue % 16));
 
              z = a + b + c + d + e + f;
 
              return z;
            };
