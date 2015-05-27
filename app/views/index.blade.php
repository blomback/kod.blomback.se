@extends('base')

@section('content')
	<form method="post" id="submit-code" class="content" action="{{ URL::route('submit') }}">
		<textarea class="text-editor js-editor mousetrap" spellcheck="false" name="content" rows="30" cols="30"></textarea>
		<button class="btn btn-save" type="submit" disabled>Save</button>
		<div class="save">Use {{ $shortcut }} to save</div>
	</form>
@stop