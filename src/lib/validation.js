function isEmail (value) {
  var regexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}    \.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 return regexPattern.test(value);
  }

function removeProtocol(url) {
if (!url) {
    return null; // or handle the null case as per your requirement
  }

  // Remove protocol
  var domain = url.replace(/^https?:\/\//i, '');

  return domain;
}

function isValidWebsite(url) {
  // Regular expression for a basic URL validation
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  // Test the URL against the regular expression
  return urlPattern.test(url);
}


export { isEmail,isValidWebsite,removeProtocol}
