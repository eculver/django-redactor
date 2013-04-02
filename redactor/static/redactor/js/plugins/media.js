/**
 * Redactor Media Plugin.
 *
 * The media plugin provides editors the ability to select and insert HTML5
 * audio and video markup into editor content.
 *
 * API:
 *
 * TODO
 */


if (typeof window.RedactorPlugins === 'undefined') { var RedactorPlugins = {}; }

RedactorPlugins.media = {

    _audios: {},
    _videos: {},

    AUDIO_TPL: '{{#if src}}<audio src="{{src}}" controls="control" preload="none" width="400" height="40"></audio>{{else}}{{{embed_object}}}{{/if}}',
    VIDEO_TPL: '{{#if src}}<video src="{{src}}" controls="control" preload="none"></video>{{else}}{{{embed_object}}}{{/if}}',
    LIST_TPL: '<ul class="redactor-media">{{{items}}}</ul>',
    AUDIO_ITEM_TPL: '<li class="insertable-audio" data-audio-id="{{id}}"><img src="{{thumb}}"><a href="#">{{name}}</a></li>',
    VIDEO_ITEM_TPL: '<li class="insertable-video" data-video-id="{{id}}"><img src="{{thumb}}"><a href="#">{{name}}</a></li>',
    INSERT_AUDIO_TPL: [
        '<div id="redactor_modal_content">Loading...</div>',
        '<div id="redactor_modal_footer">',
            '<a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">Close</a>',
        '</div>'
    ].join(''),
    INSERT_VIDEO_TPL: [
        '<div id="redactor_modal_content">Loading...</div>',
        '<div id="redactor_modal_footer">',
            '<a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">Close</a>',
        '</div>'
    ].join(''),

    _template: function (tpl) {
        return window.Handlebars.compile(this[tpl]);
    },

    init: function () {
        // add buttons
        this.removeBtn('video');

        this.addBtnAfter('image', 'audio', 'Insert Audio', $.proxy(this.selectAudio, this));
        this.addBtnAfter('audio', 'video', 'Insert Video', $.proxy(this.selectVideo, this));

        $('body').on('click', '.insertable-audio', $.proxy(this.insertAudio, this));
        $('body').on('click', '.insertable-video', $.proxy(this.insertVideo, this));
    },

    selectAudio: function () {
        // show modal
        this.modalInit('Select Audio', this.INSERT_AUDIO_TPL, 500, $.proxy(this.loadAudio, this));
    },

    selectVideo: function () {
        // show modal
        this.modalInit('Select Video', this.INSERT_VIDEO_TPL, 500, $.proxy(this.loadVideo, this));
    },

    loadAudio: function () {
        var self = this;

        // get selectable audios
        $.getJSON(this.opts.audioGetJson, function (data) {
            var content = '';
            $.each(data, function (idx, val) {
                content = content + self._template('AUDIO_ITEM_TPL')(val);
                self._audios[val.id] = val;
            });
            $('#redactor_modal_content').html(self._template('LIST_TPL')({'items': content}));
        });
    },

    loadVideo: function () {
        var self = this;

        // get selectable videos
        $.getJSON(this.opts.videoGetJson, function (data) {
            var content = '';
            $.each(data, function (idx, val) {
                content = content + self._template('VIDEO_ITEM_TPL')(val);
                self._videos[val.id] = val;
            });
            $('#redactor_modal_content').html(self._template('LIST_TPL')({'items': content}));
        });
    },

    insertAudio: function (e) {
        var id = $(e.currentTarget).attr('data-audio-id'),
            audio = this._audios[id],
            node = $(this._template('AUDIO_TPL')(audio)).get(0);
        this.insertNodeAtCaret(node);
        this.modalClose();
    },

    insertVideo: function (e) {
        var id = $(e.currentTarget).attr('data-video-id'),
            video = this._videos[id],
            node = $(this._template('VIDEO_TPL')(video)).get(0);
        this.insertNodeAtCaret(node);
        this.modalClose();
    }
};
