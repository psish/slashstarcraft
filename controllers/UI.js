var UI = {

    loaded: false,
    
    load: function load()
    {

        var account = ls.get('account');
        if (account) {
            this.Login.success(account, true);
        }

        document.body.addEvent('click', function(ev) {

            var el = (ev && ev.target ? ev.target : null);

            if (el && el.hasClass('navli')) {
                this.switchTab(el);
            } else if (el && el.id == 'logo') {
                _.openURLInDefaultBrowser('http://www.reddit.com/r/starcraft/');
            } else if (el && el.id == 'login') {
                this.Login.toggle();
            } else if (el && (el.id == 'login_ph' || el.id == 'passwd_ph')) {
                this.Login.inputSetFocus(el.id);
            } else if (el && (el.id == 'dim')) {
                this.dim(true);
            } else if (el && (el.id == 'go')) {
                this.Login.go();
            } else if (el && el.hasClass('vote')) {
                this.vote(el);
            } else if (el && el.hasClass('icon')) {
                this.switchTab(el.parentNode);
            } else if (el && el.id == 'logout') {
                this.Login.logout();
            } else if (el && el.id == 'pageclose') {
                this.Page.close();
            }

            this.clickCleaner(el);

        }.bind(this));

        document.body.addEvent('mouseover', function(ev) {

            if (ev.target.hasClass('spoiler')) {
                var title = ev.target.innerText;
                ev.target.innerText = ev.target.getAttribute('rel');
                ev.target.removeClass('spoiler');
                ev.target.addEvent('mouseout', function() {
                    this.innerText = title;
                    this.addClass('spoiler');
                });
            }

        });

        $('logo').addEvents({
            mouseover: function() {
                $('external').setStyle('opacity', '1 !important');
            },
            mouseout: function() {
                $('external').setStyle('opacity', '0 !important');            
            }
        });

        this.Login.load();

        this.loaded = true;
        
    },

    switchTab: function switchTab(el)
    {

        if (!el.hasClass('selected')) {
            $('tabhot').removeClass('selected');
            $('tabnew').removeClass('selected');
            $('tabrising').removeClass('selected');
            el.addClass('selected');
            if (el.id == 'tabhot') {
                $('arrow').removeClass('second');
                $('arrow').removeClass('third');
                $('arrow').addClass('first');

                $('mover').removeClass('new');
                $('mover').removeClass('rising');
                $('mover').addClass('hot');
            } else if (el.id == 'tabnew') {
                $('arrow').removeClass('first');
                $('arrow').removeClass('third');
                $('arrow').addClass('second');

                $('mover').removeClass('hot');
                $('mover').removeClass('rising');
                $('mover').addClass('new');
            } else if (el.id == 'tabrising') {
                $('arrow').removeClass('first');
                $('arrow').removeClass('second');
                $('arrow').addClass('third');

                $('mover').removeClass('hot');
                $('mover').removeClass('new');
                $('mover').addClass('rising');
            }
        }
    
    },

    openImage: function openImage(url)
    {

        this.dim();
        var dim = $('dim');
        dim.empty();
        var img = new Element('img', {
            src: url
        }).inject(dim);
        img.$element.addEvent('click', function() {

            pokki.openURLInDefaultBrowser(url);

        });
    
    },

    openYoutube: function openYoutube(url)
    {

        this.dim();
        var dim = $('dim');
        dim.empty();

        if (url.indexOf('youtu.be') != -1) {
            url = url.split('youtu.be/')[1];
        } else {
            url = url.split('v=')[1];
            var ampersandPosition = url.indexOf('&');
            if(ampersandPosition != -1) {
              url = url.substring(0, ampersandPosition);
            }
        }

        var video = new Element('object', {
            type            : 'text/html',
            data            : 'http://www.youtube.com/embed/'+url+'?autoplay=1&allowfullscreen=true',
            id              : 'pokkiYoutubePlayer'
        }).inject(dim);        

        var realURL = new Element('a', {
            text: 'Watch on Youtube'
        }).inject(dim);

        realURL.$element.addEvent('click', function() {

            pokki.openURLInDefaultBrowser('http://www.youtube.com/watch?v='
             + url);
            this.dim(true);
        
        }.bind(this));
    
    },

    dim: function dim(del)
    {

        del = del || false;
        var dim = $('dim');        
        
        if (!del) {
            dim.setStyles({
                top: 0,
                opacity: '1 !important'
            });
        } else {
            dim.empty();
            dim.setStyles({
                top: -9999,
                opacity: '0 !important'
            });
        }
    
    },


    clickCleaner: function clickCleaner(el)
    {

        var login = ['loginform', 'go', 'login', 'login_login', 'login_passwd',
         'login_ph', 'passwd_ph'];
        if (el && !login.contains(el.id)) {
            if (!$('loginform').hasClass('hide')) {
                $('loginform').addClass('hide');
            }
        }

    },

    vote: function vote(el)
    {

        var type = 1;
        if (el.hasClass('downvote')) {
            type = -1;
        }
        var parent = el.parentNode;
        var current = 0;
        if (parent.hasClass('up')) {
            current = 1;
        } else if (parent.hasClass('down')) {
            current = -1;
        }
        var vote = type - current;

        Array.each(parent.getChildren(), function(els) {

            if (typeof els == 'object' && els.hasClass('votecount')) {
                var votes = Number(els.get('text'));
                if (type != current) {
                    var mult = 1;
                    if (current != 0) {
                        mult = 2;
                    }
                    votes += mult * type;
                } else if (type == current) {
                    votes += current * -1;
                }
                if (votes < 0) {
                    votes = 0;
                }
                els.set('text', votes);
            }

        });

        parent.className = 'votes';
        if (vote > 0) {
            parent.addClass('up');
            vote = 1;
        } else if (vote < 0) {
            parent.addClass('down');
            vote = -1;
        }

        var id = parent.get('id').split('vote-')[1];

        Starcraft.vote(id, vote);
    
    }

};
