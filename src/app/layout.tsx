import '@mantine/core/styles.css';
import { Providers } from '@/app/components/providers/index';

export const metadata = {
  title: 'My App',
  description: 'Using TanStack Query, Mantine, etc.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
