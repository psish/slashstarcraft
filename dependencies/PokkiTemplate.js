/*  
    PokkiTemplate
     - Part of PokkiGalaxy Framework

    @authors
        John Chavarria <john@sweetlabs.com>, SweetLabs Inc.
    @version 1.1
    @license MIT License

    @copyright (c) 2011, Authors.

*/

// Defining the cache for templates
var pokkiTemplates = new Object();


// Pokki templating
pokki.tpl = function(template, args, container) {

    this.get(template);
    container.innerHTML = this.parse(args, container);

};

pokki.tpl.prototype.get = function get(template) {

    if (pokkiTemplates[template]) {
        this.tpl = pokkiTemplates[template];   
    } else {
        var tpl = new XMLHttpRequest();
        tpl.open("GET", pokki.config.tplFolder + '/'+template+'.' +
         pokki.config.tplFormat, false);
        tpl.send();
        pokkiTemplates[template] = tpl.responseText;
        this.tpl = tpl.responseText;
    }

};

pokki.tpl.prototype.parse = function parse(args, container) {

    this.tpl = this.tpl
     .replace(/\{{(.*?)\}}/g,
        function(markup, content) {
            content = content.split('.');
            count   = content.length;
            if (count > 1) {
                var initial = args[content[0]];
                var explode = content.splice(1, count);
                for (var i = 0; i < explode.length; i++) {
	                initial = initial[explode[i]];
                }
                return initial;
            } else {
                return args[content];
            }
            
        });

    return this.tpl;

};

