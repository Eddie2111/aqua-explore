'use client';

import React from 'react';

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
import { TLoginResponse } from '@/components/shared/api/modules/auth/auth.types';

import { emailSchemaResolver } from '@/components/shared/schema/email.validation';
import type { TEmailSchema } from '@/components/shared/schema/email.validation';

export default function Auth() {
  const { setLocalStorage } = useLocalStorage();
  const form = useForm<TEmailSchema>({
    resolver: emailSchemaResolver,
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation<TLoginResponse, Error, TEmailSchema>({
    mutationFn: (data) => userApiModule.signIn(data),
    onSuccess: (data) => {
      console.log(data, 'where am I?');
      setLocalStorage('token', data.access_token);
      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
    onError: (error) => {
      console.error('Login error:', error);
      form.setError('root', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  function onSubmit(values: TEmailSchema) {
    mutation.mutate(values);
    toast.success(
      `Magic link sent to your email -> ${values.email}. Please check your inbox.`,
    );
    console.log(values);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow mx-auto px-4 py-8 container">
        <div className="bg-white shadow-md mx-auto p-8 rounded-lg max-w-md">
          <h1 className="mb-6 font-bold text-3xl text-blue-800">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-bold text-gray-700 text-md">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is where you will recieve your email.
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
                Send Magic Link
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
