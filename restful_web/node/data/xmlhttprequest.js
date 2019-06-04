var XMLHttpRequest = function() {

  var http = require('http'),
      https = require('https');

  var method, host, port, path, protocol,
      request, xhr, callEventListeners,
      statusCodes, syncFinished,
      lastReadyState = 0,
      listeners = ['readystatechange', 'abort', 'error', 'loadend', 'progress', 'load'],
      privateListeners = {},
      responseHeaders = {},
      headers = {};

  statusCodes = {
    100:'Continue',101:'Switching Protocols',102:'Processing',200:'OK',201:'Created',202:'Accepted',203:'Non-Authoritative Information',204:'No Content',205:'Reset Content',206:'Partial Content',207:'Multi-Status',208:'Already Reported',226:'IM Used',300:'Multiple Choices',301:'Moved Permanently',302:'Found',303:'See Other',304:'Not Modified',305:'Use Proxy',306:'Switch Proxy',307:'Temporary Redirect',308:'Permanent Redirect',400:'Bad Request',401:'Unauthorized',402:'Payment Required',403:'Forbidden',404:'Not Found',405:'Method Not Allowed',406:'Not Acceptable',407:'Proxy Authentication Required',408:'Request Timeout',409:'Conflict',410:'Gone',411:'Length Required',412:'Precondition Failed',413:'Request Entity Too Large',414:'Request-URI Too Long',415:'Unsupported Media Type',416:'Requested Range Not Satisfiable',417:'Expectation Failed',418:'I\'m a teapot',419:'Authentication Timeout',420:'Method Failure',420:'Enhance Your Calm',422:'Unprocessable Entity',423:'Locked',424:'Failed Dependency',426:'Upgrade Required',428:'Precondition Required',429:'Too Many Requests',431:'Request Header Fields Too Large',440:'Login Timeout',444:'No Response',449:'Retry With',450:'Blocked by Windows Parental Controls',451:'Unavailable For Legal Reasons',451:'Redirect',494:'Request Header Too Large',495:'Cert Error',496:'No Cert',497:'HTTP to HTTPS',498:'Token expired/invalid',499:'Client Closed Request',499:'Token required',500:'Internal Server Error',501:'Not Implemented',502:'Bad Gateway',503:'Service Unavailable',504:'Gateway Timeout',505:'HTTP Version Not Supported',506:'Variant Also Negotiates',507:'Insufficient Storage',508:'Loop Detected',509:'Bandwidth Limit Exceeded',510:'Not Extended',511:'Network Authentication Required',520:'Origin Error',521:'Web server is down',522:'Connection timed out',523:'Proxy Declined Request',524:'A timeout occurred',598:'Network read timeout error',599:'Network connect timeout error'
  };

  callEventListeners = function(listeners) {
    var listenerFound = false, i;
    if (typeof listeners === 'string') {
      listeners = [listeners];
    }
    listeners.forEach(function(e) {
      if (typeof xhr['on' + e] === 'function') {
        listenerFound = true;
        xhr['on' + e].call(xhr);
      }
      if (privateListeners.hasOwnProperty(e)) {
        for (i = 0; i < privateListeners[e].length; i++) {
          if (privateListeners[e][i] !== void 0) {
            listenerFound = true;
            privateListeners[e][i].call(xhr);
          }
        }
      }
    });
    return listenerFound;
  };

  xhr = {

    UNSENT:           0,
    OPENED:           1,
    HEADERS_RECIEVED: 2,
    LOADING:          3,
    DONE:             4,
    status: 0,
    statusText: '',
    responseText: '',
    readyState: 0,
    response: '',

    open: function(_method, url) {
      if (_method === void 0 || url === void 0) {
        throw TypeError('Failed to execute \'open\' on \'XMLHttpRequest\': 2 arguments required, but only ' + +(_method || url) + ' present.');
      }
      xhr.readyState = 1;
      method = _method;
      url = url.replace(/^https?:\/\//, function(match) {
        protocol = match.slice(0, -3);
        return '';
      });
      if (protocol !== void 0) {
        switch (protocol) {
          case 'http':
            port = 80;
            break;
          case 'https':
            port = 443;
            break;
        }
      } else {
        protocol = 'http';
        port = 80;
      }
      path = '/';
      host = url.match(/.*\/?/)[0].replace(/\/.*/, function(match) {
        path = match;
        return '';
      });
      xhr.readyState = xhr.OPENED;
      lastReadyState = xhr.OPENED;
    },

    send: function(post) {

      if (xhr.readyState !== xhr.OPENED) {
        throw {
          name: 'InvalidStateError',
          message: 'Failed to execute \'send\' on \'XMLHttpRequest\': The object\'s state must be OPENED.'
        }
      }

      var options = {
        host: host,
        path: path,
        port: port,
        method: method,
        headers: headers
      };

      if (post !== void 0) {
        options.headers['content-length'] = typeof post === 'object' ?
                                            Object.keys(post).length :
                                            post.length;
      }

      request = (port === 443 ? https : http).request(options, function(res) {

        var data = '';
        xhr.status = res.statusCode;
        if (statusCodes.hasOwnProperty(xhr.status)) {
          xhr.statusText = statusCodes[xhr.status];
        } else {
          xhr.statusText = xhr.status.toString();
        }
        xhr.readyState = xhr.HEADERS_RECIEVED;
        lastReadyState = xhr.HEADERS_RECIEVED;
        responseHeaders = res.headers;
        callEventListeners('readystatechange');

        res.on('data', function(chunk) {
          xhr.readyState = xhr.LOADING;
          callEventListeners('progress');
          if (lastReadyState === xhr.HEADERS_RECIEVED) {
            callEventListeners('readystatechange');
          }
          lastReadyState = xhr.LOADING;
          data += chunk;
        });

        res.on('end', function() {
          xhr.readyState = xhr.DONE;
          lastReadyState = xhr.DONE;
          xhr.responseText = data;
          xhr.response = data;
          callEventListeners(['readystatechange', 'loadend', 'load']);
          syncFinished = true;
        });

      }).on('error', function(err) {

        if (callEventListeners('error') === false) {
          console.log(err);
        }
        callEventListeners('loadend');
        syncFinished = true;

      });

      if (post !== void 0) {
        if (typeof post === 'object') {
          post = '?' + Object.keys(post).map(function(e) {
            return e.toString() + '=' + post[e];
          }).join('&');
        }
        request.write(post);
      }

      request.end();

    },

    setRequestHeader: function(header, value) {
      if (header === void 0 || value === void 0) {
        throw TypeError(' Failed to execute \'setRequestHeader\' on \'XMLHttpRequest\': 2 arguments required, but only ' + +(headers || value) + ' present.');
      }
      headers[header] = value;
    },

    abort: function() {
      if (request !== void 0) {
        callEventListeners('abort');
        request.abort();
      }
    },

    addEventListener: function(type, fn) {
      if (listeners.indexOf(type) !== -1) {
        privateListeners[type].push(fn);
      }
    },

    removeEventListener: function(type, fn) {
      var index;
      if (privateListeners[type] === void 0) {
        return;
      }
      while ((index = privateListeners[type].indexOf(fn)) !== -1) {
        privateListeners[type].splice(index, 1);
      }
    },

    getAllResponseHeaders: function() {
      var res = '';
      for (var key in responseHeaders) {
        res += key + ': ' + responseHeaders[key] + '\n';
      }
      return res.slice(0, -1);
    },

    getResponseHeader: function(key) {
      if (responseHeaders.hasOwnProperty(key.toLowerCase())) {
        return responseHeaders[key.toLowerCase()];
      }
      return null;
    }

  };

  for (var i = 0; i < listeners.length; i++) {
    xhr['on' + listeners[i]] = null;
    privateListeners[listeners[i]] = [];
  }

  return xhr;

};

module.exports = XMLHttpRequest;
