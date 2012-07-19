var Reddit = function Reddit(options)
{

    for (var key in options) {
        this[key] = options[key];
    }

    this.uri = 'http://www.reddit.com/r/';
    
};

Reddit.prototype.call = function call(fn, params, success, failure)
{

    var uri = this.uri + this.sub + (fn ? '/' + fn : '') + '.json';

    if (params) {
        uri += '?';
        var i = 0;
        var len = params.length();
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                uri += key + '=' + params[key];
                if (i != len - 1) {
                    uri += '&';
                }
                i++;
            }
        }
    }

    _.debug('[REDDIT] Call to ' + uri);

    new Request({
        method: 'GET',
        uri: uri,
        onSuccess: function(data) {

            _.debug('[REDDIT] SUCCESS - Call to ' + uri);
            var data = JSON.parse(data);
            success(data);

        },
        onFailure: function(xhr) {

            _.debug('[REDDIT] FAILURE - Call to ' + uri);
            failure(xhr);
            
        }
    }).send();

}

Reddit.prototype.frontPage = function frontPage(success, failure)
{


    this.call(null, null, function(data) {

        success(data.data.children);
    
    }, failure);

};

Reddit.prototype.news = function news(type, success, failure)
{

    var params = {
        limit: 25,
        sort: type
    };

    this.call('new', params, function(data) {

        success(data.data.children);
    
    }, failure);

};

Reddit.prototype.inbox = function inbox(success, failure)
{

    new Request({
        method: 'GET',
        uri: 'http://www.reddit.com/message/inbox.json',
        onSuccess: function(data) {

            data = JSON.parse(data);
            if (data && data.data && data.data.children) {
                success(data.data.children);
            }

        },
        onFailure: function(xhr) {

            failure();
            
        }
    }).send();

};

Reddit.prototype.login = function login(l, p, success, failure)
{

    new Request({
        method: 'POST',
        uri: 'https://ssl.reddit.com/api/login/' + l + '?api_type=json&user=' +
         l + '&passwd=' + p,
        onSuccess: function(data) {

            data = JSON.parse(data);
            var d = {
                login: l,
                passwd: p,
                hash: data.json.data.modhash
            }
            success(d);

        },
        onFailure: function(data) {

            failure();
        
        }
    }).send();

};

Reddit.prototype.vote = function vote(id, vote, success, failure)
{

    var modhash = ls.get('account.modhash');

    if (modhash) {
        new Request({
            method: 'POST',
            uri: 'http://www.reddit.com/api/vote?id=' + id + '&dir=' + vote +
             '&uh=' + modhash,
            onSuccess: function(data) {

                success(data);

            },
            onFailure: function(data) {

                failure();
            
            }
        }).send();
    } else {
        failure();
    }
    
};


Reddit.prototype.page = function page(url, success, failure)
{

    if (url[url.length -1] == '/') {
        url = url.slice(0, url.length - 1);
    }
    url += '.json';

    this.call(url, {}, success, failure);

}