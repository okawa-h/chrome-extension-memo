// Generated by Haxe 3.4.0
(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.has = function(it,elt) {
	var x = $iterator(it)();
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
var Main = function() { };
Main.main = function() {
	$("document").ready(Manager.init);
};
var Manager = function() { };
Manager.init = function(event) {
	utils_Storage.init();
	utils_Message.init();
	utils_EventManager.init();
	view_PageManager.init();
	Manager.setCloseButton();
	Manager.onInit();
};
Manager.onInit = function() {
	utils_Storage.get(function(data) {
		view_PageManager.set(data);
		utils_Message.send("on loaded","nice");
	});
};
Manager.setCloseButton = function() {
	$("#button-close").on("click",null,function() {
		view_PopupWindow.close();
	});
};
var Reflect = function() { };
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var haxe_IMap = function() { };
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) {
				return false;
			}
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) {
				return false;
			}
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		return HxOverrides.iter(this.arrayKeys());
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
};
var utils_ContactTab = function() { };
utils_ContactTab.get = function(status,callback) {
	chrome.tabs.query({ active : true},function(tab) {
		chrome.tabs.sendMessage(tab[0].id,{ status : status},function(response) {
			callback(response);
		});
	});
};
var utils_EventManager = function() { };
utils_EventManager.init = function() {
	utils_EventManager._keys = [];
	view_PopupWindow.get().on({ keydown : utils_EventManager.onKeydown, keyup : utils_EventManager.onKeyup});
};
utils_EventManager.onKeydown = function(event) {
	var key = event.keyCode;
	utils_EventManager._keys.push(key);
	if(Lambda.has(utils_EventManager._keys,91) && key == 13) {
		view_PageManager.onShortcutSave();
	}
	if(Lambda.has(utils_EventManager._keys,91) && key == 67) {
		view_PopupWindow.close();
	}
};
utils_EventManager.onKeyup = function(event) {
	utils_EventManager._keys = [];
	var _g = event.keyCode;
	if(_g == 13) {
		view_PageManager.onEnterKey();
	}
	view_PageManager.onKeyup();
};
var utils_Handy = function() { };
utils_Handy.getUniqueID = function(original) {
	var strong = 1000;
	if(original != null) {
		strong = original;
	}
	var id = "";
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var time = "" + year + month + day + hour + minute;
	id = time + Math.floor(strong * Math.random());
	return id;
};
var utils_Message = function() { };
utils_Message.init = function() {
	utils_Message._jParent = $("#message");
};
utils_Message.send = function(message,status) {
	var jText = utils_Message._jParent.empty().append("<p class=\"" + status + "\">" + message + "</p>").find("p");
	jText.css({ top : 5, opacity : 0}).animate({ top : 0, opacity : 1},100,"easeInOutSine",function() {
		jText.delay(1500).animate({ opacity : 0},200,null,function() {
			jText.remove();
		});
	});
};
var utils_Storage = function() { };
utils_Storage.init = function() {
	utils_Storage._storage = chrome.storage.local;
};
utils_Storage.get = function(callback) {
	utils_Storage._storage.get("memomemo",function(object) {
		var tmp;
		var data;
		if(object == null) {
			data = null;
		} else {
			var data1;
			if(object.__properties__) {
				tmp = object.__properties__["get_" + "memomemo"];
				data1 = tmp;
			} else {
				data1 = false;
			}
			if(data1) {
				data = object[tmp]();
			} else {
				data = object["memomemo"];
			}
		}
		var data2 = data;
		callback(data2);
	});
};
utils_Storage.save = function(key,value) {
	utils_Storage.get(function(data) {
		if(data == null) {
			data = { };
		}
		var tmp;
		var tmp1;
		if(data.__properties__) {
			tmp = data.__properties__["set_" + key];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			data[tmp](value);
		} else {
			var tmp2 = value;
			data[key] = tmp2;
		}
		var object = { };
		var tmp3;
		var tmp4;
		if(object.__properties__) {
			tmp3 = object.__properties__["set_" + "memomemo"];
			tmp4 = tmp3;
		} else {
			tmp4 = false;
		}
		if(tmp4) {
			object[tmp3](data);
		} else {
			object["memomemo"] = data;
		}
		utils_Storage._storage.set(object,function() {
			utils_Message.send("Successfully saved \"" + key + "\"","success");
		});
	});
};
var view_Page = function(pagename) {
	this._pagename = pagename;
	this.setHTML();
	this._jParent = $("[data-content=\"" + this._pagename + "\"]");
	this._jParent.find(".button-save").on({ "click" : $bind(this,this.save)});
};
view_Page.prototype = {
	setHTML: function() {
	}
	,save: function() {
	}
	,set: function(data) {
	}
	,show: function() {
		this._jParent.show().addClass("current");
		this.focus();
	}
	,hide: function() {
		this._jParent.hide().removeClass("current");
	}
	,onKeyup: function() {
	}
	,isCurrent: function() {
		return this._jParent.hasClass("current");
	}
	,getPagename: function() {
		return this._pagename;
	}
	,getJParent: function() {
		return this._jParent;
	}
	,onEnterKey: function() {
	}
	,focus: function() {
	}
	,getData: function(data) {
		var field = this._pagename;
		var tmp;
		if(data == null) {
			return null;
		} else {
			var tmp1;
			if(data.__properties__) {
				tmp = data.__properties__["get_" + field];
				tmp1 = tmp;
			} else {
				tmp1 = false;
			}
			if(tmp1) {
				return data[tmp]();
			} else {
				return data[field];
			}
		}
	}
};
var view_PageManager = function() { };
view_PageManager.init = function() {
	view_PageManager._jParent = $("#pages");
	view_PageManager._Pages = new haxe_ds_StringMap();
	var this1 = view_PageManager._Pages;
	var v = new view_page_Memo();
	var _this = this1;
	if(__map_reserved["memo"] != null) {
		_this.setReserved("memo",v);
	} else {
		_this.h["memo"] = v;
	}
	var this2 = view_PageManager._Pages;
	var v1 = new view_page_Setting();
	var _this1 = this2;
	if(__map_reserved["setting"] != null) {
		_this1.setReserved("setting",v1);
	} else {
		_this1.h["setting"] = v1;
	}
	$("[data-jump]").on({ "click" : view_PageManager.onJumpButton});
};
view_PageManager.addHTML = function(html) {
	view_PageManager._jParent.append(html);
};
view_PageManager.set = function(data) {
	view_PageManager.counter(function(page) {
		page.set(data);
	});
	view_PageManager.hideAll();
	var _this = view_PageManager._Pages;
	(__map_reserved["memo"] != null ? _this.getReserved("memo") : _this.h["memo"]).show();
};
view_PageManager.onShortcutSave = function() {
	view_PageManager.getCurrentPage().save();
};
view_PageManager.onEnterKey = function() {
	view_PageManager.getCurrentPage().onEnterKey();
};
view_PageManager.onKeyup = function() {
	view_PageManager.getCurrentPage().onKeyup();
};
view_PageManager.hideAll = function() {
	view_PageManager.counter(function(page) {
		page.hide();
	});
};
view_PageManager.getCurrentPage = function() {
	var currentPage = null;
	view_PageManager.counter(function(page) {
		if(page.isCurrent()) {
			currentPage = page;
		}
	});
	return currentPage;
};
view_PageManager.counter = function(func) {
	var key = view_PageManager._Pages.keys();
	while(key.hasNext()) {
		var key1 = key.next();
		var _this = view_PageManager._Pages;
		func(__map_reserved[key1] != null ? _this.getReserved(key1) : _this.h[key1]);
	}
};
view_PageManager.onJumpButton = function(event) {
	view_PageManager.hideAll();
	var pagename = $(event.currentTarget).data("jump");
	var _this = view_PageManager._Pages;
	(__map_reserved[pagename] != null ? _this.getReserved(pagename) : _this.h[pagename]).show();
};
var view_PopupWindow = function() { };
view_PopupWindow.get = function() {
	return view_PopupWindow._jWindow;
};
view_PopupWindow.close = function() {
	view_PopupWindow._window.close();
};
var view_page_Memo = function() {
	var _gthis = this;
	view_Page.call(this,"memo");
	view_page_MemoManager.init(this._jParent);
	this._jParent.find("[data-add]").on("click",null,function(event) {
		view_page_MemoManager.setAddButton(event,$bind(_gthis,_gthis.save));
	});
};
view_page_Memo.__super__ = view_Page;
view_page_Memo.prototype = $extend(view_Page.prototype,{
	save: function() {
		utils_Storage.save(this._pagename,view_page_MemoManager.getData());
		this.focus();
	}
	,set: function(data) {
		var dataArray = view_Page.prototype.getData.call(this,data);
		view_page_MemoManager.set(dataArray);
	}
	,onKeyup: function() {
		if(!view_page_MemoManager.getActiveTab().isFocus()) {
			return;
		}
		this.save();
	}
	,focus: function() {
		view_page_MemoManager.focus();
	}
	,setHTML: function() {
		var html = "\n\t\t\t\t<section data-content=\"" + this._pagename + "\">\n\t\t\t\t\t<header class=\"header\">\n\t\t\t\t\t\t<nav class=\"tab-navi\"></nav>\n\t\t\t\t\t\t<div class=\"tab-controler\">\n\t\t\t\t\t\t\t<button class=\"button-switch\" data-switch=\"increment\">+</button>\n\t\t\t\t\t\t\t<button class=\"button-switch\" data-switch=\"decrement\">-</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</header>\n\t\t\t\t\t<div class=\"content\"></div>\n\t\t\t\t\t<button class=\"button-utils\" data-add=\"url\"><span>URL</span></button>\n\t\t\t\t\t<button class=\"button-utils\" data-add=\"time\"><span>TIME</span></button>\n\t\t\t\t\t<button class=\"button-jump\" data-jump=\"setting\">&nbsp;</button>\n\t\t\t\t</section>";
		view_PageManager.addHTML(html);
	}
});
var view_page_MemoManager = function() { };
view_page_MemoManager.init = function(jParent) {
	view_page_MemoManager._jParent = jParent;
	view_page_MemoManager._jNavi = view_page_MemoManager._jParent.find(".tab-navi");
	view_page_MemoManager._jContent = view_page_MemoManager._jParent.find(".content");
	view_page_MemoManager._Tabs = new haxe_ds_StringMap();
	view_page_TabControler.init(view_page_MemoManager._jParent);
};
view_page_MemoManager.set = function(data) {
	var _g1 = 0;
	var _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tab = new view_page_Tab(data[i]);
		var this1 = view_page_MemoManager._Tabs;
		var k = tab.getID();
		var _this = this1;
		if(__map_reserved[k] != null) {
			_this.setReserved(k,tab);
		} else {
			_this.h[k] = tab;
		}
	}
	view_page_MemoManager.setTabButton();
	view_page_MemoManager.activeFirstTab();
};
view_page_MemoManager.focus = function() {
	view_page_MemoManager.getActiveTab().focus();
};
view_page_MemoManager.setTabButton = function() {
	view_page_MemoManager._jNavi.find(".page-tab").off().on("click",null,function(event) {
		var jTarget = $(event.currentTarget);
		if(jTarget.hasClass("edit")) {
			return;
		}
		if(jTarget.hasClass("active")) {
			var jInput = jTarget.addClass("edit").html("<input class=\"edit-name\" type=\"text\">").find(".edit-name");
			jInput.focus();
			jInput.on({ "blur" : function() {
				var value = jInput.val();
				if(value == "") {
					jInput.focus();
					return;
				}
				jInput.remove();
				jTarget.text(value);
			}});
			return;
		}
		view_page_MemoManager.hideAll();
		var id = jTarget.addClass("active").data("area_tab");
		var _this = view_page_MemoManager._Tabs;
		(__map_reserved[id] != null ? _this.getReserved(id) : _this.h[id]).show();
		view_page_MemoManager.focus();
	});
};
view_page_MemoManager.setAddButton = function(event,callback) {
	var key = $(event.currentTarget).data("add");
	switch(key) {
	case "time":
		view_page_MemoManager.addTime(callback);
		break;
	case "url":
		view_page_MemoManager.addUrl(callback);
		break;
	}
};
view_page_MemoManager.getData = function() {
	var data = [];
	view_page_MemoManager.counter(function(tab) {
		var tmp = tab.getID();
		var tmp1 = tab.getName();
		var tmp2 = tab.getValue();
		data.push({ id : tmp, name : tmp1, value : tmp2});
	});
	return data;
};
view_page_MemoManager.getActiveTab = function() {
	var id = view_page_MemoManager._jNavi.find(".active").data("area_tab");
	var _this = view_page_MemoManager._Tabs;
	if(__map_reserved[id] != null) {
		return _this.getReserved(id);
	} else {
		return _this.h[id];
	}
};
view_page_MemoManager.addNaviHTML = function(html) {
	view_page_MemoManager._jNavi.append(html);
};
view_page_MemoManager.getNavi = function() {
	return view_page_MemoManager._jNavi;
};
view_page_MemoManager.addContentHTML = function(html) {
	view_page_MemoManager._jContent.append(html);
};
view_page_MemoManager.getContent = function() {
	return view_page_MemoManager._jContent;
};
view_page_MemoManager.addTab = function(data) {
	var tab = new view_page_Tab(data);
	var this1 = view_page_MemoManager._Tabs;
	var k = tab.getID();
	var _this = this1;
	if(__map_reserved[k] != null) {
		_this.setReserved(k,tab);
	} else {
		_this.h[k] = tab;
	}
	view_page_MemoManager.setTabButton();
};
view_page_MemoManager.removeTab = function() {
	var id = view_page_MemoManager.getActiveTab().getID();
	var _this = view_page_MemoManager._Tabs;
	(__map_reserved[id] != null ? _this.getReserved(id) : _this.h[id]).remove();
	view_page_MemoManager._Tabs.remove(id);
	view_page_MemoManager.activeFirstTab();
};
view_page_MemoManager.activeFirstTab = function() {
	view_page_MemoManager._jNavi.find(".page-tab").first().click();
};
view_page_MemoManager.hideAll = function() {
	view_page_MemoManager.counter(function(tab) {
		tab.hide();
	});
};
view_page_MemoManager.addUrl = function(callback) {
	utils_ContactTab.get("url",function(response) {
		var text = "";
		var tmp;
		var title;
		if(response == null) {
			title = null;
		} else {
			var title1;
			if(response.__properties__) {
				tmp = response.__properties__["get_" + "title"];
				title1 = tmp;
			} else {
				title1 = false;
			}
			if(title1) {
				title = response[tmp]();
			} else {
				title = response["title"];
			}
		}
		var title2 = title;
		var tmp1;
		var location;
		if(response == null) {
			location = null;
		} else {
			var location1;
			if(response.__properties__) {
				tmp1 = response.__properties__["get_" + "location"];
				location1 = tmp1;
			} else {
				location1 = false;
			}
			if(location1) {
				location = response[tmp1]();
			} else {
				location = response["location"];
			}
		}
		var location2 = location;
		if(title2 == null && location2 == null) {
			utils_Message.send("Failed to get \"title,location\"","error");
			return;
		}
		if(title2 == null) {
			utils_Message.send("Failed to get \"title\"","error");
		} else {
			text += title2 + "\n";
		}
		if(location2 == null) {
			utils_Message.send("Failed to get \"location\"","error");
		} else {
			text += location2;
		}
		view_page_MemoManager.getActiveTab().addText(text);
		callback();
	});
};
view_page_MemoManager.addTime = function(callback) {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	view_page_MemoManager.getActiveTab().addText("【" + year + "/" + month + "/" + day + "/" + hour + ":" + minute + "】");
	callback();
};
view_page_MemoManager.counter = function(func) {
	var key = view_page_MemoManager._Tabs.keys();
	while(key.hasNext()) {
		var key1 = key.next();
		var _this = view_page_MemoManager._Tabs;
		func(__map_reserved[key1] != null ? _this.getReserved(key1) : _this.h[key1]);
	}
};
var view_page_Setting = function() {
	view_Page.call(this,"setting");
	view_page_Setting._jSettingList = this._jParent.find(".setting-list").find("input[type=\"text\"]");
};
view_page_Setting.__super__ = view_Page;
view_page_Setting.prototype = $extend(view_Page.prototype,{
	save: function() {
		var data = this.getListData();
		if(!this.validate(data)) {
			utils_Message.send("Input error","error");
			return;
		}
		this.setStyles(data);
		utils_Storage.save(this._pagename,data);
	}
	,set: function(data) {
		var value = view_Page.prototype.getData.call(this,data);
		this.setStyles(value,function(key,value1) {
			view_page_Setting._jSettingList.filter("[name=\"" + key + "\"]").val(value1);
		});
	}
	,focus: function() {
		this._jParent.find("input:visible").eq(0).focus();
	}
	,onEnterKey: function() {
		var jCur = this._jParent.find(":focus");
		var index = view_page_Setting._jSettingList.index(jCur);
		if(view_page_Setting._jSettingList.length - 1 == index) {
			this._jParent.find(".button-save").focus();
		} else {
			view_page_Setting._jSettingList.eq(index + 1).focus();
		}
	}
	,setHTML: function() {
		var html = "\n\t\t\t\t<section data-content=\"" + this._pagename + "\">\n\t\t\t\t\t<header class=\"header\">\n\t\t\t\t\t\t<h2 class=\"page-title\">Setting</h2>\n\t\t\t\t\t</header>\n\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t<ul class=\"setting-list\">\n\t\t\t\t\t\t\t<li><label><p>height</p><input type=\"text\" name=\"height\">px</label></li>\n\t\t\t\t\t\t\t<li><label><p>font-size</p><input type=\"text\" name=\"fontSize\">px</label></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class=\"button-save\"><span>SAVE</span></button>\n\t\t\t\t\t<button class=\"button-jump\" data-jump=\"memo\">&nbsp;</button>\n\t\t\t\t</section>";
		view_PageManager.addHTML(html);
	}
	,getListData: function() {
		var data = { };
		var length = view_page_Setting._jSettingList.length;
		var _g1 = 0;
		var _g = length;
		while(_g1 < _g) {
			var i = _g1++;
			var jTarget = view_page_Setting._jSettingList.eq(i);
			var key = jTarget.prop("name");
			var value = jTarget.val();
			data[key] = value;
		}
		return data;
	}
	,setStyles: function(data,insertFunc) {
		var fields = Reflect.fields(data);
		var _g1 = 0;
		var _g = fields.length;
		while(_g1 < _g) {
			var i = _g1++;
			var key = fields[i];
			var tmp;
			var value;
			if(data == null) {
				value = null;
			} else {
				var value1;
				if(data.__properties__) {
					tmp = data.__properties__["get_" + key];
					value1 = tmp;
				} else {
					value1 = false;
				}
				if(value1) {
					value = data[tmp]();
				} else {
					value = data[key];
				}
			}
			var value2 = value;
			this.setStyle(key,value2);
			if(insertFunc != null) {
				insertFunc(key,value2);
			}
		}
	}
	,setStyle: function(key,value) {
		if(value == "") {
			return;
		}
		switch(key) {
		case "fontSize":
			$("html").css({ fontSize : value + "px"});
			break;
		case "height":
			$(".content-area").css({ height : value});
			break;
		case "width":
			$("#all").css({ width : value});
			break;
		}
	}
	,validate: function(data) {
		var result = true;
		return result;
	}
});
var view_page_Tab = function(data) {
	this._id = data.id;
	this._name = data.name;
	var html = this.getHTML(data);
	view_page_MemoManager.addNaviHTML(__map_reserved["tab"] != null ? html.getReserved("tab") : html.h["tab"]);
	view_page_MemoManager.addContentHTML(__map_reserved["area"] != null ? html.getReserved("area") : html.h["area"]);
	this._jTab = view_page_MemoManager.getNavi().find("[data-area_tab=\"" + this._id + "\"]");
	this._jTextarea = view_page_MemoManager.getContent().find("[data-area_id=\"" + this._id + "\"]").find(".textarea");
	this._jTextarea.val(data.value);
};
view_page_Tab.prototype = {
	getID: function() {
		return this._id;
	}
	,getName: function() {
		return this._name;
	}
	,setValue: function(text) {
		this._jTextarea.val(text);
	}
	,getValue: function() {
		return this._jTextarea.val();
	}
	,getCursorPosition: function() {
		return this._jTextarea.get(0).selectionStart;
	}
	,isFocus: function() {
		return this._jTextarea["is"](":focus");
	}
	,focus: function() {
		this._jTextarea.focus();
	}
	,show: function() {
		this._jTab.add(this._jTextarea.parent()).addClass("active");
	}
	,hide: function() {
		this._jTab.add(this._jTextarea.parent()).removeClass("active");
	}
	,remove: function() {
		this._jTab.add(this._jTextarea.parent()).remove();
	}
	,rename: function(name) {
		this._name = name;
	}
	,addText: function(text) {
		var value = this.getValue();
		var position = this.getCursorPosition();
		var before = HxOverrides.substr(value,0,position);
		var after = HxOverrides.substr(value,position,value.length);
		if(HxOverrides.substr(value,position - 1,position) != "\n") {
			before += "\n";
		}
		if(HxOverrides.substr(value,position,position + 1) != "\n") {
			after = "\n" + after;
		}
		this.setValue(before + text + after);
	}
	,getHTML: function(data) {
		var map = new haxe_ds_StringMap();
		var v = "<button class=\"page-tab\" data-area_tab=\"" + this._id + "\">" + this._name + "</button>";
		if(__map_reserved["tab"] != null) {
			map.setReserved("tab",v);
		} else {
			map.h["tab"] = v;
		}
		var v1 = "<div class=\"content-area\" data-area_id=\"" + this._id + "\">\n\t\t\t\t\t<textarea class=\"textarea\"></textarea>\n\t\t\t\t</div>";
		if(__map_reserved["area"] != null) {
			map.setReserved("area",v1);
		} else {
			map.h["area"] = v1;
		}
		return map;
	}
};
var view_page_TabControler = function() { };
view_page_TabControler.init = function(jParent) {
	view_page_TabControler._jParent = jParent.find(".tab-controler");
	$("[data-switch]").on({ "click" : view_page_TabControler.onClick});
};
view_page_TabControler.onClick = function(event) {
	var action = $(event.currentTarget).data("switch");
	switch(action) {
	case "decrement":
		view_page_TabControler.decrement();
		break;
	case "increment":
		view_page_TabControler.increment();
		break;
	}
};
view_page_TabControler.increment = function() {
	view_page_MemoManager.addTab({ id : utils_Handy.getUniqueID(), name : "test", value : ""});
	utils_Message.send("add tab","success");
};
view_page_TabControler.decrement = function() {
	view_page_MemoManager.removeTab();
	utils_Message.send("remove tab","success");
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
var __map_reserved = {}
Manager.APP_NAME = "memomemo";
view_PopupWindow._window = window;
view_PopupWindow._jWindow = $(window);
Main.main();
})();
