# Cases

* handle error in generic way - use toast/snack bar
* display error in concrete place - for example next to the input value
* store as a cache - we take data always from the store, do we need to extend store schema about error?
  * what to do when data are in the store and we want refresh it but refresh fails? present obsolete data or clear everything?
* do not add blindly every where catching errors but only in places when it is expected to fail (we do not want have dead code - code that will never be executed)
