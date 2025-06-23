// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { api } from '@/app/lib/api';
// import { User } from '@/app/types/user';

// export const useUsers = () => {
//   return useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: async () => {
//       const { data } = await api.get('/users');
//       return data;
//     },
//   });
// };

// export const useCreateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (newUser: Omit<User, 'id'>): Promise<User> => {
//       const { data } = await api.post('/users', newUser);
//       return data;
//     },
//     onSuccess: (createdUser) => {
//       queryClient.setQueryData<User[]>(['users'], (old) => [
//         ...(old || []),
//         createdUser,
//       ]);
//     },
//   });
// };

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user: User): Promise<User> => {
//       const { data } = await api.put(`/users/${user.id}`, user);
//       return data;
//     },
//     onSuccess: (updatedUser) => {
//       queryClient.setQueryData<User[]>(['users'], (old) =>
//         (old || []).map((user) =>
//           user.id === updatedUser.id ? updatedUser : user
//         )
//       );
//     },
//   });
// };

// export const useDeleteUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (id: number) => {
//       await api.delete(`/users/${id}`);
//     },
//     onSuccess: (_, id) => {
//       queryClient.setQueryData<User[]>(['users'], (old) =>
//         (old || []).filter((user) => user.id !== id)
//       );
//     },
//   });
// };

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/lib/api';
import { User } from '@/app/types/user';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/users');
      return data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: Omit<User, 'id'>): Promise<User> => {
      const { data } = await api.post('/users', newUser);
      return data;
    },
    onSuccess: (createdUser) => {
      queryClient.setQueryData<User[]>(['users'], (old) => {
        const withoutDuplicate = (old || []).filter(
          (u) => u.id !== createdUser.id
        );
        return [...withoutDuplicate, createdUser];
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User): Promise<User> => {
      const { data } = await api.put(`/users/${user.id}`, user);
      return data;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User[]>(['users'], (old) =>
        (old || []).map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<User[]>(['users'], (old) =>
        (old || []).filter((user) => user.id !== id)
      );
    },
  });
};
