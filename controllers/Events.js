var Events = {

    displayThreads: function displayThreads(type)
    {

        _.debug('[EVENTS] displayThreads '+type+' event catched.');

        var data = _.r('Starcraft.data.' + type, true);
        if (data) {
            UI.Threads.display(type, data);        
        }
    
    },

    loginSuccess: function loginSuccess(data)
    {

        UI.Login.success(data);
        _.debug('[EVENTS] Login success!');
        
    
    },

    loginFailure: function loginFailure()
    {

        _.debug('[EVENTS] Login failure :(');
        
    
    },

    page: function page(data)
    {

        _.debug('[EVENTS] Page event catched.');
        var item = data[0].data.children[0].data;
        var comments = data[1].data.children;
        new Page(item, comments);

    }

};
