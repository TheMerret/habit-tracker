'use client';

import { habitsActions } from '@/redux/features/habits';
import { selectTemplates } from '@/redux/features/habits/selectors';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import { FC, useRef } from 'react';
import { TemplateCard } from '@/components/templateCard';

export const TemplateList: FC = function () {
  const store = useAppStore();
  const initialized = useRef(false);
  const templates = useAppSelector((state) => selectTemplates(state));
  if (!initialized.current && !templates.length) {
    initialized.current = true;
    store.dispatch(habitsActions.loadTemplates());
  }
  return (
    <div className="flex flex-wrap gap-x-16 gap-y-6">
      {templates.map((template, ind) => (
        <TemplateCard
          key={ind}
          emoji={template.emoji}
          habitTitle={template.title}
          category={template.category}
          period={template.period}
          target={template.target}
        />
      ))}
    </div>
  );
};
