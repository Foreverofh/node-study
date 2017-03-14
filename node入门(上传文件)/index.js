/**
 * Created by OUFUHUA on 2017/3/12.
 */
var server = require('./server');
var router = require('./router');
var requrestHandlers = require('./requestHandlers');
var handle = {};
handle['/'] = requrestHandlers.start;
handle['/start'] = requrestHandlers.start;
handle['/upload'] = requrestHandlers.upload;
handle['/show'] = requrestHandlers.show;
server.start(router.route,handle);