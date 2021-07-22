// jQuery plugin to display a custom jQuery File Uploader interface.
// (C) 2017 CubicleSoft.  All Rights Reserved.

(function($) {
	var EscapeHTML = function (text) {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};

		return text.replace(/[&<>"']/g, function(m) { return map[m]; });
	}

	var FormatStr = function(format) {
		var args = Array.prototype.slice.call(arguments, 1);

		return format.replace(/{(\d+)}/g, function(match, number) {
			return (typeof args[number] != 'undefined' ? args[number] : match);
		});
	};

	var GetDisplayFilesize = function(numbytes, adjustprecision, units) {
		if (numbytes == 0)  return '0 Bytes';
		if (numbytes == 1)  return '1 Byte';

		numbytes = Math.abs(numbytes);
		var magnitude, abbreviations;
		if (units && units.toLowerCase() === 'iec_formal')
		{
			magnitude = Math.pow(2, 10);
			abbreviations = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		}
		else if (units && units.toLowerCase() === 'si')
		{
			magnitude = Math.pow(10, 3);
			abbreviations = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		}
		else
		{
			magnitude = Math.pow(2, 10);
			abbreviations = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		}

		var pos = Math.floor(Math.log(numbytes) / Math.log(magnitude));
		var result = (numbytes / Math.pow(magnitude, pos));

		return (pos == 0 || (adjustprecision && result >= 99.995) ? result.toFixed(0) : result.toFixed(2)) + ' ' + abbreviations[pos];
	};

	var DisplayPreviewDialog = function(preview, endelem) {
		var previewbackground = $('<div class="ff_fileupload_dialog_background"></div>');
		var previewclone = preview.clone(true, true).click(function(e) {
			e.stopPropagation();
		});
		var previewdialog = $('<div class="ff_fileupload_dialog_main"></div>').append(previewclone);

		var HidePreviewDialog = function() {
			$(document).off('keyup.fancy_fileupload');

			previewbackground.remove();
			endelem.focus();
		};

		$(document).on('keyup.fancy_fileupload', function(e) {
			if (e.keyCode == 27) {
				HidePreviewDialog();
			}
		});

		previewbackground.append(previewdialog).click(function() {
			HidePreviewDialog();
		});

		$('body').append(previewbackground);
		preview.focus();
	};

	var InitShowAriaLabelInfo = function(inforow) {
		inforow.find('button').hover(function() {
			var val = $(this).attr('aria-label');

			if (val)
			{
				inforow.find('.ff_fileupload_buttoninfo').text(val).removeClass('ff_fileupload_hidden');
				inforow.find('.ff_fileupload_fileinfo').addClass('ff_fileupload_hidden');
			}
		}, function() {
			inforow.find('.ff_fileupload_fileinfo').removeClass('ff_fileupload_hidden');
			inforow.find('.ff_fileupload_buttoninfo').addClass('ff_fileupload_hidden');
		});
	};

	$.fn.FancyFileUpload = function(options) {
		this.each(function() {
			var $this = $(this);

			// Remove the previous file uploader.
			if ($this.data('fancy-fileupload') && typeof($this.data('fancy-fileupload')) === 'object')
			{
				$this.removeClass('ff_fileupload_hidden');

				var data = $this.data('fancy-fileupload');

				data.form.find('input[type=file]').fileupload('destroy');
				data.form.remove();
				data.fileuploadwrap.remove();
			}
		});

		if (!$('.ff_fileupload_hidden').length)  $(document).off('drop.fancy_fileupload dragover.fancy_fileupload');

		if (typeof(options) === 'string' && options === 'destroy')  return this;

		var settings = $.extend({}, $.fn.FancyFileUpload.defaults, options);

		// Prevent default file drag-and-drop operations.
		$(document).off('drop.fancy_fileupload dragover.fancy_fileupload');
		$(document).on('drop.fancy_fileupload dragover.fancy_fileupload', function (e) {
			e.preventDefault();
		});

		// Some useful functions.
		var Translate = function(str) {
			return (settings.langmap[str] ? settings.langmap[str] : str);
		};

		// Prevent the user from leaving the page if there is an active upload.
		var activeuploads = 0;

		$(window).on('beforeunload', function(e) {
			if (activeuploads > 0)  return Translate('There is a file upload still in progress.  Leaving the page will cancel the upload.\n\nAre you sure you want to leave this page?');
		});

		// Create some extra DOM nodes for preview checking.
		var audioelem = document.createElement('audio');
		var videoelem = document.createElement('video');

		var AddFile = function(uploads, e, data) {
			var inforow = $('<tr><td class="ff_fileupload_preview"><button class="ff_fileupload_preview_image" type="button"><span class="ff_fileupload_preview_text"></span></button><div class="ff_fileupload_actions_mobile"></div></td><td class="ff_fileupload_summary"><div class="ff_fileupload_filename"></div><div class="ff_fileupload_fileinfo"></div><div class="ff_fileupload_buttoninfo ff_fileupload_hidden"></div><div class="ff_fileupload_errors ff_fileupload_hidden"></div><div class="ff_fileupload_progress_background ff_fileupload_hidden"><div class="ff_fileupload_progress_bar"></div></div></td><td class="ff_fileupload_actions"></td></tr>');
			var pos = data.files[0].name.lastIndexOf('.');
			var filename = (pos > -1 ? data.files[0].name.substring(0, pos) : data.files[0].name);
			var fileext = (pos > -1 ? data.files[0].name.substring(pos + 1).toLowerCase() : '');
			var alphanum = 'abcdefghijklmnopqrstuvwxyz0123456789';
			pos = (fileext == '' ? -1 : alphanum.indexOf(fileext.charAt(0)));
			var fileextclass = alphanum.charAt((pos > -1 ? pos : Math.floor(Math.random() * alphanum.length)));

			// Initialize necessary callback options.
			data.ff_info = {};
			data.ff_info.errors = [];
			data.ff_info.retries = 0;
			data.ff_info.retrydelay = settings.retrydelay;
			data.ff_info.uploading = false;
			data.ff_info.removewidget = false;
			data.ff_info.inforow = inforow;
			data.ff_info.displayfilesize = GetDisplayFilesize(data.files[0].size, settings.adjustprecision, settings.displayunits);
			data.context = inforow;

			// A couple of functions for handling actions.
			var StartUpload = function(e) {
				e.preventDefault();

				// Set filename.
				if (settings.edit && !data.ff_info.errors.length)
				{
					var fileinput = inforow.find('.ff_fileupload_filename input');
					if (fileinput.length)
					{
						var newfilename = fileinput.val();
						if (fileext != '')  newfilename += '.' + fileext;

						inforow.find('.ff_fileupload_filename').text(newfilename);
						data.files[0].uploadName = newfilename;
					}
				}

				// Remove start upload buttons.
				inforow.find('button.ff_fileupload_start_upload').remove();

				// Reset hover status.
				inforow.find('.ff_fileupload_fileinfo').removeClass('ff_fileupload_hidden');
				inforow.find('.ff_fileupload_buttoninfo').addClass('ff_fileupload_hidden');

				// Set the status.
				inforow.find('.ff_fileupload_fileinfo').text(data.ff_info.displayfilesize + ' | ' + Translate('Starting upload...'));

				// Display progress bar.
				inforow.find('.ff_fileupload_progress_background').removeClass('ff_fileupload_hidden');

				// Alter remove buttons.
				inforow.find('button.ff_fileupload_remove_file').attr('aria-label', Translate('Cancel upload and remove from list'));

				// Begin the actual upload.
				var SubmitUpload = function() {
					activeuploads++;
					data.ff_info.uploading = true;
					data.submit();
				};

				if (settings.startupload)  settings.startupload.call(inforow, SubmitUpload, e, data);
				else  SubmitUpload();
			};

			var RemoveFile = function(e) {
				e.preventDefault();

				if (data.ff_info.uploading)
				{
					if (!confirm(Translate('This file is currently being uploaded.\n\nStop the upload and remove the file from the list?')))  return;

					data.ff_info.removewidget = true;
					data.abort();
				}
				else
				{
					inforow.remove();

					delete data.ff_info;
				}
			};

			data.ff_info.RemoveFile = function() {
				if (data.ff_info.uploading)
				{
					data.ff_info.removewidget = true;
					data.abort();
				}
				else
				{
					inforow.remove();

					delete data.ff_info;
				}
			};

			// Thumbnail preview.
			var haspreview = false;
			var preview;
			var hasimage = false;
			if (URL && URL.createObjectURL)
			{
				var url = URL.createObjectURL(data.files[0]);
				if (url)
				{
					if (data.files[0].type === 'image/gif' || data.files[0].type === 'image/jpeg' || data.files[0].type === 'image/png')
					{
						inforow.find('.ff_fileupload_preview_image').css('background-image', 'url("' + url + '")');

						haspreview = true;
						preview = $('<img>').attr('src', url);
						hasimage = true;
					}
					else if (data.files[0].type.lastIndexOf('audio/', 0) > -1 && audioelem.canPlayType && audioelem.canPlayType(data.files[0].type))
					{
						haspreview = true;
						preview = $('<audio>').attr('src', url).prop('controls', true);
					}
					else if (data.files[0].type.lastIndexOf('video/', 0) > -1 && videoelem.canPlayType && videoelem.canPlayType(data.files[0].type))
					{
						haspreview = true;
						preview = $('<video>').attr('src', url).prop('controls', true);
					}
				}
			}

			if (haspreview)
			{
				inforow.find('.ff_fileupload_preview_image').addClass('ff_fileupload_preview_image_has_preview').attr('aria-label', Translate('Preview')).click(function(e) {
					e.preventDefault();

					this.blur();
					DisplayPreviewDialog(preview, this);
				});
			}
			else
			{
				inforow.find('.ff_fileupload_preview_image').prop('disabled', true).attr('aria-label', Translate('No preview available')).click(function(e) {
					e.preventDefault();
				});
			}

			if (!hasimage)  inforow.find('.ff_fileupload_preview_image').addClass('ff_fileupload_preview_text_with_color').addClass('ff_fileupload_preview_text_' + fileextclass).text(fileext);

			// Validate inputs.
			if (settings.accept)
			{
				var found = false;
				for (var x = 0; x < settings.accept.length && !found; x++)
				{
					if (settings.accept[x] === fileext || settings.accept[x] === data.files[0].type)  found = true;
				}

				if (!found)  data.ff_info.errors.push(Translate('Invalid file extension.'));
			}

			if (settings.maxfilesize > -1 && data.files[0].size > settings.maxfilesize)  data.ff_info.errors.push(FormatStr(Translate('File is too large.  Maximum file size is {0}.'), GetDisplayFilesize(settings.maxfilesize, settings.adjustprecision, settings.displayunits)));

			// Filename text field/display.
			if (settings.edit && !data.ff_info.errors.length)
			{
				inforow.find('.ff_fileupload_filename').append($('<input>').attr('type', 'text').val(filename).keydown(function(e) {
					// Start uploading if someone presses enter.
					if (e.keyCode == 13)  StartUpload(e);
				}));
			}
			else
			{
				inforow.find('.ff_fileupload_filename').text(data.files[0].name);
			}

			// File/Upload information.
			inforow.find('.ff_fileupload_fileinfo').text(data.ff_info.displayfilesize + (hasimage && settings.edit && !data.ff_info.errors.length ? ' | .' + fileext : ''));

			// Errors.
			if (data.ff_info.errors.length)  inforow.find('.ff_fileupload_errors').html(data.ff_info.errors.join('<br>')).removeClass('ff_fileupload_hidden');

			// Action buttons.
			if (!data.ff_info.errors.length)
			{
				inforow.find('.ff_fileupload_actions').append($('<button>').addClass('ff_fileupload_start_upload').attr('type', 'button').attr('aria-label', Translate('Start uploading')).click(StartUpload));
				inforow.find('.ff_fileupload_actions_mobile').append($('<button>').addClass('ff_fileupload_start_upload').attr('type', 'button').attr('aria-label', Translate('Start uploading')).click(StartUpload));
			}

			inforow.find('.ff_fileupload_actions').append($('<button>').addClass('ff_fileupload_remove_file').attr('type', 'button').attr('aria-label', Translate('Remove from list')).click(RemoveFile));
			inforow.find('.ff_fileupload_actions_mobile').append($('<button>').addClass('ff_fileupload_remove_file').attr('type', 'button').attr('aria-label', Translate('Remove from list')).click(RemoveFile));

			// Handle button hover.
			InitShowAriaLabelInfo(inforow);

			// Improve progress bar performance during upload.
			data.ff_info.fileinfo = inforow.find('.ff_fileupload_fileinfo');
			data.ff_info.progressbar = inforow.find('.ff_fileupload_progress_bar');

			uploads.append(inforow);

			if (settings.added)  settings.added.call(inforow, e, data);
		};

		var UploadProgress = function(e, data) {
			var progress = (data.total < 1 ? 0 : data.loaded / data.total * 100);

			data.ff_info.fileinfo.text(FormatStr(Translate('{0} of {1} | {2}%'), GetDisplayFilesize(data.loaded, settings.adjustprecision, settings.displayunits), data.ff_info.displayfilesize, progress.toFixed(0)));
			data.ff_info.progressbar.css('width', progress + '%');

			if (settings.continueupload && settings.continueupload.call(data.ff_info.inforow, e, data) === false)  data.abort();
		};

		var UploadFailed = function(e, data) {
			if (data.errorThrown !== 'abort' && data.errorThrown !== 'failed_with_msg' && data.uploadedBytes < data.files[0].size && data.ff_info.retries < settings.retries)
			{
				data.ff_info.fileinfo.text(FormatStr(Translate('{0} | Network error, retrying in a moment...'), data.ff_info.displayfilesize));

				setTimeout(function() {
					data.data = null;
					data.submit();
				}, data.ff_info.retrydelay);

				data.ff_info.retries++;
				data.ff_info.retrydelay *= 2;

				return;
			}

			activeuploads--;
			data.ff_info.uploading = false;

			if (settings.uploadcancelled)  settings.uploadcancelled.call(data.ff_info.inforow, e, data);

			if (data.ff_info.removewidget)
			{
				data.ff_info.inforow.remove();

				delete data.ff_info;
			}
			else
			{
				// Set the error info.
				if (data.errorThrown === 'abort')  data.ff_info.errors.push(Translate('The upload was cancelled.'));
				else if (data.errorThrown === 'failed_with_msg')  data.ff_info.errors.push(FormatStr(Translate('The upload failed.  {0} ({1})'), EscapeHTML(data.result.error), EscapeHTML(data.result.errorcode)));
				else  data.ff_info.errors.push(Translate('The upload failed.'));
				data.ff_info.inforow.find('.ff_fileupload_errors').html(data.ff_info.errors.join('<br>')).removeClass('ff_fileupload_hidden');

				// Hide the progress bar.
				data.ff_info.inforow.find('.ff_fileupload_progress_background').addClass('ff_fileupload_hidden');

				// Alter remove buttons.
				data.ff_info.inforow.find('button.ff_fileupload_remove_file').attr('aria-label', Translate('Remove from list'));
			}
		};

		var UploadDone = function(e, data) {
			if (!data.result.success)
			{
				if (typeof(data.result.error) !== 'string')  data.result.error = Translate('The server indicated that the upload was not successful.  No additional information available.');
				if (typeof(data.result.errorcode) !== 'string')  data.result.errorcode = Translate('server_response');

				data.errorThrown = 'failed_with_msg';
				data.ff_info.removewidget = false;

				UploadFailed(e, data);

				return;
			}

			activeuploads--;
			data.ff_info.uploading = false;

			if (settings.uploadcompleted)  settings.uploadcompleted.call(data.ff_info.inforow, e, data);

			if (data.ff_info.removewidget)
			{
				data.ff_info.inforow.remove();

				delete data.ff_info;
			}
			else
			{
				// Set the status.
				data.ff_info.inforow.find('.ff_fileupload_fileinfo').text(data.ff_info.displayfilesize + ' | ' + Translate('Upload completed'));

				// Hide the progress bar.
				data.ff_info.inforow.find('.ff_fileupload_progress_background').addClass('ff_fileupload_hidden');

				// Alter remove buttons.
				data.ff_info.inforow.find('button.ff_fileupload_remove_file').attr('aria-label', Translate('Remove from list'));
			}
		};

		var UploadChunkDone = function(e, data) {
			// Reset retries for successful chunked uploads.
			data.ff_info.retries = 0;
			data.ff_info.retrydelay = settings.retrydelay;

			if (!data.result.success)  data.abort();
		};


		return this.each(function() {
			var $this = $(this);

			// Calculate the action URL.
			if (settings.url === '')
			{
				var url = $this.closest('form').attr('action');
				if (url)  settings.url = url;
			}

			// Create a separate, hidden form on the page for handling file uploads.
			var form = $('<form>').addClass('ff_fileupload_hidden').attr({
				'action' : settings.url,
				'method' : 'post',
				'enctype' : 'multipart/form-data'
			});
			$('body').append(form);

			// Append hidden input elements.
			for (var x in settings.params)
			{
				if (settings.params.hasOwnProperty(x))
				{
					var input = $('<input>').attr({
						'type' : 'hidden',
						'name' : x,
						'value' : settings.params[x]
					});

					form.append(input);
				}
			}

			// Append a file input element.
			var fileinputname = $this.attr('name');
			var fileinput = $('<input>').attr({
				'type' : 'file',
				'name' : (fileinputname ? fileinputname : 'file')
			});
			if ($this.prop('multiple'))  fileinput.prop('multiple', true);

			// Process the accepted file extensions.
			if ($this.attr('accept'))
			{
				fileinput.attr('accept', $this.attr('accept'));

				if (!settings.accept)
				{
					var accept = $this.attr('accept').split(',');

					settings.accept = [];
					for (var x = 0; x < accept.length; x++)
					{
						var opt = $.trim(accept[x]).toLowerCase();
						settings.accept.push(opt.indexOf('/') < 0 && opt.lastIndexOf('.') > -1 ? opt.substring(opt.lastIndexOf('.') + 1) : opt);
					}
				}
			}

			form.append(fileinput);

			// Insert the widget wrapper.
			var fileuploadwrap = $('<div>').addClass('ff_fileupload_wrap');
			$this.after(fileuploadwrap);

			// Insert a new dropzone.  Using a button allows for standard keyboard and mouse navigation to the element.  The wrapper is for paste support.
			var dropzonewrap = $('<div>').addClass('ff_fileupload_dropzone_wrap');
			var dropzone = $('<button>').addClass('ff_fileupload_dropzone').attr('type', 'button').attr('aria-label', Translate('Browse, drag-and-drop, or paste files to upload'));
			dropzonewrap.append(dropzone);
			fileuploadwrap.append(dropzonewrap);
			dropzone.on('click.fancy_fileupload', function(e) {
				e.preventDefault();

				form.find('input[type=file]').click();
			});

			// Add a table to track unprocessed and in-progress uploads.
			var uploads = $('<table>').addClass('ff_fileupload_uploads');
			fileuploadwrap.append(uploads);

			// Hide the starting element.
			$this.addClass('ff_fileupload_hidden');

			// Initialize jQuery File Upload using the hidden form and visible dropzone.
			var baseoptions = {
				url: url,
				dataType: 'json',
				pasteZone: dropzonewrap,
				limitConcurrentUploads: 2
			};

			// Immutable options.
			var immutableoptions = {
				singleFileUploads: true,
				dropZone: dropzone,
				add: function(e, data) { AddFile(uploads, e, data) },
				progress: UploadProgress,
				fail: UploadFailed,
				done: UploadDone,
				chunkdone: UploadChunkDone
			};

			// The user interface requires certain options to be set correctly.
			fileinput.fileupload($.extend(baseoptions, settings.fileupload, immutableoptions));

			// Save necessary information in case the uploader is destroyed later.
			$this.data('fancy-fileupload', {
				'fileuploadwrap' : fileuploadwrap,
				'form' : form
			});
		});
	}

	$.fn.FancyFileUpload.defaults = {
		'url' : '',
		'params' : {},
		'edit' : true,
		'maxfilesize' : -1,
		'accept' : null,
		'displayunits' : 'iec_windows',
		'adjustprecision' : true,
		'retries' : 5,
		'retrydelay' : 500,
		'added' : null,
		'startupload' : null,
		'continueupload' : null,
		'uploadcancelled' : null,
		'uploadcompleted' : null,
		'fileupload' : {},
		'langmap' : {}
	};
}(jQuery));