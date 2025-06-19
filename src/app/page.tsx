'use client';

import { Button, Center, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Center h="100vh">
      <Stack align="center">
        <Title order={2}>Welcome to My Form App</Title>
        <Text>Click below to open the form</Text>
        <Button component={Link} href="/form">
          Go to Form
        </Button>
      </Stack>
    </Center>
  );
}
