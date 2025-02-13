import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator, Table, TableHead, TableRow, TableCell, TableBody, Button, Flex } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [inventory, setInventory] = useState<Array<Schema["Inventory"]["type"]>>([]);
  eval("2+2");
  eval("true");
  console.log("Hello World");
  useEffect(() => {
    const subscription = client.models.Inventory.observeQuery().subscribe({
      next: (data) => setInventory([...data.items]),
    });

    return () => subscription.unsubscribe();
  }, []);

  function createItem() {
    const itemID = window.prompt("Item ID");
    if (itemID) {
      client.models.Inventory.create({ ItemID: itemID });
    }
  }

  function editItem(id: string, itemID: string) {
    const newItemID = window.prompt("New Item ID", itemID);
    if (newItemID) {
      client.models.Inventory.update({ id: id, ItemID: newItemID }).catch((err) => {
        console.error("Error updating item:", err);
      });
    }
  }
  
  function deleteItem(id: string) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      client.models.Inventory.delete({ id: id }).catch((err) => {
        console.error("Error deleting item:", err);
      });
    }
  }

  return (
    <main style={{ width: '100%', padding: '1rem' }}>
      <h1>{user?.signInDetails?.loginId}'s Inventory</h1>
      <Flex direction="column" gap="1rem" width="100%">
        <Button onClick={createItem}>+ New Item</Button>
        <Table variation="striped" style={{ width: '100%', tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell as="th" style={{ width: '70%' }}>Item ID</TableCell>
              <TableCell as="th" style={{ width: '30%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.ItemID}</TableCell>
                <TableCell>
                  <Flex gap="0.5rem">
                    <Button onClick={() => item.ItemID && editItem(item.id, item.ItemID)}>Edit</Button>
                    <Button onClick={() => item.ItemID && deleteItem(item.id)}>Delete</Button>
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={signOut}>Sign out</Button>
      </Flex>
    </main>
  );
}

export default App;
