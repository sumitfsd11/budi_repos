import React from 'react';
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

const Wrapper = withErrorBoundary(({ costumeSpinner, children }) => {
  const [error, resetError] = useErrorBoundary(
    // You can optionally log the error to an error reporting service
    (error, errorInfo) => console.error(error, errorInfo)
  );

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        <button onClick={resetError}>Try again</button>
      </div>
    );
  }

  return (<React.Fragment>
    <React.Suspense fallback={costumeSpinner ?? <p>Loding...</p>}>
      {children}
    </React.Suspense>
  </React.Fragment>);
});


export default Wrapper ;
