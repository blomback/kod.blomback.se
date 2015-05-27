<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>kod.blomback.se - simple pastebin</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimal-ui" />
	{{ HTML::style('css/style.min.css') }}
	{{ HTML::style('http://fonts.googleapis.com/css?family=Fira+Mono') }}
	{{ HTML::script('js/all.min.js') }}
</head>
@if (Request::path() == '/')
<body>
@else
<body class="post">
@endif
	@include('header')
	<div id="app">
		@yield('content')
	</div>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-160739-7', 'auto');
	  ga('send', 'pageview');

	</script>
</body>
</html>