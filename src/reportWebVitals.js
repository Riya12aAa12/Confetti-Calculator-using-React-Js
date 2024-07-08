// Define a function reportWebVitals that takes onPerfEntry as a parameter
const reportWebVitals = onPerfEntry => {
  // Check if onPerfEntry is defined and is a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each web-vitals function with onPerfEntry as parameter
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Export the reportWebVitals function as the default export
export default reportWebVitals;
