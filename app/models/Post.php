<?php

class Post extends Eloquent {

	public function generateRandomIdentifier()
	{
		$slug = Str::quickRandom(6);

		if( Post::where('slug', '=', $slug)->count() == 0)
		{
			return $slug;
		}

		generateRandomIdentifier();
	}

}