import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [inventory, setInventory] = useState<Array<Schema["Inventory"]["type"]>>([]);

  useEffect(() => {
    client.models.Inventory.observeQuery().subscribe({
      next: (data) => setInventory([...data.items]),
    });
  }, []);

  function createItem() {
    client.models.Inventory.create({ ItemID: window.prompt("Item ID") });
  }

  return (
    <main>
      <h1>My Inventory</h1>
      <button onClick={createItem}>+ new</button>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>{item.ItemID}</li>
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
