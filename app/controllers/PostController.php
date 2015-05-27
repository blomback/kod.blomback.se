<?php

class PostController extends BaseController {

	public function submitPost()
	{
		$post          = new Post;
		$post->content = htmlentities($_POST['content']);
		$post->slug    = $post->generateRandomIdentifier();
		$post->save();

		return Redirect::action('PostController@showPost', array($post->slug));
	}

	public function showPost($key)
	{
		$data = Post::where("slug", "=", $key)->first();
		if (! $data )
		{
			return Response::view('404', array(), 404);
		}
		return View::make('post')->withData($data);
	}

}
