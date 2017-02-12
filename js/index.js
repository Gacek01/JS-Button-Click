'use strict';

function ajax(ajaxOptions) {
	options = {
		type: ajaxOptions.type || "POST"
		, url: ajaxOptions.url || ""
		, onComplete: ajaxOptions.onComplete || function () {}
		, onError: ajaxOptions.onError || function () {}
		, onSuccess: ajaxOptions.onSuccess || function () {}
		, dataType: ajaxOptions.dataType || "text"
	}
};

function pobierzDane() {};
var httpReq = new XMLHttpRequest();
httpReq.open(options.type, options.url, true);