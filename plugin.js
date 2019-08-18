CKEDITOR.plugins.add('btalerts', {
    requires: 'richcombo',
    lang: 'en,ru,uk',

    init: function(editor){
        const config = editor.config,
            lang = editor.lang.btalerts,
            alerts = {
                normal: '',
                primary: 'color: #004085; background-color: #cce5ff; padding: 1.25rem; box-sizing: border-box;',
                secondary: 'color: #383d41; background-color: #e2e3e5; padding: 1.25rem; box-sizing: border-box;',
                success: 'color: #155724; background-color: #d4edda; padding: 1.25rem; box-sizing: border-box;',
                danger: 'color: #721c24; background-color: #f8d7da; padding: 1.25rem; box-sizing: border-box;',
                warning: 'color: #856404; background-color: #fff3cd; padding: 1.25rem; box-sizing: border-box;',
                info: 'color: #0c5460; background-color: #d1ecf1; padding: 1.25rem; box-sizing: border-box;',
                light: 'color: #818182; background-color: #fefefe; padding: 1.25rem; box-sizing: border-box;',
                dark: 'color: #1b1e21; background-color: #d6d8d9; padding: 1.25rem; box-sizing: border-box;'
            };

        function alert(style, combo){
            if (combo)
                return `<p style="${alerts[style]}">${lang[style]}</p>`;
            return `alert alert-${style}`;
        }

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
                    this.add(item, alert(item, 'combo'), lang[item]);
            },
            onClick: function(item){
                editor.focus();
                editor.fire('saveSnapshot');
                if(item != 'normal'){
                    element.setAttributes({'class': alert(item), 'role': 'alert'});
                    for(const link of element.getElementsByTag('a').$)
                        link.setAttribute('class', 'alert-link');
                }else if(element.hasClass('alert')){
                    element.removeAttributes(['class', 'role']);
                    for(const link of element.getElementsByTag('a').$)
                        if(link.getAttribute('class') == 'alert-link')
                            link.removeAttribute('class');
                }
                editor.fire('saveSnapshot');
            },
            onOpen: function(){
                element = editor.getSelection().getStartElement();
                if(element)
                    element = element.getAscendant({'div': 1, 'p': 1}, true);

                if (element && element.hasClass('alert'))
                    this.mark(element.getAttribute('class').match(/alert-[^\s]+/i)[0].replace('alert-', ''));
            }
        });
    }
});