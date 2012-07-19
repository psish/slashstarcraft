window.addEvent('load', function() {

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

});
