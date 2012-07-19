UI.Threads = {

    display: function display(type, data)
    {

        $(type).empty();
        _.debug('[UI] Displaying '+type+' threads.');
        for (var i = 0; i < data.length; i++) {
            new Thread(type, data[i].data);
        }

    }

}
