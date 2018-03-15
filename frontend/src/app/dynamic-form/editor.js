/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
import ImagecaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImagestylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImagetoolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

export default class Editor extends ClassicEditorBase {}

Editor.build = {
    plugins: [
        EssentialsPlugin,
        BoldPlugin,
        ItalicPlugin,
        ImagePlugin,
        ImagecaptionPlugin,
        ImagestylePlugin,
        ImagetoolbarPlugin,
        ParagraphPlugin,
    ],
    config: {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'imageUpload',
                'blockQuote',
                'undo',
                'redo'
            ]
        },
        image: {
            toolbar: [
                '|',
                'imageTextAlternative'
            ]
        },
        language: 'en'
    }
};