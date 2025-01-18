import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [inventory, setInventory] = useState<Array<Schema["Inventory"]["type"]>>([]);

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
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <h1>My Inventory</h1>
      <button onClick={createItem}>+ new</button>
      <ul>
        {inventory.map((item) => (
          <li key={item.ItemID}>
            {item.ItemID}
            <button onClick={() => item.ItemID && editItem(item.id, item.ItemID)}>Edit</button>
            <button onClick={() => item.ItemID && deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;