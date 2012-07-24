var Thread = function Thread(type, data)
{

    var t = new Element('div', {
        class: 'thread'
    }).inject($(type));

    this.event = null;
    this.event = this.getEvent(data.title);

    var title = this.formatTitle(data.title);
    data.realtitle = title.real;
    data.title = title.format;

    var myvote = '';
    if (data.likes == true) {
        myvote = 'up';
    } else if (data.likes == false) {
        myvote = 'down';
    }

    new _.tpl('thread', {
        id: data.id,
        name: data.name,
        title: data.title,
        type: type,
        realtitle: data.realtitle,
        score: data.score,
        time: this.formatTimestamp(data.created_utc),
        author: data.author,
        race: data.author_flair_css_class,
        comments: data.num_comments,
        event: (this.event ? this.event : ''),
        myvote: myvote
    }, t.$element);

    if (data.author_flair_css_class != null) {
        $(type + '-flair-' + data.id).setStyle('display', 'block');
    }

    if (data.title == '### Reveal spoiler') {
        $(type + '-title-' + data.id).addClass('spoiler');
    }

    if (data.thumbnail != 'self' && data.thumbnail != 'default') {
        $(type + '-thumb-' + data.id).innerHTML = '<img src="'+data.thumbnail+'" />'
    }

    $(type + '-comments-' + data.id).addEvent('click', function() {

        this.redditLink('http://www.reddit.com' + data.permalink);

    }.bind(this));

    var url = data.url;

    if (this.isYoutube(url)) {
        $(type + '-play-' + data.id).addClass('show');
        $(type + '-thumb-' + data.id).addClass('force');
    }
    
    if (url.indexOf('reddit.com/r/starcraft') == -1) {
    
        $(type + '-title-' + data.id).addEvent('click', function() {

            this.handleLink(url);

        }.bind(this));
        $(type + '-thumb-' + data.id).addEvent('click', function() {

            this.handleLink(url);

        }.bind(this));

        $(type + '-play-' + data.id).addEvent('click', function() {

            this.handleLink(url);

        }.bind(this));

    } else {
        $(type + '-title-' + data.id).addEvent('click', function() {

            this.redditLink(url);

        }.bind(this));
        $(type + '-thumb-' + data.id).addEvent('click', function() {

            this.redditLink(url);

        }.bind(this));
    }

};


Thread.prototype.handleLink = function handleLink(url)
{

    if (url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1 ||
     url.indexOf('.jpeg') != -1 || url.indexOf('.gif') != -1) {
        UI.openImage(url);
    } else if (this.isYoutube(url)) {
        UI.openYoutube(url);
    } else {
        pokki.openURLInDefaultBrowser(url);
    }

};

Thread.prototype.redditLink = function redditLing(url)
{

    UI.Page.open();

    Starcraft.page(url);

};

Thread.prototype.isYoutube = function isYoutube(url)
{

    return ((url.indexOf('youtube.com') != -1 && url.indexOf('v=') != -1) ||
     url.indexOf('youtu.be') != -1);

};


Thread.prototype.formatTimestamp = function formatTimestamp(unixTime)
{

	var currentTime = Math.round(new Date().getTime() / 1000);
	var diff        = currentTime - unixTime;

	if (diff <= 0) {
		return 'Just now';
	}
	
	if (diff < 60) {
		return diff + ' second' + (diff > 1 ? 's' : '') + ' ago';
	}
	
	diff = Math.round(diff / 60);
	if (diff < 60) {
		return diff + ' minute' + (diff > 1 ? 's' : '') + ' ago';
	}
	
	diff = Math.round(diff / 60);
	return diff + ' hour' + (diff > 1 ? 's' : '')  + ' ago';
	
};

Thread.prototype.formatTitle = function formatTitle(title)
{

    if (title.length > 145) {
        title = title.slice(0, 145) + '...';
    }

    if (title.indexOf('[s]') != -1 || title.indexOf('[S]') != -1) {
        var real = title.replace('[s]', '');        
        real = real.replace(' [s]', '');        
        real = real.replace('[s] ', '');        
        real = real.replace('[S]', '');        
        real = real.replace(' [S]', '');        
        real = real.replace('[S] ', '');        
        return {
            real: real,
            format: '### Reveal spoiler'
        };
    } else {
        return {
            real: title,
            format: title
        };
    }

};

Thread.prototype.getEvent = function getEvent(title)
{

    var title = title.toUpperCase();

    for (var key in StarCraftEvents) {
        for (var i = 0; i < StarCraftEvents[key].length; i++) {
            if (title.indexOf(StarCraftEvents[key][i]) != -1) {
                return key;
            }
        }
    }
    
};
