/**
 * Created by davidbra on 10/14/16.
 */

function redirect(type){
    if (type == "login"){
        window.location = "./safe";
    }
    if (type == "signup"){
        window.location = "./SignUp";
    }
}