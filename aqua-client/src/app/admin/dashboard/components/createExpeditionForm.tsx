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
import { Textarea } from '@/components/ui/textarea';

import { queryClient, useMutation } from '@/components/shared/api/core/wrapper';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import expeditionApiModule from '@/components/shared/api/modules/events/events.api';
import { TExpedition } from '@/components/shared/api/modules/events/events.types';

const expeditionSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Expedition name is required' })
    .max(100, { message: 'Expedition name must be less than 100 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  expeditionDate: z.coerce.date(),
  expeditionStatus: z.enum([
    'PLANNED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
  ]),
  expeditionType: z.enum([
    'RESEARCH',
    'ADVENTURE',
    'CONSERVATION',
    'EDUCATIONAL',
  ]),
  expeditionLocation: z
    .string()
    .min(1, { message: 'Location is required' })
    .max(100, { message: 'Location must be less than 100 characters' }),
  expeditionDuration: z.coerce
    .number()
    .min(1, { message: 'Duration must be at least 1 day' }),
  expeditionCost: z.coerce
    .number()
    .min(0, { message: 'Cost cannot be negative' }),
  expeditionCapacity: z.coerce
    .number()
    .min(1, { message: 'Capacity must be at least 1' }),
  expeditionParticipants: z.array(z.any()),
});

export type TExpeditionSchema = z.infer<typeof expeditionSchema>;
export const expeditionSchemaResolver = zodResolver(expeditionSchema);

export default function ExpeditionCreationForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const router = useRouter();
  console.log(onSuccess);
  const form = useForm<TExpeditionSchema>({
    resolver: expeditionSchemaResolver,
    defaultValues: {
      name: '',
      description: '',
      expeditionDate: new Date(),
      expeditionStatus: 'PLANNED',
      expeditionType: 'RESEARCH',
      expeditionLocation: '',
      expeditionDuration: 1,
      expeditionCost: 0,
      expeditionCapacity: 1,
      expeditionParticipants: [],
    },
  });

  const mutation = useMutation<TExpedition, Error, TExpeditionSchema>({
    mutationFn: (data) => expeditionApiModule.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['expeditions'] });
      toast.success(`Expedition "${data.name}" created successfully!`);
      router.push('/expeditions');
    },
    onError: (error) => {
      console.error('Expedition creation error:', error);
      form.setError('root', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  function onSubmit(values: TExpeditionSchema) {
    values.expeditionParticipants = [];
    mutation.mutate(values);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow mx-auto px-4 py-8 container">
        <div className="bg-white shadow-md mx-auto p-8 rounded-lg max-w-2xl">
          <h1 className="mb-6 font-bold text-3xl text-blue-800">
            Create New Expedition
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Expedition Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Arctic Research Expedition"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a unique name for your expedition
                    </FormDescription>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description of the expedition"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a comprehensive overview of the expedition
                    </FormDescription>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expeditionDate"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Expedition Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split('T')[0]
                              : field.value
                          }
                          onChange={(e) => {
                            field.onChange(new Date(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expeditionStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expedition Status</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full p-2 border rounded"
                        >
                          {[
                            'PLANNED',
                            'IN_PROGRESS',
                            'COMPLETED',
                            'CANCELLED',
                          ].map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expeditionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expedition Type</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full p-2 border rounded"
                        >
                          {[
                            'RESEARCH',
                            'ADVENTURE',
                            'CONSERVATION',
                            'EDUCATIONAL',
                          ].map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expeditionLocation"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Expedition Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Arctic Circle" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expeditionDuration"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Duration (Days)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expeditionCost"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Expedition Cost ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expeditionCapacity"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Participant Capacity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md w-full text-white transition-colors"
              >
                Create Expedition
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
