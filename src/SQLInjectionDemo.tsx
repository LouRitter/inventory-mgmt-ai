import React, { FC, useState, FormEvent } from 'react';

const SQLInjectionDemo: FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // WARNING: This is intentionally vulnerable code.
    // Concatenating user input directly into a SQL query string is unsafe.
    const unsafeQuery = `SELECT * FROM users WHERE username = '${userInput}'`;
    setQuery(unsafeQuery);
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>SQL Injection Demo</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem' }}>
          Generate Query
        </button>
      </form>
      {query && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Vulnerable SQL Query:</h3>
          <pre>{query}</pre>
        </div>
      )}
    </div>
  );
};

export default SQLInjectionDemo;
