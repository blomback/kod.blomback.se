@extends('base')

@section('content')
	<div class="code content">
		<pre class="prettyprint linenums">{{ $data->content }}</pre>
	</div>
@stop