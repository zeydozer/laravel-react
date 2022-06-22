<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Zeyd Özer</title>
  <link href="/css/app.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-3">
    <div class="row justify-content-md-center" id="data-form"></div>
    <div class="row justify-content-md-center mt-5 pt-3 border-top" id="data-list"></div>
  </div>
  <script src="/js/app.js"></script>
</body>
</html>