'use strict';

function ajax(ajaxOptions) {
	var options = {
		type: ajaxOptions.type || "POST"
		, url: ajaxOptions.url || ""
		, onComplete: ajaxOptions.onComplete || function () {}
		, onError: ajaxOptions.onError || function () {}
		, onSuccess: ajaxOptions.onSuccess || function () {}
		, dataType: ajaxOptions.dataType || "text"
	};
	//funkcja zwracająca czy połaczenie sie udało
	function httpSuccess(httpRequest) {
		try {
			return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof httpRequest.status == "undefined");
		}
		catch (e) {
			return false;
		}
	}
	//utworzenie obiektu
	var httpReq = new XMLHttpRequest();
	//otwarcie polaczenia
	httpReq.open(options.type, options.url, true);
	httpReq.onreadystatechange = function () {
		//sparwdz czy dane zwrocone i gotowe
		if (httpReq.readyState == 4) {
			//sprawdz status polaczenia
			if (httpSuccess(httpReq)) {
				//jesli dane w formacie XML to zwroc obiekt returnXML, w przeciwnym wypadku responseText (JSON to tekst)
				var returnData = (options.dataType == "xml") ? httpReq.responseXML : httpReq.responseText;
				//jesli wszsytko jest ok
				options.onSuccess(returnData);
				//zeruj obiekt aby nie utzymywac juz poalacznenia z serwerem
				httpReq = null;
			}
			else {
				//w przypadku bledu
				options.onError(httpReq.statusText);
			};
		};
	};
	httpReq.send();
};

function pobierzDane() {
	//console.log("dziala");
	ajax({
		type: "GET"
		, url: "http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl"
		, onError: function (msg) {
			confirm.log(msg);
		}
		, onSuccess: function (respone) {
			//console.log("polaczenie dziala");
			var jsonObj = JSON.parse(respone);
			console.log(jsonObj);
			var pUserId = document.createElement("p");
			var pUserName = document.createElement("p");
			var pUserUrl = document.createElement("p");
			pUserId.innerHTML = "User ID " + jsonObj.userId;
			pUserName.innerHTML = "User Name " + jsonObj.userName;
			pUserUrl.innerHTML = "User URl " + jsonObj.userURL + "<br>------------"
			document.body.appendChild(pUserId);
			document.body.appendChild(pUserName);
			document.body.appendChild(pUserUrl);
		}
	});
};