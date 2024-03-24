'use client';

import { FunctionComponent, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export const DateStat: FunctionComponent = function () {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
};
