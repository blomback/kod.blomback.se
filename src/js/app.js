$(function() {
	var $body         = $("body");
	var $receiver     = $("#app");
	var $header       = $(".header");
	var $editor       = $(".js-editor");
	var $saveArea     = $(".save");
	var $saveButton   = $(".btn-save");
	var $codeForm     = $("#submit-code");

	/**
	 * History variables
	 */
	var history_check = true;
	var current_url = document.URL;
	var slug = window.location.pathname.substring(1);

	var post = ($body.hasClass("post")) ? true : false;

	/**
	 * Check if the device is mobile or not
	 *
	 */
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};

	/**
	 * Initialize the editor
	 *
	 */
	var init = function()
	{
		resizeEditor();
		prettyPrint();
		$editor.tabby();
		$editor.focus();
	};

	/**
	 * Resize the editor to viewport size
	 *
	 */
	var resizeEditor = function() {
		var headerHeight = $header.outerHeight();
		var width = window.innerWidth - 20;
		var height = window.innerHeight - headerHeight - 20;

		if ( isMobile.any() )
		{
			height = height-55;
		}

		$editor.css({ "width": width, "height": height });
	};

	/**
	 * Get the length of the input
	 *
	 * @return {Number}
	 */
	var getInputLength = function()
	{
		var length;
		if( $editor.val() )
		{
			return $editor.val().length;
		}
		return 0;
	};

	/**
	 * Get the total height of the input so we
	 * can position the save button.
	 *
	 */
	var getContentHeight = function()
	{
		dumpContent();
		return $(".dump").height();
	};

	/**
	 * Get the slug of a url
	 *
	 * @param  {string} url
	 * @return {string} slug
	 */
	var getSlug = function(url)
	{
	    var a = document.createElement('a');
	    a.href = url;
	    return a.pathname.substring(1);
	}

	/**
	 * html encode a string
	 *
	 * @param  {string} s  the text to encode
	 * @return {string} s  the encoded text
	 */
	var htmlEncode = function(s)
	{
	  var el = document.createElement("div");
	  el.innerText = el.textContent = s;
	  s = el.innerHTML;
	  return s;
	};

	/**
	 * Append the input contet to a <pre> element, so we can
	 * calculate the height of the content.
	 *
	 */
	var dumpContent = function()
	{
		var text = htmlEncode($editor.val()) + " ";

		if( $("body").find(".dump").length == 0 )
		{
			$("body").append("<pre class='dump'></pre>");

		}
		$(".dump").html(text);
	};

	/**
	 * Place the save instructions under the content at all times
	 *
	 */
	var positionSaveText = function()
	{
		var headerHeight  = $header.outerHeight();
		var editorHeight  = $editor.outerHeight();
		var contentHeight = getContentHeight();
		var editorOffset  = $editor.offset().top;
		var viewportCheck = contentHeight + editorOffset + headerHeight + 50;
		var offsetTop     = contentHeight + editorOffset - headerHeight + 30;
		var viewport      = window.innerHeight + headerHeight;

		if( viewportCheck > viewport)
		{
			$saveArea.addClass("docked").css({ "top": "" });
		}
		else {
			$saveArea.removeClass("docked").css({ "top": offsetTop });
		}
	};

	/**
	 * Show the save instructions
	 *
	 */
	var showSaveText = function()
	{
		if( ! $saveArea.hasClass("is-visible") )
		{
			$saveArea.fadeIn(200, function() {
				$saveArea.addClass("is-visible");
			});
		}
	};

	/**
	 * Hide the save instructions
	 *
	 */
	var hideSaveText = function()
	{
		if( $saveArea.hasClass("is-visible") )
		{
			$saveArea.fadeOut(200, function() {
				$saveArea.removeClass("is-visible");
			});
		}
	};

	/**
	 * Enable/disable the save button on mobile.
	 * Show/hide instructions on desktop.
	 *
	 */
	var handleSaveButton = function()
	{
		var length = getInputLength();

		if ( length > 0 )
		{
			$saveButton.prop('disabled', false);
		}
		else {
			$saveButton.prop('disabled', true);
		}

		if ( ! isMobile.any() ) {
			if ( length > 0 )
			{
				positionSaveText();
				showSaveText();
			}
			else
			{
				hideSaveText();
			}
		}
	};

	/**
	 * Save the content
	 *
	 */
	var save = function()
	{
		var length = getInputLength();

		if( length > 0 )
		{
			$codeForm.submit();
		}
	};

	$(window).resize(function () {
		if (! post && ! isMobile.any() )
		{
			positionSaveButton();
		}

		resizeEditor();
	});

	$editor.on("keyup", function() {
		handleSaveButton();
	});

	$saveButton.on("click", function(e) {
		e.preventDefault();
		save();
	});

	Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
		e.preventDefault();
		save();
	    return false;
	});

	init();
});