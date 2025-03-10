wimport React, { useState } from 'react';
import QrReader from 'react-qr-reader';

function QRScanner() {
  const [scanResult, setScanResult] = useState('');
  const handleScan = data => {
    if (data) setScanResult(data);
  };
  const handleError = err => {
    console.error(err);
  };

  return (
    <div style={styles.container}>
      <h2>QR Scanner</h2>
      <div style={styles.scanner}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      { scanResult && <p>Scanned Data: {scanResult}</p> }
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center'
  },
  scanner: {
    width: '300px',
    margin: '0 auto'
  }
};

export default QRScanner;
