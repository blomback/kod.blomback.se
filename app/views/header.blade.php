<header class="header">
	@if (Request::path() == '/')
	<a href="{{ URL::to('/') }}"><h1>kod.blomback.se <span>– simple pastebin</span></h1></a>
	@else
	<a href="{{ URL::to('/') }}"><h1>kod.blomback.se <span>– create new</span></h1></a>
	@endif
</header>