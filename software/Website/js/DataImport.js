function getCurrentData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (isEmpty(obj)) {
                console.error("no data being received")
            }
            document.getElementById("Time").innerHTML = obj.AWS_data.dateTime;
            document.getElementById("Speed").innerHTML = obj.AWS_data.windSpeed + "m/s";
            document.getElementById("Dir").innerHTML = "<p>" + compass(obj.AWS_data.windDirection) + " - " + obj.AWS_data.windDirection + " degrees" + "</p>";
            document.getElementById("Solar").innerHTML = obj.AWS_data.solarRadiation + "%";
            document.getElementById("Temp").innerHTML = obj.AWS_data.temperature + "°C";
            document.getElementById("Hum").innerHTML = obj.AWS_data.humidity + "%";
            document.getElementById("Rai").innerHTML = obj.AWS_data.rainLevel + "mm";
            document.getElementById("Air").innerHTML = obj.AWS_data.airPressure + "hPa";
            document.getElementById("Boot").innerHTML = obj.AWS_data.bootCount;

            document.getElementById("APItime").innerHTML = obj.Ext_API_data.dateTime;
            document.getElementById("APIspeed").innerHTML = obj.Ext_API_data.windSpeed + "m/s";
            document.getElementById("APIdir").innerHTML = "<p>" + compass(obj.Ext_API_data.windDirection) + " - " + obj.Ext_API_data.windDirection + " degrees" + "</p>";
            document.getElementById("APIsolar").innerHTML = obj.Ext_API_data.solarRadiation + "%";
            document.getElementById("APItemp").innerHTML = obj.Ext_API_data.temperature + "°C";
            document.getElementById("APIhum").innerHTML = obj.Ext_API_data.humidity + "%";
            document.getElementById("APIrai").innerHTML = obj.Ext_API_data.rainLevel + "mm";
            document.getElementById("APIair").innerHTML = obj.Ext_API_data.airPressure + "hPa";

            document.getElementById("Time1").innerHTML = "<strong>" + obj.AWS_data.dateTime + "</strong>";


            var currentTime = new Date();

            var dataTime = Date.parse(obj.dateTime) + 900000; //Time of last data entry + 15 minutes (ms precision in unix time, 900000 = 15mins)

            //If data was recieved within the last 15 mins
            if (dataTime > Date.parse(currentTime)){
                //Display online
                document.getElementById("Status").innerHTML = "Online";
                document.getElementById("StatusImg").src = "./Images/online.png";
            } else {
                document.getElementById("Status").innerHTML = "Offline";
                document.getElementById("StatusImg").src = "./Images/offline.png";           
            }

            drawPressure(obj.AWS_data.airPressure);
            drawTemperature(obj.AWS_data.temperature);
            drawRain(obj.AWS_data.rainLevel);
            drawHumidity(obj.AWS_data.humidity);
            drawWind(obj.AWS_data.windDirection, obj.AWS_data.windSpeed);
            //drawSolar(obj.solarRadiation);
        }

        if (this.readyState == 4 && this.status == 403) {
            console.log("No data");
        }
        if (this.readyState == 4 && this.status == 404) {
            console.log("Not found");
        }
    };
    xmlhttp.open("GET", "./php/Get_Current_Weather.php", true);
    xmlhttp.send();
}

function isEmpty(Obj) {
    for (var key in Obj) {
        if (Obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function tempCheck(tem) {
    if (tem > 50) {
        console.log("Error Temp High");
        return 0;
    }
    if (tem < -50) {
        console.log("Error Temp Low");
        return 0;
    } else {
        return tem;
    }
}

function compass(dir) {
    if (dir <= 11.25) {
        return "N";
    }
    if (dir > 11.25 && dir <= 33.75) {
        return "NNE";
    }
    if (dir > 33.75 && dir <= 56.25) {
        return "NE";
    }
    if (dir > 56.25 && dir <= 78.75) {
        return "ENE";
    }
    if (dir > 78.75 && dir <= 101.25) {
        return "E";
    }
    if (dir > 101.25 && dir <= 123.75) {
        return "ESE";
    }
    if (dir > 123.75 && dir <= 146.25) {
        return "SE";
    }
    if (dir > 146.25 && dir <= 168.75) {
        return "SSE";
    }
    if (dir > 168.75 && dir <= 191.25) {
        return "S";
    }
    if (dir > 191.25 && dir <= 213.75) {
        return "SSW";
    }
    if (dir > 213.75 && dir <= 236.25) {
        return "SW";
    }
    if (dir > 236.25 && dir <= 258.75) {
        return "WSW";
    }
    if (dir > 258.75 && dir <= 281.25) {
        return "W";
    }
    if (dir > 281.25 && dir <= 303.75) {
        return "WNW";
    }
    if (dir > 303.75 && dir <= 326.25) {
        return "NW";
    }
    if (dir > 326.25 && dir <= 348.75) {
        return "NNW";
    }
    if (dir > 348.75) {
        return "N";
    }
}