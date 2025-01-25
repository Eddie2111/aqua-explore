'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { TExpedition } from '@/components/shared/api/modules/events/events.types';

export default function ExpeditionList({
  expeditions,
}: {
  expeditions: TExpedition[] | null;
}) {
  if (expeditions)
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4 bg-blue-600 text-white p-2 rounded-md">
          Expedition List
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Capacity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expeditions.map((expedition) => (
              <TableRow key={expedition._id}>
                <TableCell>{expedition.name}</TableCell>
                <TableCell>
                  {new Date(expedition.expeditionDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{expedition.expeditionLocation}</TableCell>
                <TableCell>
                  <Badge variant="outline">{expedition.expeditionType}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      expedition.expeditionStatus === 'COMPLETED'
                        ? 'default'
                        : expedition.expeditionStatus === 'IN_PROGRESS'
                          ? 'secondary'
                          : expedition.expeditionStatus === 'PLANNED'
                            ? 'outline'
                            : 'destructive'
                    }
                  >
                    {expedition.expeditionStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  {expedition.expeditionParticipants.length} /{' '}
                  {expedition.expeditionCapacity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  else {
    <LoadingSpinner />;
  }
}
