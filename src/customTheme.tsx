// src/customTheme.ts
import { Theme } from '@aws-amplify/ui-react';

export const customTheme: Theme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          '10': '#E6E6FA', // Lavender
          '80': '#6c4e81', // Indigo
        },
      },
      background: {
        primary: {
          value: '#E6E6FA', // Lavender
        },
      },
      font: {
        primary: {
          value: '#333333', // Dark Charcoal
        },
      },
    },
    components: {
      tabs: {
        item: {
          color: { value: '#6c4e81' }, // Indigo
          _hover: {
            color: { value: '#4B5320' }, // Darker Olive Green
          },
          _active: {
            color: { value: '#819461' }, // Dark Olive Green
            borderColor: { value: '#6B8E23' }, // Olive Drab
          },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: '#6B8E23' }, // Olive Drab
          color: { value: '#FFFFFF' }, // White
          _hover: {
            backgroundColor: { value: '#819461' }, // Dark Olive Green
            color: { value: '#FFFFE0' }, // Light Yellow
          },
          _active: {
            backgroundColor: { value: '#4B5320' }, // Darker Olive Green
          },
        },
      },
    },
  },
};
