'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useLocalStorage } from '@/utils/localStorage';
import userApiModule from '@/components/shared/api/modules/auth';
import { queryClient, useMutation } from '@/components/shared/api/core/wrapper';

const nameSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name must be alphabetic' }),
});

export default function Auth() {
  const router = useRouter();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  const form = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: '' },
  });

  const id = getLocalStorage('id') || '';

  const { mutate } = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      userApiModule.onboard({ name, id }),
    onSuccess: (data) => {
      setLocalStorage('token', data.access_token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(`Onboarding success, welcome ${data.name || 'User'}!`);
      router.push('/dashboard');
    },
    onError: (error) => {
      form.setError('root', { type: 'manual', message: error.message });
    },
  });

  const onSubmit = (values: { name: string }) => mutate(values);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md mx-auto p-8 rounded-lg max-w-md">
          <h1 className="mb-6 text-3xl font-bold text-blue-800">
            Welcome, onboard
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" type="text" {...field} />
                    </FormControl>
                    <FormMessage>
                      {fieldState.error?.message && (
                        <span className="text-red-500">
                          {fieldState.error.message}
                        </span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Get Onboard
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
