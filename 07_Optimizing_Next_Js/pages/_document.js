import Document, { Html, Head, Main, NextScript } from 'next/document';

// Allows to add another meta data for page, that you cant add in next Head component
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          {/* We declare div that will be render on all pages */}
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
