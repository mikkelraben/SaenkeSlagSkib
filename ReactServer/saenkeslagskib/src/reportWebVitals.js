const reportWebVitals = onPerfEntry => { //onPerfEntry is a callback function
  if (onPerfEntry && onPerfEntry instanceof Function) { //if onPerfEntry is a function
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => { //import web-vitals
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
