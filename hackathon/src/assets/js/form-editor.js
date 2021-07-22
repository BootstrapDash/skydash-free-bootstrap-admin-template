$(function() {
	'use strict'
	var icons = Quill.import('ui/icons');
	icons['bold'] = '<i class="la la-bold" aria-hidden="true"><\/i>';
	icons['italic'] = '<i class="la la-italic" aria-hidden="true"><\/i>';
	icons['underline'] = '<i class="la la-underline" aria-hidden="true"><\/i>';
	icons['strike'] = '<i class="la la-strikethrough" aria-hidden="true"><\/i>';
	icons['list']['ordered'] = '<i class="la la-list-ol" aria-hidden="true"><\/i>';
	icons['list']['bullet'] = '<i class="la la-list-ul" aria-hidden="true"><\/i>';
	icons['link'] = '<i class="la la-link" aria-hidden="true"><\/i>';
	icons['image'] = '<i class="la la-image" aria-hidden="true"><\/i>';
	icons['video'] = '<i class="la la-film" aria-hidden="true"><\/i>';
	icons['code-block'] = '<i class="la la-code" aria-hidden="true"><\/i>';
	var toolbarOptions = [
		[{
			'header': [1, 2, 3, 4, 5, 6, false]
		}],
		['bold', 'italic', 'underline', 'strike'],
		[{
			'list': 'ordered'
		}, {
			'list': 'bullet'
		}],
		['link', 'image', 'video']
	];
	var quill = new Quill('#quillEditor', {
		modules: {
			toolbar: toolbarOptions
		},
		theme: 'snow'
	});
	var quillModal = new Quill('#quillEditorModal', {
		modules: {
			toolbar: toolbarOptions
		},
		theme: 'snow'
	});
	var quillModal2 = new Quill('#quillEditorModal2', {
		modules: {
			toolbar: toolbarOptions
		},
		theme: 'snow'
	});
	var toolbarInlineOptions = [
		['bold', 'italic', 'underline'],
		[{
			'header': 1
		}, {
			'header': 2
		}, 'blockquote'],
		['link', 'image', 'code-block'],
	];
	var quillInline = new Quill('#quillInline', {
		modules: {
			toolbar: toolbarInlineOptions
		},
		bounds: '#quillInline',
		scrollingContainer: '#scrolling-container',
		placeholder: 'Write something...',
		theme: 'bubble'
	});
	new PerfectScrollbar('#scrolling-container', {
		suppressScrollX: true
	});
});