
// Remove import, use global fetch (Node 18+)
// import fetch from 'node-fetch'; 

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('--- Starting API Test ---');

    // 1. Create a List
    console.log('1. Creating List...');
    const listRes = await fetch(`${BASE_URL}/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test List' })
    });
    
    if (!listRes.ok) throw new Error(`Create List failed: ${listRes.statusText}`);
    const list = await listRes.json();
    console.log('   List Created:', list.id, list.name);

    // 2. Add Item to List
    console.log('2. Adding Item...');
    const itemRes = await fetch(`${BASE_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Test Item', listId: list.id })
    });

    if (!itemRes.ok) throw new Error(`Create Item failed: ${itemRes.statusText}`);
    const item = await itemRes.json();
    console.log('   Item Created:', item.id, item.text);

    // 3. Get Items
    console.log('3. Fetching Items...');
    const getItemsRes = await fetch(`${BASE_URL}/items?listId=${list.id}`);
    const items = await getItemsRes.json();
    console.log(`   Fetched ${items.length} items`);
    if (items.length !== 1) throw new Error('Item count mismatch');

    // 4. Delete List (and items)
    console.log('4. Deleting List...');
    const deleteRes = await fetch(`${BASE_URL}/lists/${list.id}`, {
      method: 'DELETE'
    });
    if (!deleteRes.ok) throw new Error('Delete List failed');
    console.log('   List Deleted');

    console.log('--- API Test Passed ---');
  } catch (error) {
    console.error('--- API Test Failed ---');
    console.error(error);
    process.exit(1);
  }
}

testAPI();
