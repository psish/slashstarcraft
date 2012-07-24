var Starcraft = {

    reddit: new Reddit({
        sub: 'starcraft'
    }),

    data: new Object(),

    getAll: function getAll()
    {

        this.reddit.frontPage(function(data) {

            _.debug('[BACKGROUND] Received "Hot" data.', data);
            this.data.hot = data;
            Events.displayThreads('hot');

        }.bind(this), function() {});

        this.reddit.news('new', function(data) {

            _.debug('[BACKGROUND] Received "New" data.', data);
            this.data.new = data;
            Events.displayThreads('new');

        }.bind(this), function() {});

        this.reddit.news('rising', function(data) {

            _.debug('[BACKGROUND] Received "Rising" data.', data);
            this.data.rising = data;
            Events.displayThreads('rising');

        }.bind(this), function() {});
    
    },

    login: function login(login, passwd)
    {

        this.reddit.login(login, passwd, function(data) {

            _.debug('[BACKGROUND] Login success!');
            Events.loginSuccess(data);

        }, function(data) {

            _.debug('[BACKGROUND] Login failure :(');
            Events.loginFailure();            

        });
    
    },

    vote: function vote(id, vote)
    {

        this.reddit.vote(id, vote, function(data) {}, function(data) {});
    
    },

    page: function page(url)
    {

        url = url.replace(this.reddit.uri + this.reddit.sub + '/', '');

        this.reddit.page(url, function(data) {

            Events.page(data);

        }, function(data) {});

    }

};
