import { BUTTON_STYLES } from '@/shared';

export const SelectionActions = () => {
  return (
    <div className="dark:bg-blue-xs/80 flex items-center justify-between gap-5 rounded-3xl bg-amber-300/70 px-10 py-6">
      <button className={BUTTON_STYLES.favorites}>Deselect</button>
      <span>{} items in favorites</span>
      <button className={BUTTON_STYLES.favorites}>Download</button>
    </div>
  );
};
