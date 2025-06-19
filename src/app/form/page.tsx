'use client'

import { Flex, Paper, Title, Divider, Stack, TextInput, NumberInput, Button, Group, Box } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from '@/app/lib/validation';
import { IconUser, IconAt, IconHash } from '@tabler/icons-react';

export default function FormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('✅ Form Submitted:', data);
    reset();
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: '100vh' }}
      px="sm"
      bg="gray.1"
    >
      <Box maw={420} w="100%">
        <Paper shadow="xl" radius="lg" p="lg" withBorder>
          <Title order={2} ta="center" mb="sm">
            Evaire Analytics
          </Title>
          <Divider my="sm" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Fist Name"
                // placeholder="Sabin Ghimire"
                leftSection={<IconUser size={18} />}
                radius="md"
                size="md"
                {...register('firstname')}
                error={errors.firstname?.message}
              />

              <TextInput
                label="Last Name"
                leftSection={<IconUser size={18} />}
                radius="md"
                size="md"
                {...register('secondname')}
                error={errors.secondname?.message}
              />

              <TextInput
                label="Email Address"
                // placeholder="you@example.com"
                leftSection={<IconAt size={18} />}
                radius="md"
                size="md"
                {...register('email')}
                error={errors.email?.message}
              />

              <NumberInput
                label="Your Age"
                // placeholder="e.g. 21"
                leftSection={<IconHash size={18} />}
                radius="md"
                size="md"
                error={errors.age?.message}
                onChange={(value) => setValue('age', Number(value))}
              />

              <Group grow>
                <Button
                  type="submit"
                  radius="xl"
                  size="md"
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue' }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  radius="xl"
                  size="md"
                  variant="default"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Flex>
  );
}
