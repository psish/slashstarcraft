var Data = {

    load: function load()
    {

        var hot = _.r('Starcraft.data.hot', true);

        if (hot) {
            Events.displayThreads('hot');
        }

        var news = _.r('Starcraft.data.new', true);

        if (news) {
            Events.displayThreads('new');
        }

    
    },

}
