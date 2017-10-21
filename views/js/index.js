let inputOptions = {
  theme: 'fa',
  allowedFileExtensions: ['zip'],
  hiddenThumbnailContent: true,
  showClose: false,
  previewFileIcon: '',
  initialPreviewFileType: 'other',
  hideThumbnailContent: true,
  dropZoneEnabled: false,
  fileActionSettings: {showZoom: false, showDelete: true},
  showDelete: false,
  showUpload: false,
  showRemove: false,
  uploadAsync: false,
  overwriteInitial: true
};

$( () => {
  const firstOptions = Object.assign({}, inputOptions);
  firstOptions.uploadUrl = '/uploadBot/first';
  $('#firstFileInput').fileinput(firstOptions);
  const secondOptions = Object.assign({}, inputOptions);
  secondOptions.uploadUrl = '/uploadBot/second';
  $('#secondFileInput').fileinput(secondOptions);
});
