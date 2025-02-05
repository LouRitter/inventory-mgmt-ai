import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator, Tabs, TabsProps } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { customTheme } from './customTheme';

const {CustomTabs} = (props: TabsProps) => (
  <Tabs
    {...props}
    style={{
      backgroundColor: '#E6E6FA', // Lavender
      color: '#6c4e81', // Indigo
    }}
  />
);

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={customTheme}>
    <React.StrictMode>
      <Authenticator components={{ Tabs: CustomTabs }}>
        <App />
      </Authenticator>
    </React.StrictMode>
  </ThemeProvider>
);
