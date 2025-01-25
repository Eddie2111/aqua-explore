'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useLocalStorage } from '@/utils/localStorage';

import userApiModule from '@/components/shared/api/modules/auth';
import { queryClient, useMutation } from '@/components/shared/api/core/wrapper';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const nameSchema = z.object({
  name: z
  .string()
  .min(1, { message: 'Name is required' })
  .regex(/^[a-z A-Z]+$/, {message: 'Name must be alphabetic'})
});

export const nameSchemaResolver = zodResolver(nameSchema);
export type TNameSchema = z.infer<typeof nameSchema>;


export default function Auth() {
  const router = useRouter();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const form = useForm<TNameSchema>({
    resolver: nameSchemaResolver,
    defaultValues: {
      name: '',
    },
  });
  const id = getLocalStorage('id') ?? "";

  const mutation = useMutation<any, Error, TNameSchema>({
    mutationFn: (data) => userApiModule.onboard({name: data.name, id:id}),
    onSuccess: (data) => {
      setLocalStorage('token', data.access_token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(
        `Onboarding success, welcome ${data.name}!`,
      );
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Login error:', error);
      form.setError('root', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  function onSubmit(values: TNameSchema) {
    mutation.mutate(values);
    console.log(values);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow mx-auto px-4 py-8 container">
        <div className="bg-white shadow-md mx-auto p-8 rounded-lg max-w-md">
          <h1 className="mb-6 font-bold text-3xl text-blue-800">Welcome, onboard</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-bold text-gray-700 text-md">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the name that will publicly visible.
                      </FormDescription>
                      <FormMessage>
                        {fieldState.error && (
                          <span className="text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md w-full text-white transition-colors"
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
