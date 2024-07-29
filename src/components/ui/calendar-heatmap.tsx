'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { Calendar } from './calendar';

// type utilities
type UnionKeys<T> = T extends T ? keyof T : never;
type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
type OneOf<T extends {}[]> = {
  [K in keyof T]: Expand<
    T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>
  >;
}[number];

// types
type ClassName = string;
export type WeightedDateEntry = {
  date: Date;
  weight: number;
};

interface IDatesPerVariant {
  datesPerVariant: Date[][];
}
interface IWeightedDatesEntry {
  weightedDates: WeightedDateEntry[];
}

type VariantDatesInput = OneOf<[IDatesPerVariant, IWeightedDatesEntry]>;

type HeatmapCalendarProps = React.ComponentProps<typeof DayPicker> & {
  variantClassnames: ClassName[];
} & VariantDatesInput;

/// utility functions
function useModifiers(
  variantClassnames: ClassName[],
  datesPerVariant: Date[][]
): [Record<string, Date[]>, Record<string, string>] {
  const noOfVariants = variantClassnames.length;

  const variantLabels = [...Array(noOfVariants)].map(
    (_, idx) => `__variant${idx}`
  );

  const modifiers = variantLabels.reduce(
    (acc: Record<string, Date[]>, key, index) => {
      acc[key] = datesPerVariant[index];
      return acc;
    },
    {}
  );

  const modifiersClassNames = variantLabels.reduce(
    (acc: Record<string, string>, key, index) => {
      acc[key] = variantClassnames[index];
      return acc;
    },
    {}
  );

  return [modifiers, modifiersClassNames];
}

function categorizeDatesPerVariant(
  weightedDates: WeightedDateEntry[],
  noOfVariants: number
) {
  const sortedEntries = weightedDates.sort((a, b) => a.weight - b.weight);

  const categorizedRecord = [...Array(noOfVariants)].map(() => [] as Date[]);

  const minNumber = sortedEntries[0].weight;
  const maxNumber = sortedEntries[sortedEntries.length - 1].weight;
  const minNumbersFixed = minNumber == maxNumber ? minNumber - 1 : minNumber;
  const range = (maxNumber - minNumbersFixed) / noOfVariants;

  sortedEntries.forEach((entry) => {
    const category = Math.min(
      Math.floor((entry.weight - minNumber) / range),
      noOfVariants - 1
    );
    categorizedRecord[category].push(entry.date);
  });

  return categorizedRecord;
}

function CalendarHeatmap({
  variantClassnames,
  datesPerVariant,
  weightedDates,
  ...props
}: HeatmapCalendarProps) {
  const noOfVariants = variantClassnames.length;

  weightedDates = weightedDates ?? [];
  datesPerVariant =
    datesPerVariant ?? categorizeDatesPerVariant(weightedDates, noOfVariants);

  const [modifiers, modifiersClassNames] = useModifiers(
    variantClassnames,
    datesPerVariant
  );

  return (
    <Calendar
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      {...props}
    />
  );
}
CalendarHeatmap.displayName = 'CalendarHeatmap';

export { CalendarHeatmap };
