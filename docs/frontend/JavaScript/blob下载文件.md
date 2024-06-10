# Blob

```js
/**
* 下载单个图片
* @param {*} url 文件链接
* @param {*} fileName 文件名
*/
function downloadFile(url, fileName) {
    // 创建a标签
    function _createTagA(url) {
		var a = document.createElement('a');
		a.href = url;
      	a.download = fileName;
      	a.click();
    }
    
    const imgFormatList = ['jpeg', 'jpg', 'png'];
    const toBase64ImgStr = format => `data:image/${format};base64`;
    const toSuffix = format => `.${format}`;
	const canIDownload = imgFormatList.some(item => {
        const base64 = toBase64ImgStr(item);
        const suffix = toSuffix(item);
        // 是否是base64或以.xxx为后缀名的资源
        return url.startsWith(base64) || url.endsWith(suffix);
    });
    if (canIDownload) {
      	// 如果是base64图片或明确格式的资源
     	 _createTagA(url);
    } else {
      	// 如果是跨域文件路径
		axios
            .get(url, {
                responseType: 'blob'
            })
            .then(res => {
                var objUrl = window.URL.createObjectURL(res.data);
                 _createTagA(objUrl);
            });
    }
}
```


