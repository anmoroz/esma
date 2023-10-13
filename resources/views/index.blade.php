<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <title>ESMA</title>
        <link rel=stylesheet href=https://cdn.jsdelivr.net/npm/pretty-print-json@2.0/dist/css/pretty-print-json.css>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap&family=Public+Sans:wght@400;500;600;700"
            rel="stylesheet"
        />
    </head>
    <body class="antialiased">
        <noscript>You need to enable JavaScript to run this application.</noscript>
        <div class="container" id="root"></div>
        @viteReactRefresh
        @vite(['resources/js/index.jsx'])
    </body>
</html>
