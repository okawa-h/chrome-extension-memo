package view.page;

import js.jquery.JQuery;
import js.jquery.Event;
import view.*;
import view.page.*;
import utils.*;

class MemoManager {

	private static var _pagename: String;
	private static var _jParent : JQuery;
	private static var _jNavi   : JQuery;
	private static var _jContent: JQuery;
	private static var _Tabs    : Map<String,Tab>;

	/* =======================================================================
		Init
	========================================================================== */
	public static function init(jParent:JQuery,pagename:String):Void {

		_pagename = pagename;
		_jParent  = jParent;
		_jNavi    = _jParent.find('.tab-navi');
		_jContent = _jParent.find('.content');
		_Tabs     = new Map();

		_jParent.find('[data-add]').on('click',function(event) {
			setAddButton(event);
		});
		TabControler.init(_jParent);

	}

	/* =======================================================================
		Save
	========================================================================== */
	public static function save():Void {

		Storage.save(_pagename,getData());
		focus();

	}

	/* =======================================================================
		Set
	========================================================================== */
	public static function set(data:Array<Dynamic>):Void {

		for (i in 0 ... data.length) {

			var tab : Tab = new Tab(data[i]);
			_Tabs[tab.getID()] = tab;
			
		}

		setTabButton();
		activeFirstTab();

	}

	/* =======================================================================
		Focus
	========================================================================== */
	public static function focus():Void {

		getActiveTab().focus();

	}

		/* =======================================================================
			Set Tab Button
		========================================================================== */
		private static function setTabButton():Void {

			_jNavi.find('.page-tab').off().on('click',function(event:Event) {

				var jTarget : JQuery = new JQuery(event.currentTarget);
				var id      : String = jTarget.data('area_tab');
				var tab     : Tab    = _Tabs[id];

				if (tab.isEdit()) return;

				if (tab.isActive()) {

					tab.editName();
					return;
				}

				hideAll();
				tab.show();
				focus();

			});

		}

	/* =======================================================================
		Set Add Button
	========================================================================== */
	public static function setAddButton(event:Event):Void {

		var key : String = new JQuery(event.currentTarget).data('add');
		switch (key) {
			case 'url':
				addUrl();
			case 'time':
				addTime();
		}

	}

	/* =======================================================================
		Get Data
	========================================================================== */
	public static function getData():Array<Dynamic> {

		var data : Array<Dynamic> = [];
		counter(function(tab:Tab) {

			data.push({
				id    : tab.getID(),
				name  : tab.getName(),
				value : tab.getValue()
			});

		});

		return data;

	}

	/* =======================================================================
		Get Active Tab
	========================================================================== */
	public static function getActiveTab():Tab {

		var id : String = _jNavi.find('.active').data('area_tab');
		return _Tabs[id];

	}

	/* =======================================================================
		Add Navi HTML
	========================================================================== */
	public static function addNaviHTML(html:String):Void {

		_jNavi.append(html);

	}

	/* =======================================================================
		Get Navi
	========================================================================== */
	public static function getNavi():JQuery {

		return _jNavi;

	}

	/* =======================================================================
		Add Content HTML
	========================================================================== */
	public static function addContentHTML(html:String):Void {

		_jContent.append(html);

	}

	/* =======================================================================
		Get Content
	========================================================================== */
	public static function getContent():JQuery {

		return _jContent;

	}

	/* =======================================================================
		Add Tab
	========================================================================== */
	public static function addTab(data:Dynamic):Void {

		var tab : Tab = new Tab(data);
		_Tabs[tab.getID()] = tab;
		setTabButton();

	}

	/* =======================================================================
		Remove Tab
	========================================================================== */
	public static function removeTab():Void {

		var id :String = getActiveTab().getID();
		_Tabs[id].remove();
		_Tabs.remove(id);
		activeFirstTab();

	}

		/* =======================================================================
			Active First Tab
		========================================================================== */
		private static function activeFirstTab():Void {

			_jNavi.find('.page-tab').first().click();

		}

		/* =======================================================================
			Hide All
		========================================================================== */
		private static function hideAll():Void {

			counter(function(tab:Tab) {

				tab.hide();

			});

		}

		/* =======================================================================
			Add Url
		========================================================================== */
		private static function addUrl():Void {

			ContactTab.get('url',function(response:Dynamic) {

				var text    : String = '';
				var title   : String = Reflect.getProperty(response,'title');
				var location: String = Reflect.getProperty(response,'location');

				if (title == null && location == null) {
					Message.send('Failed to get "title,location"','error');
					return;
				}

				if (title == null) {
					Message.send('Failed to get "title"','error');
				} else {
					text += title + '\n';
				}

				if (location == null) {
					Message.send('Failed to get "location"','error');
				} else {
					text += location;
				}

				getActiveTab().addText(text);
				save();

			});

		}

		/* =======================================================================
			Add Time
		========================================================================== */
		private static function addTime():Void {

			var date  : Date = Date.now();
			var year  : Int = date.getFullYear();
			var month : Int = date.getMonth() + 1;
			var day   : Int = date.getDate();
			var hour  : Int = date.getHours();
			var minute: Int = date.getMinutes();

			getActiveTab().addText('【${year}/${month}/${day}/${hour}:${minute}】');
			save();

		}

		/* =======================================================================
			Counter
		========================================================================== */
		private static function counter(func:Tab->Void):Void {

			for (key in _Tabs.keys()) {

				func(_Tabs[key]);

			}

		}

}
