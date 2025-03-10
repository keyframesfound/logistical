import React from 'react';

function InventoryList() {
  // Dummy data for items not returned
  const items = [
    { id: 1, name: 'Item A', detail: 'Some details' },
    { id: 2, name: 'Item B', detail: 'Some details' },
  ];

  return (
    <div style={styles.container}>
      <h2>Inventory (Not Returned)</h2>
      <ul style={styles.list}>
        {items.map(item => (
          <li key={item.id} style={styles.item}>
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  item: {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  }
};

export default InventoryList;
