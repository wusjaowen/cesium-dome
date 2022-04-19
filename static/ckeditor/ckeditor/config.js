/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.language = 'zh-cn'; //指定语言，不然有些浏览器会自动检测语言，会报错
    // config.uiColor = '#AADC6E';
    // config.readOnly = false
    config.toolbar = 'Full';
    config.height = 500
        // config.extraPlugins = 'addpic,pasteUploadImage';
    config.allowedContent = true;
    //config.fullPage = true;
    config.extraPlugins = 'addpic';
    config.pasteFilter = null; /*保留粘贴格式*/
    config.toolbar_Full = [
        { name: 'document', items: ['Source'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'CopyFormatting', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
        { name: 'insert', items: ['addpic', 'Table', ] },
        '/',
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
    ]
};