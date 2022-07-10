import Link from 'next/link';
import React from 'react';

const PageNotFound = () => {
  return (
    <div>
      <h1>PageNotFound</h1> <h3>Check if you are in the correct page.</h3>
      <Link href="/">Click here to go to landing</Link>
    </div>
  );
};

export default PageNotFound;
