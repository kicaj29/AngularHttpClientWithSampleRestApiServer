# Intro

To run example first run the [server](./RESTapiServer) with rest api. In [WeatherForecastController](./RESTapiServer/RESTapiServer/WeatherForecast.cs) you can change the code to return success or error.   

Next run [AngularClient](./AngularClient).   

# Option 1 - simple approach

Subscribe and handle success and error

# Option 2 - use pipe, map, catchError

In case of using pipe to **handle an error use ```catchError```**. If we use ```pipe``` then ```map``` is executed only for success and to map error ```catchError``` has to be used!   
```catchError``` has to return ```Observable``` that will be finally handled in ```subscribe``` method as error handling.