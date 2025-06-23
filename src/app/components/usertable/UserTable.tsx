// 'use client';

// import {
//   useUsers,
//   useCreateUser,
//   useUpdateUser,
//   useDeleteUser,
// } from '@/app/hooks/useUsers';
// import {
//   Table,
//   Button,
//   TextInput,
//   Group,
//   Box,
//   Stack,
//   Loader,
// } from '@mantine/core';
// import { useState } from 'react';
// import { User } from '@/app/types/user';

// export default function UserTable() {
//   const { data: users = [], isLoading } = useUsers();
//   const { mutate: createUser } = useCreateUser();
//   const { mutate: updateUser } = useUpdateUser();
//   const { mutate: deleteUser } = useDeleteUser();

//   const [newUser, setNewUser] = useState({ name: '', email: '' });
//   const [editedUsers, setEditedUsers] = useState<Record<number, Partial<User>>>({});

//   const handleEditChange = (id: number, field: keyof User, value: string) => {
//     setEditedUsers((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
//       },
//     }));
//   };

//   const handleUpdate = (user: User) => {
//     const updates = editedUsers[user.id];
//     if (updates) {
//       updateUser({ ...user, ...updates });
//       setEditedUsers((prev) => {
//         const copy = { ...prev };
//         delete copy[user.id];
//         return copy;
//       });
//     }
//   };

//   const handleCreateUser = () => {
//     if (!newUser.name.trim() || !newUser.email.trim()) return;

//     createUser(newUser, {
//       onSuccess: () => {
//         setNewUser({ name: '', email: '' });
//       },
//     });
//   };

//   if (isLoading) return <Loader />;

//   return (
//     <Box maw={800} mx="auto">
//       <Stack>
//         <Group>
//           <TextInput
//             placeholder="Name"
//             value={newUser.name}
//             onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//           />
//           <TextInput
//             placeholder="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           />
//           <Button onClick={handleCreateUser}>Add</Button>
//         </Group>

//         <Table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => {
//               const edits = editedUsers[user.id] || {};
//               return (
//                 <tr key={user.id}>
//                   <td>
//                     <TextInput
//                       value={edits.name ?? user.name}
//                       onChange={(e) =>
//                         handleEditChange(user.id, 'name', e.target.value)
//                       }
//                     />
//                   </td>
//                   <td>
//                     <TextInput
//                       value={edits.email ?? user.email}
//                       onChange={(e) =>
//                         handleEditChange(user.id, 'email', e.target.value)
//                       }
//                     />
//                   </td>
//                   <td>
//                     <Group gap="xs">
//                       <Button color="blue" onClick={() => handleUpdate(user)}>
//                         Save
//                       </Button>
//                       <Button color="red" onClick={() => deleteUser(user.id)}>
//                         Delete
//                       </Button>
//                     </Group>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </Stack>
//     </Box>
//   );
// }

// 'use client';

// import {
//   useUsers,
//   useCreateUser,
//   useUpdateUser,
//   useDeleteUser,
// } from '@/app/hooks/useUsers';
// import {
//   Table,
//   Button,
//   TextInput,
//   Group,
//   Box,
//   Stack,
//   Loader,
// } from '@mantine/core';
// import { useState } from 'react';
// import { User } from '@/app/types/user';

// export default function UserTable() {
//   const { data: users = [], isLoading } = useUsers();
//   const { mutate: createUser } = useCreateUser();
//   const { mutate: updateUser } = useUpdateUser();
//   const { mutate: deleteUser } = useDeleteUser();

//   const [newUser, setNewUser] = useState({ name: '', email: '' });
//   const [editedUsers, setEditedUsers] = useState<Record<number, Partial<User>>>({});

//   const handleEditChange = (id: number, field: keyof User, value: string) => {
//     setEditedUsers((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
//       },
//     }));
//   };

//   const handleUpdate = (user: User) => {
//     const updates = editedUsers[user.id];
//     if (updates && (updates.name?.trim() || updates.email?.trim())) {
//       if (updates.email && !isValidEmail(updates.email)) {
//         alert('Please enter a valid email address');
//         return;
//       }

//       updateUser(
//         { ...user, ...updates },
//         {
//           onSuccess: () => {
//             setEditedUsers((prev) => {
//               const copy = { ...prev };
//               delete copy[user.id];
//               return copy;
//             });
//           },
//           onError: (error) => {
//             console.error('Update failed:', error);
//             alert('Failed to update user. Please try again.');
//           },
//         }
//       );
//     }
//   };

//   const handleCreateUser = () => {
//     if (!newUser.name.trim()) {
//       alert('Name is required');
//       return;
//     }

//     if (!newUser.email.trim()) {
//       alert('Email is required');
//       return;
//     }

//     if (!isValidEmail(newUser.email)) {
//       alert('Please enter a valid email address');
//       return;
//     }

