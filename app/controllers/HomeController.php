<?php

class HomeController extends BaseController {

	public function showIndex()
	{
		$shortcut = $this->getShortcut();
		return View::make('index')->withShortcut($shortcut);
	}

	private function getShortcut()
	{
		if (stripos($_SERVER['HTTP_USER_AGENT'], 'mac') !== FALSE) {
			return "&#8984;+S";
		}
		return "Ctrl+S";
	}
}