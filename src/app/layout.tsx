import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Form App',
  description: 'A form using Mantine + RHF + Zod',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* <ColorSchemeScript defaultColorScheme="light" /> */}
      </head>
      <body>
        <MantineProvider defaultColorScheme="light" withCssVariables>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
