UI.Page = {

    open: function open()
    {

        $('displayer').addClass('display');
        var y = window.innerHeight;
        $('displayer').setStyle('height', y - 52);
        (function() {

            $('page').empty();
            $0('#displayer .loader').removeClass('hide');
            $('displayer').addClass('show');

        }).delay(10);

    },

    close: function close()
    {

        $('displayer').removeClass('show');
        (function() {

            $('page').empty();
            $('displayer').removeClass('display');

        }).delay(500);

    }

};