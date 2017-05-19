//downloadUtil
angular.module('appModule')
    .factory('downloadUtil', ['$http', function ($http) {
        var handleError = function (err, log) {
            var log = ["attachmentUploader Error: ", log || err].join("");
            console.log(log);
        };
        var httpDownload = function (url, filename) {
            $http.get(url, {responseType: 'arraybuffer'})
                .success(function (data, status, headers) {

                    var octetStreamMime = 'application/octet-stream';
                    var success = false;

                    headers = headers();
                    var fname = filename || headers['x-filename'] || 'download.bin';
                    var contentType = headers['content-type'] || octetStreamMime;

                    try {
                        // Try using msSaveBlob if supported
                        var blob = new Blob([data], {type: contentType});
                        if (navigator.msSaveBlob) {
                            navigator.msSaveBlob(blob, fname);
                            success = true;
                        }
                        else {
                            // Try using other saveBlob implementations, if available
                            var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                            if (saveBlob) {
                                saveBlob(blob, fname);
                                success = true;
                            }
                        }
                    } catch (ex) {
                        console.log("Download link method with saveBlob with the following exception: " + ex);
                    }

                    if (!success) {
                        var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                        if (urlCreator) {
                            var link = document.createElement('a');
                            if ('download' in link) {
                                try {
                                    var blob = new Blob([data], {type: contentType});
                                    var url = urlCreator.createObjectURL(blob);
                                    link.setAttribute('href', url);
                                    link.setAttribute("download", filename);

                                    var event = document.createEvent('MouseEvents');
                                    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                    link.dispatchEvent(event);
                                    success = true;

                                } catch (ex) {
                                    console.log("Download link method with simulated click failed with the following exception: " + ex);
                                }
                            }

                            if (!success) {
                                // Fallback to window.location method
                                try {
                                    // Prepare a blob URL
                                    // Use application/octet-stream when using window.location to force download
                                    console.log("Trying download link method with window.location ...");
                                    var blob = new Blob([data], {type: octetStreamMime});
                                    var url = urlCreator.createObjectURL(blob);
                                    window.location = url;
                                    console.log("Download link method with window.location succeeded");
                                    success = true;
                                } catch (ex) {
                                    console.log("Download link method with window.location failed with the following exception:");
                                    console.log(ex);
                                }
                            }
                        }
                    }

                    if (!success) {
                        console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                        window.open(url, '_blank', '');
                    }
                })
                .error(function (data, status) {
                    handleError("文件下载失败.", data);
                });
        };

        return {
            httpDownload: httpDownload
        };
        //end of function
    }]);
//end of service