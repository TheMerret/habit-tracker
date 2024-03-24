import { DateTimeForm } from '@/components/dateTimeForm';
import { UploadHabitsForm } from '@/components/uploadHabitsForm';

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <UploadHabitsForm />
      <DateTimeForm />
    </div>
  );
}
