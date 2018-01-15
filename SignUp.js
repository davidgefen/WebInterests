/**
 * Created by davidbra on 11/9/16.
 */

var SECURE = "./safe";

function submit(){
    $.get('./newUser?username=' + $('#username').val() + '&password=' + $('#password').val(), function(data){

    }).done(function() {
        window.confirm("User Was Created.");
        window.location.replace(SECURE);
    }).fail(function(data, textStatus, xhr) {
        if (data.status == "422"){
            //username is taken
            window.confirm("User name is taken, please try again using a different name.");
        }
        else {
            window.confirm("There was an error creating a new user, please try again at a later time.");
        }
    });
}