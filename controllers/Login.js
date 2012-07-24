UI.Login = {

    load: function load()
    {

        $('login_login').addEvents({
            focus: function() {

                this.inputFocus('login');
            
            }.bind(this),
            keydown: function(ev) {

                if (ev.keyIdentifier == 'Enter') {
                    this.go();
                }

            }.bind(this),
            blur: function() {
            
                this.inputBlur('login');
            
            }.bind(this)
        });

        $('login_passwd').addEvents({
            focus: function() {

                this.inputFocus('passwd');

            }.bind(this),
            keydown: function(ev) {

                if (ev.keyIdentifier == 'Enter') {
                    this.go();
                }

            }.bind(this),
            blur: function() {

                this.inputBlur('passwd');

            }.bind(this)
        });

    },

    toggle: function login()
    {

        if ($('loginform').hasClass('hide')) {
            $('loginform').removeClass('hide');
        } else {
            $('loginform').addClass('hide');
        }
    
    },

    inputSetFocus: function inputSetFocus(id)
    {

        if (id == 'login_ph') {
            $('login_login').focus();
        } else if (id == 'passwd_ph') {
            $('login_passwd').focus();
        }
    
    },

    inputFocus: function inputFocus(type)
    {

        if (type == 'login') {
            var ph = $('login_ph');
        } else if (type == 'passwd') {
            var ph = $('passwd_ph');
        }

        ph.setStyles({
            opacity: '0 !important',
            'letter-spacing': '-6px' 
        });

    
    },

    inputBlur: function inputBlur(type)
    {

        if (type == 'login') {
            var ph = $('login_ph');
            var input = $('login_login');
        } else if (type == 'passwd') {
            var ph = $('passwd_ph');
            var input = $('login_passwd');            
        }

        if (input.value == '') {
            ph.setStyles({
                opacity: '1 !important',
                'letter-spacing': '1px' 
            });
        }
    
    },

    go: function go()
    {

        var login  = $('login_login').value;
        var passwd = $('login_passwd').value;

        if (login && passwd) {
            $('go').addClass('hide');
            $('goloader').addClass('show');
            $('login_login').set('disabled', 'disabled');
            $('login_passwd').set('disabled', 'disabled');
            Starcraft.login(login, passwd);
        }
    
    },

    success: function succcess(data, unsave)
    {

        unsave = unsave || false;

        $('loginform').addClass('hide');
        this.resetForm();
        $('login').addClass('hide');
        $('loggedin').addClass('show');
        $('welcome').set('html', 
         $('welcome').get('html').replace('{{username}}', data.login));
        Starcraft.getAll();

        if (!unsave) {
            ls.set('account', {
                login: data.login,
                passwd: _.scramble(data.passwd),
                modhash: data.hash
            });
        }
    
    },

    resetForm: function resetForm()
    {

        $('go').removeClass('hide');
        $('goloader').removeClass('show');
        $('login_login').removeAttribute('disabled');
        $('login_passwd').removeAttribute('disabled');
        $('login_login').value = '';
        $('login_passwd').value = '';
    
    },

    logout: function logout()
    {

        ls.remove('account');
        $('loggedin').removeClass('show');
        $('login').removeClass('hide');
        $('loginform').removeClass('hide');    
        $('welcome').set('html', 'Welcome, <strong>{{username}}</strong>');

    }

};
