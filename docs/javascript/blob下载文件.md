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

    if (
      	url.includes('data:image/jpeg;base64') ||
      	url.includes('data:image/png;base64')
    ) {
      	// 如果是base64图片
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

