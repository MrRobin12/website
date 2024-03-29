var object_length;

window.addEventListener("contextmenu", 
  function(e){
     e.stopPropagation()
}, true);

var url = "https://www.dropbox.com/s/ht9gi89mibodezb/song_api.json?dl=0";
jQuery.get('https://cors-anywhere.herokuapp.com/https://dl.dropbox.com/s/ht9gi89mibodezb/song_api.json?dl=0', function(data) {
    data = jQuery.parseJSON(data)
    var myObject = data;
    var count = Object.keys(myObject).length;
    
    var i = 0;
    
    for (i = 0; i < count; i++) {        
        var song_title = "<font class='title'>" + data[i].Song_title + "</font>";
        var artist = "<font class='artist'>" + data[i].Artist + "</font>";
        
        function formatTime(seconds) {
            minutes = Math.floor(seconds / 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
            seconds = Math.floor(seconds % 60);
            seconds = (seconds >= 10) ? seconds : "0" + seconds;
            return minutes + ":" + seconds;
        }    
        
        var ms = data[i].duration_ms / 1000;
        var duration =  "<font class='duration'>" + "Duration: " + formatTime(ms) + "</font>";
        
        var explicit = "<br>";
        
        if (data[i].explicit == true) {
            explicit =  "<br><br>" + "<font class='explicit'>" + "EXPLICIT" + "</font>" + "<br>";
        }
        
        var date = "<font class='date'>" + "Created: " + data[i].album.release_date + "</font>";
        var album = "<font class='album'>" + "Album: " + data[i].album.name + " : " + data[i].album.album_type + "</font>";
        
        var audio_url = "https://cors-anywhere.herokuapp.com/https://dl.dropbox.com/s/bh06jvg1y933npv/Rihanna%20-%20We%20Found%20Love%20Bootleg%20Remix%20%28MrRobin%29.mp3";
        
        var song_url = "<div id='songURL" + i + "' src='" +  data[i].Song_url + "' oncontextmenu='return false'></div>";     
        var image_cover = data[i].album.images[2].url;
        var img = "<img class='image_cover' src='" + image_cover + "' onclick='openWin" + "(" + i + ")'>";
        var border = "<div id='border" + i + "' onclick='activate(" + i + ")' style='border: 2px solid black; padding-left: 10px; padding-right: 10px; padding-top: 10px; margin-bottom: 25px; width: 280px;'>"

        var result = song_url + border + img + artist + "<br><br>" + song_title + "<br><br>" + album + "<br>" + duration + explicit + "<br>" + date + "<br><br>" + "</div>";     
        
        document.getElementById("song_api").innerHTML += result;
    }
    
    localStorage.setItem("object_length", i);
    document.getElementById("border1").style.borderColor = "rgb(154, 4, 219)"; 
});

object_length = localStorage.getItem("object_length");
  
var audio = document.getElementById("demo");

var array_of_functions = [
    function (num) {
        
jQuery.get('https://cors-anywhere.herokuapp.com/https://dl.dropbox.com/s/ht9gi89mibodezb/song_api.json?dl=0', function(data) {
    data = jQuery.parseJSON(data)
    var myObject = data;
    var count = Object.keys(myObject).length;
        
    var source = data[num].Song_url;
    var title = data[num].Song_title;
    var artist = data[num].Artist;
        
    audio.pause();
    audio.src = source;
    audio.title = artist + " - " + title;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    
    document.getElementById('title').innerHTML = "Playing " + audio.title + "...";
});

}]

function openWin(num) {
    jQuery.get('https://cors-anywhere.herokuapp.com/https://dl.dropbox.com/s/ht9gi89mibodezb/song_api.json?dl=0', function(data) {
        data = jQuery.parseJSON(data)
        var myObject = data;
        var count = Object.keys(myObject).length;
        var image_cover = data[num].album.images[2].url;
        window.open(image_cover);
    });
}

function activate(num) {
    for (i = 0; i < object_length; i++) {
        array_of_functions[0](num);
        
        var j = 0;
        
        for (j = 0; j < object_length; j++) {
            if (j != num) {
                document.getElementById("border" + j).style.borderColor = "black";   
            } else {
                document.getElementById("border" + j).style.borderColor = "rgb(154, 4, 219)";   
            }
        }
    }
}    