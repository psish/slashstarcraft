_.addEventListener('shown', function() {

    var y = _.getWorkAreaSize().height;
    _.loadWindowState('window');
    _.allowResize(false, true, {
        minHeight: 542
    });

});

_.addEventListener('hiding', function() {

    _.saveWindowState('window');

});

_.addEventListener('unload', function() {

    _.saveWindowState('window');

});


window.addEvents({
    resize: function() {

        var y = document.body.clientHeight;
        var tabs = $$('.tab');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].setStyle('height', y - 92);
        }
        
        if ($('displayer').hasClass('show')) {
            $('displayer').setStyle('height', y - 52);
        }

    },
    load: function() {

        var account = ls.get('account');
        if (account) {
            account.passwd = _.descramble(account.passwd);
            this.Starcraft.login(account.login, account.passwd);
        }

        this.Starcraft.getAll();
        window.setInterval(function() {

            _.debug('[BACKGROUND] Periodical...');
            this.Starcraft.getAll();

        }, 45000, true);

        if (UI.loaded) {
            Events.data();
        } else {
            window.setTimeout(Events.data, 250, true);
        }

        UI.load();
        
    }
});