//     createUser(
//       {
//         name: newUser.name.trim(),
//         email: newUser.email.trim(),
//       },
//       {
//         onSuccess: () => {
//           setNewUser({ name: '', email: '' });
//         },
//         onError: (error) => {
//           console.error('Create failed:', error);
//           alert('Failed to create user. Please try again.');
//         },
//       }
//     );
//   };

//   const handleCancelEdit = (userId: number) => {
//     setEditedUsers((prev) => {
//       const copy = { ...prev };
//       delete copy[userId];
//       return copy;
//     });
//   };

//   const isValidEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const hasChanges = (userId: number) => {
//     const edits = editedUsers[userId];
//     return edits && (edits.name !== undefined || edits.email !== undefined);
//   };

//   if (isLoading) return <Loader />;

//   return (
//     <Box maw={800} mx="auto">
//       <Stack>
//         <Group>
//           <TextInput
//             placeholder="Name"
//             value={newUser.name}
//             onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//             error={newUser.name.length > 0 && !newUser.name.trim() ? 'Name is required' : null}
//           />
//           <TextInput
//             placeholder="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             error={
//               newUser.email.length > 0 && !isValidEmail(newUser.email)
//                 ? 'Invalid email format'
//                 : null
//             }
//           />
//           <Button onClick={handleCreateUser} disabled={!newUser.name.trim() || !newUser.email.trim()}>
//             Add
//           </Button>
//         </Group>

//         <Table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => {
//               const edits = editedUsers[user.id] || {};
//               const currentName = edits.name !== undefined ? edits.name : user.name;
//               const currentEmail = edits.email !== undefined ? edits.email : user.email;

//               return (
//                 <tr key={user.id}>
//                   <td>
//                     <TextInput
//                       value={currentName}
//                       onChange={(e) =>
//                         handleEditChange(user.id, 'name', e.target.value)
//                       }
//                       error={
//                         edits.name !== undefined && !edits.name.trim()
//                           ? 'Name is required'
//                           : null
//                       }
//                     />
//                   </td>
//                   <td>
//                     <TextInput
//                       value={currentEmail}
//                       onChange={(e) =>
//                         handleEditChange(user.id, 'email', e.target.value)
//                       }
//                       error={
//                         edits.email !== undefined && !isValidEmail(edits.email)
//                           ? 'Invalid email'
//                           : null
//                       }
//                     />
//                   </td>
//                   <td>
//                     <Group gap="xs">
//                       <Button
//                         color="blue"
//                         onClick={() => handleUpdate(user)}
//                         disabled={!hasChanges(user.id)}
//                       >
//                         Save
//                       </Button>
//                       {hasChanges(user.id) && (
//                         <Button
//                           variant="outline"
//                           onClick={() => handleCancelEdit(user.id)}
//                         >
//                           Cancel
//                         </Button>
//                       )}
//                       <Button color="red" onClick={() => deleteUser(user.id)}>
//                         Delete
//                       </Button>
//                     </Group>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </Stack>
//     </Box>
//   );
// }


'use client';

import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from '@/app/hooks/useUsers';
import {
  Table,
  Button,
  TextInput,
  Group,
  Box,
  Stack,
  Loader,
} from '@mantine/core';
import { useState } from 'react';
import { User } from '@/app/types/user';

export default function UserTable() {
  const { data: users = [], isLoading } = useUsers();
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const [editedUsers, setEditedUsers] = useState<Record<number, Partial<User>>>({});

  const handleEditChange = (id: number, field: keyof User, value: string) => {
    setEditedUsers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = (user: User) => {
    const updates = editedUsers[user.id];
    if (updates) {
      updateUser({ ...user, ...updates });
      setEditedUsers((prev) => {
        const copy = { ...prev };
        delete copy[user.id];
        return copy;
      });
    }
  };

  const handleCreateUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    createUser(newUser, {
      onSuccess: () => {
        setNewUser({ name: '', email: '' });
      },
    });
  };

  if (isLoading) return <Loader />;

  return (
    <Box maw={800} mx="auto">
      <Stack>
        <Group>
          <TextInput
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextInput
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <Button onClick={handleCreateUser}>Add</Button>
        </Group>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const edits = editedUsers[user.id] || {};
              return (
                <tr key={user.id}>
                  <td>
                    <TextInput
                      value={edits.name ?? user.name}
                      onChange={(e) =>
                        handleEditChange(user.id, 'name', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TextInput
                      value={edits.email ?? user.email}
                      onChange={(e) =>
                        handleEditChange(user.id, 'email', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Group gap="xs">
                      <Button color="blue" onClick={() => handleUpdate(user)}>
                        Save
                      </Button>
                      <Button color="red" onClick={() => deleteUser(user.id)}>
                        Delete
                      </Button>
                    </Group>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Stack>
    </Box>
  );
}