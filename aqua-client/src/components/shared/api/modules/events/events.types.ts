export type TExpedition = {
    _id?: string;
    name: string;
    description?: string;
    expeditionDate: Date;
    expeditionLocation: string;
    expeditionType: 'RESEARCH' | 'ADVENTURE' | 'CONSERVATION' | 'EDUCATIONAL';
    expeditionStatus: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    expeditionCapacity: number;
    expeditionParticipants: string[];
  }
  