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

        if (UI.loaded) {
            Data.load();
        } else {
            window.setTimeout(Data.load, 250, true);
        }

        UI.load();
        
    }
});

