import {BackdropModalRefProps} from '../components/BackdropModal';
import {ITodoItem, StatusItem} from '../data';

export type ListBottomSheetMode = 'category' | 'filter';

export interface CategoryItemProps {
  item: StatusItem;
}

export interface SortCategorySelectModalRefProps
  extends BackdropModalRefProps {}

export interface SortSelectComponentProps {
  onSelectCategory: () => void;
}

export interface SortCategorySelectionItemProps {
  category: string;
  onCloseModal: () => void;
}

export interface TodoCardItemProps {
  data: ITodoItem;
  onQuickUpdateStatus: (data: ITodoItem) => void;
}
