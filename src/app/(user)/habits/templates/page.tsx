import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { TemplateList } from '@/components/templateList';

export default function Templates() {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-wrap justify-between">
        <div className="flex gap-7">
          <Select>
            <SelectTrigger className="justify-self-start">
              <SelectValue placeholder="Все периоды" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Периоды</SelectLabel>
                <SelectItem value="day">День</SelectItem>
                <SelectItem value="week">Неделя</SelectItem>
                <SelectItem value="month">Месяц</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="justify-self-start">
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Категории</SelectLabel>
                <SelectItem value="health">Здоровье</SelectItem>
                <SelectItem value="lifestyle">Жизнь</SelectItem>
                <SelectItem value="study">Учеба</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="search"
            placeholder="Поиск по названию"
            className="max-w-64 justify-self-start"
          />
        </div>
      </div>
      <TemplateList />
    </div>
  );
}
