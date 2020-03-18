<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <title>nbitists</title>
  <meta name="csrf-token" content="{{csrf_token()}}">
<link rel="stylesheet" href="{{asset('css/app.css')}}">
</head>
<body>
  <div id="app">
    <v-app>
     
            
            <navbar></navbar>
              
            <appfooter></appfooter>
       
    </v-app>
  </div>
  <script src="{{asset('js/app.js')}}"></script>
</body>
</html>