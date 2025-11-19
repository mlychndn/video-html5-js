var myPlayer = document.getElementById('myPlayer');

// Check if fetch polyfill is loaded
console.log('Fetch available:', typeof fetch !== 'undefined');

const options = {
  info: {
    beacon: 'staging-bam-cell.nr-data.net',
    licenseKey: 'NRBR-53d64fae3042586d192',
    applicationID: '274145795',
  },
};

const tracker = new Html5Tracker(myPlayer, options);

console.log('Tracker initialized');
console.log('NRVIDEO config:', window.NRVIDEO);

// Monitor fetch calls to see API requests
if (typeof fetch !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = function() {
    console.log('Fetch called with:', arguments[0]);
    return originalFetch.apply(this, arguments)
      .then(function(response) {
        console.log('Fetch response:', response.status, response.statusText);
        return response;
      })
      .catch(function(error) {
        console.error('Fetch error:', error);
        throw error;
      });
  };
}

// {beacon:"staging-bam-cell.nr-data.net",errorBeacon:"staging-bam-cell.nr-data.net",licenseKey:"NRBR-53d64fae3042586d192",applicationID:"274145795",sa:1}
