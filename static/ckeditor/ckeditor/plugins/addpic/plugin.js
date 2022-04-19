(function() {
    CKEDITOR.plugins.add('addpic', {
        init: function(editor) {
            editor.addCommand('insertTimestamp', {
                exec: function(editor) {
                    document.querySelector("#FuploadImg input").click(); /*这里自定义的上传按钮，使用element-ui上传*/
                    // editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
                }
            });
            editor.ui.addButton('addpic', {
                label: '添加图片',
                command: 'insertTimestamp',
                toolbar: 'insert',
                icon: 'plugins/addpic/icons/addpic.jpg'
            });
        }
    });
})();