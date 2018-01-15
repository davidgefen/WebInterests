
function submitSite(url){
    $("#loading").removeClass("hidden");
    $("#sites_screen").addClass("hidden");
    $.get("./safe/addWebPage?userId=" + userID + "&webPage=" + url, function(data){
        console.log("get new recomendations");
    }).done(
        function() {
            $("#loading").addClass("hidden");
            $("#sites_screen").removeClass("hidden");
            location.reload();
        }
    );
}

/**
 * gets monitoring and environment data from server
 * @returns {*[]}
 */
function getData($scope, $http) {
    $scope.webSites = [];
    $scope.recomendations = [];
    $scope.userID = "";
    $scope.userName = "";
    $scope.userPassword = "";
    $scope.init = function() {
        $http({//get environments
            method: 'GET',
            url: './safe/getUserData?username=' + getCookie("userN"),
            data: mockDataForThisTest

        }).success(function(data, status) {
            console.log("Getting webSites from server status: " + status);
            $scope.webSites = data[0].webPages;
            webSites = $scope.webSites;
            $scope.recomendations = data[0].recommendations;
            recomendations = $scope.recomendations;
            $scope.userID = data[0]._id;
            userID = $scope.userID;
            $scope.userName = data[0].userName;
            userName = $scope.userName;
            $scope.userPassword = data[0].password;
            userPassword = $scope.userPassword;
            $scope.submitSite = submitSite;
            // fixTable();
        });
    };
}
//setup angular for monitors display, register controller
getData.$inject = ['$scope', '$http'];
//set rendering parameters in angular
var app = angular.module('myApp', []).controller('getData', getData);


/**
 * returns cookie with name cname
 * @param cname name of cookie to return
 * @returns {*}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * when page has loaded
 */
$(document).ready(function () {
    //initiate bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();
});



function logout(url){
    var str = url.replace("http://", "http://" + new Date().getTime() + "@");
    var xmlhttp;
    if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
    else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4) location.reload();
    }
    xmlhttp.open("GET",str,true);
    xmlhttp.setRequestHeader("Authorization","Basic YXNkc2E6")
    xmlhttp.send();
    return false;
}