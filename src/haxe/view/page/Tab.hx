package view.page;

import js.jquery.JQuery;
import js.jquery.Event;
import view.*;
import view.page.MemoManager;
import utils.*;

class Tab {

	private var _id  :String;
	private var _name:String;
	private var _jTab:JQuery;
	private var _jTextarea : JQuery;

	/* =======================================================================
		Constractor
	========================================================================== */
	public function new(data:Dynamic):Void {

		_id   = data.id;
		_name = data.name;

		var html:Map<String,String> = getHTML(data);
		MemoManager.addNaviHTML(html['tab']);
		MemoManager.addContentHTML(html['area']);
		_jTab      = MemoManager.getNavi().find('[data-area_tab="${_id}"]');
		_jTextarea = MemoManager.getContent().find('[data-area_id="${_id}"]').find('.textarea');

		_jTab.find('.delete').on('click',TabControler.decrement);
		_jTextarea.val(data.value);

	}

	/* =======================================================================
		Get ID
	========================================================================== */
	public function getID():String {

		return _id;

	}

	/* =======================================================================
		Get Name
	========================================================================== */
	public function getName():String {

		return _name;

	}

	/* =======================================================================
		Set Value
	========================================================================== */
	public function setValue(text:String):Void {

		_jTextarea.val(text);

	}

	/* =======================================================================
		Get Value
	========================================================================== */
	public function getValue():String {

		return _jTextarea.val();

	}

	/* =======================================================================
		Get Cursor Position
	========================================================================== */
	public function getCursorPosition():Int {

		return untyped _jTextarea.get(0).selectionStart;

	}

	/* =======================================================================
		Is Focus
	========================================================================== */
	public function isFocus():Bool {

		return _jTextarea.is(':focus');

	}

	/* =======================================================================
		Is Active
	========================================================================== */
	public function isActive():Bool {

		return _jTab.hasClass('active');

	}

	/* =======================================================================
		Is Edit
	========================================================================== */
	public function isEdit():Bool {

		return _jTab.hasClass('edit');

	}

	/* =======================================================================
		Focus
	========================================================================== */
	public function focus():Void {

		_jTextarea.focus();

	}

	/* =======================================================================
		Show
	========================================================================== */
	public function show():Void {

		_jTab.add(_jTextarea.parent()).addClass('active');

	}

	/* =======================================================================
		Hide
	========================================================================== */
	public function hide():Void {

		_jTab.add(_jTextarea.parent()).removeClass('active');

	}

	/* =======================================================================
		Remove
	========================================================================== */
	public function remove():Void {

		_jTab.add(_jTextarea.parent()).remove();

	}

	/* =======================================================================
		Edit Name
	========================================================================== */
	public function editName():Void {

		_jTab.addClass('edit');
		var jName :JQuery = _jTab.find('.name');
		var jInput:JQuery = _jTab.find('.edit-name');
		var name  :String = jName.text();
		jName.hide();

		jInput.show().focus().val(name).off('blur')
			.on('blur',function() {

				var value:String = jInput.val();
				if (value == '') {
					jInput.focus();
					Message.say('name is empty','error');
					return;
				}

				jName.show().text(value);
				jInput.hide();
				_jTab.removeClass('edit');
				_name = value;
				MemoManager.save();

			});

	}

	/* =======================================================================
		Add Text
	========================================================================== */
	public function addText(text:String):Void {

		var value   :String = getValue();
		var position:Int    = getCursorPosition();
		var before  :String = value.substr(0,position);
		var after   :String = value.substr(position,value.length);

		if (value.substr(position-1,position) != '\n') before += '\n';
		if (value.substr(position,position + 1) != '\n') after = '\n' + after;

		setValue(before + text + after);

	}

		/* =======================================================================
			Get HTML
		========================================================================== */
		private function getHTML(data:Dynamic):Map<String,String> {

			return [
				'tab' =>
					'<div class="page-tab" data-area_tab="${_id}">
						<p class="name">${_name}</p>
						<input class="edit-name" type="text">
						<p class="delete">×</p>
					</div>',
				'area' =>
					'<div class="content-area" data-area_id="${_id}">
						<textarea class="textarea"></textarea>
					</div>',
			];

		}

}
