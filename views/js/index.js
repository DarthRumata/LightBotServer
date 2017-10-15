$( () => {
  $('#firstFileInput').fileinput({
    theme: 'fa',
    allowedFileExtensions: ['zip'],
    hiddenThumbnailContent: true,
    showClose: false,
    previewFileIcon: '',
    uploadUrl: '/uploadBot/first',
    initialPreviewFileType: 'other',
    hideThumbnailContent: true,
    dropZoneEnabled: false,
    fileActionSettings: {showZoom: false, showDelete: true}
  });
});
