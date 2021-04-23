# Intro

To run example first run the [server](./RESTapiServer) with rest api.   

Next run [AngularClient](./AngularClient).   

# Option 1 - simple approach

Subscribe and handle success and error

# Option 2 - use pipe, map, catchError

In case of using pipe to **handle an error use ```catchError```**. If we use ```pipe``` then ```map``` is executed only for success and to map error ```catchError``` has to be used if we want transform original error.   
```catchError``` has to return ```Observable``` that will be finally handled in ```subscribe``` as **success result** because ```catchError``` means that the error has been already handled!

# Option 3 - forkJoin

## Option 3a - forkJoin without catchError

If we will not use catchError then forkJoin will be stopped! It means that first error stops everything!

> NOTE: “If any input observable errors at some point, forkJoin will error as well and all other observables will be immediately unsubscribed.”

# Links
https://medium.com/@swarnakishore/performing-multiple-http-requests-in-angular-4-5-with-forkjoin-74f3ac166d61   
https://betterprogramming.pub/rxjs-error-handling-with-forkjoin-3d4027df70fc   
