# Middleware Stack Printer

Print out your express middleware stack in a tree format. Useful for inspecting and debugging large Express apps.
To see an example of the output, check out [this gist](https://gist.github.com/ErisDS/9804a94a346ec6d811e4bbd7758f879e),
which shows the full stack for a request for `/` in the Ghost platform using ~1.0.0-alpha.1

Tested with express 4.x only.

## Install:

`npm install middleware-stack-printer`

## Usage:

`app.use(middlewareStackPrinter(options));`

Use this module as middleware, placing the call just before your routes.

Example:

```
  app = express();
  app.use(express.static(...));
  ...
  // more middleware
  ...

  app.use(middlewareStackPrinter(options));

  // routes here
  app.get('/', function (req, res, next) {});

  // error handling
  app.use(function (err, req, res, next){});
```

## Options:

By default, this middleware won't do anything. Pass `true` to the function to enable stack printing.

`app.use(middlewareStackPrinter(true));`

Alternatively, you can supply an options object with any of the following values set:

* `printStack` - enable stack printing
* `env` - define the environment/mode in which the stack should be output
* `hideAnon` - don't output the full content of anonymous functions

`app.use(middlewareStackPrinter({env: 'development', hideAnon: true}));`

## Notes:

The express router is made up of `Layer` and `Route` objects.
This middleware detects them in naive ways and attempts to print the details in a useful way for inspection & debugging

