'use client';

import { Container, Title, Text, Button, Center, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import UserTable from '../components/usertable/UserTable';

export default function HomePage() {
  const router = useRouter();

  return (
    <Container size="md" py="xl">
      <Center style={{ minHeight: '100vh', flexDirection: 'column' }}>
        <Stack gap="md" align="center">
          <Title order={1} ta="center">
            Welcome to Evaire Analytics
          </Title>
          <Text c="dimmed" ta="center">
            Thank you for submitting the form. You’ve reached the home page.
          </Text>

          <UserTable />

          <Button
            radius="xl"
            size="md"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            onClick={() => router.push('/')}
          >
            Go Back to Form
          </Button>

        </Stack>
      </Center>
    </Container>
  );
}
