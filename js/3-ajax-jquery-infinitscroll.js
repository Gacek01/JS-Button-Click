'use strict';
$(document).ready(function () {
	$(window).scroll(function () {
		if ($(window).scrollTop() + window.innerHeight == $(document).height()) {
			//console.log("bottom!");
			$.getJSON("https://jsonplaceholder.typicode.com/users", function (data) {
				//console.log(data);
				var pBeginMark = document.createElement('p');
				pBeginMark.innerHTML = "<br><br>--------BEGIN OF DATA--------<br><br>";
				document.body.appendChild(pBeginMark);
				for (var i = 0; i < data.length; i++) {
					var pUserId = document.createElement('p');
					var pUserName = document.createElement('p');
					var pUserURL = document.createElement('p');
					pUserId.innerHTML = "User ID: " + data[i].id;
					pUserName.innerHTML = "User Name: " + data[i].name;
					pUserURL.innerHTML = "User URL: http://" + data[i].website + "<br>--------";
					document.body.appendChild(pUserId);
					document.body.appendChild(pUserName);
					document.body.appendChild(pUserURL);
				}
				var pEndMark = document.createElement('p');
				pEndMark.innerHTML = "<br><br>--------END OF DATA--------<br><br>";
				document.body.appendChild(pEndMark);
			});
		}
	});
});