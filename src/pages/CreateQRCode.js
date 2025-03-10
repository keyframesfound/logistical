import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function CreateQRCode() {
  const [text, setText] = useState('');
  return (
    <div style={styles.container}>
      <h2>Create QR Code</h2>
      <input
        type="text"
        placeholder="Enter item details"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />
      {text && (
        <div style={styles.qrWrapper}>
          <QRCode value={text} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center'
  },
  input: {
    padding: '10px',
    width: '80%',
    fontSize: '16px',
    margin: '20px 0'
  },
  qrWrapper: {
    display: 'inline-block',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginTop: '20px'
  }
};

export default CreateQRCode;
