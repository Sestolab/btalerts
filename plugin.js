CKEDITOR.plugins.add('btalerts', {
    requires: 'richcombo,smethods',
    lang: 'en,ru,uk',

    init: function(editor){
        const config = editor.config,
            lang = editor.lang.btalerts,
            alerts = {
                primary: 'color: #004085; background-color: #cce5ff;',
                secondary: 'color: #383d41; background-color: #e2e3e5;',
                success: 'color: #155724; background-color: #d4edda;',
                danger: 'color: #721c24; background-color: #f8d7da;',
                warning: 'color: #856404; background-color: #fff3cd;',
                info: 'color: #0c5460; background-color: #d1ecf1;',
                light: 'color: #818182; background-color: #fefefe;',
                dark: 'color: #1b1e21; background-color: #d6d8d9;'
            },
            re = new RegExp(`alert-(${CKEDITOR.tools.objectKeys(alerts).join('|')})`, 'g');

        editor.ui.addRichCombo('btalerts', {
            label: lang.label,
            title: lang.title,
            panel: {
                css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
                multiSelect: false,
                attributes: {'aria-label': lang.panelTitle}
            },
            init: function(){
                this.startGroup(lang.panelTitle);
                for(const item in alerts)
                    this.add(item, `<p style="${alerts[item]}padding: 1.25rem; box-sizing: border-box;">${lang[item]}</p>`, lang[item]);
            },
            onClick: function(item){
                editor.focus();
                editor.fire('saveSnapshot');
                if (this.element.hasClass(`alert-${item}`) || !this.element.hasClass('alert'))
                    this.element.toggleClass('alert').toggleAttribute('role', 'alert');
                this.element.toggleClass(`alert-${item}`, re);
                for (const link of this.element.getElementsByTag('a').toArray())
                    link.toggleClass((this.element.hasClass('alert') == !link.hasClass('alert-link')) ?  'alert-link' : null);
                editor.fire('saveSnapshot');
            },
            onOpen: function(){
                this.element = editor.getSelection().getStartElement();
                if(this.element)
                    this.element = this.element.getAscendant({'div': 1, 'p': 1}, true);

                if (this.element && this.element.hasClass('alert'))
                    this.mark(this.element.matchClass(re)[0].replace('alert-', ''));
            }
        });
    }
});