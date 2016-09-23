/**
 * # Middleware stack printer
 *
 * Prints out the middleware stack of an express app.
 * Tested with express 4.x only.
 */

var defaults = {
    printStack: false,
    hideAnon: false
};

var printItem = function printItem(item, prefix) {
    prefix = prefix || '';

    if (item.route) {
        console.log(prefix, 'Route', item.route.path);
    } else if (item.name === '<anonymous>' && !defaults.hideAnon) {
        console.log(prefix, item.name, item.handle);
    } else {
        console.log(prefix, item.name, item.method ? '(' + item.method.toUpperCase() + ')' : '');
    }

    printSubItems(item, prefix + ' -');
};

var printSubItems = function printSubItems(item, prefix) {
    if (item.name === 'router') {
        console.log(prefix, 'MATCH', item.regexp);

        if (item.handle.stack) {
            item.handle.stack.forEach(function (subItem) {
                printItem(subItem, prefix);
            });
        }
    }

    if (item.route && item.route.stack) {
        item.route.stack.forEach(function (subItem) {
            printItem(subItem, prefix);
        });
    }

    if (item.name === 'mounted_app') {
        console.log(prefix, 'MATCH', item.regexp);
    }
};

module.exports = function configStackPrinter(options) {
    options = options || {};

    if (options === true || process.env.PRINT_STACK || options.env === process.env.NODE_ENV || options.printStack === true) {
        defaults.printStack = true;
    }

    defaults.hideAnon = options.hideAnon || defaults.hideAnon;

    return function stackPrinter(req, res, next) {
        if (defaults.printStack) {
            console.log('Printing Stack For', req.url);

            req.app._router.stack.forEach(function (stackItem) {
                printItem(stackItem);
            });
        }

        next();
    };
};
