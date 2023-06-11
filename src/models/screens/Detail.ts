import {PriorityItem} from '../data';

export interface DateSelectBottomSheetProps {
  onUpdateDate: (value: Date) => void;
}

export interface DateSelectBottomSheetRefProps {
  onOpenModal: (value: Date) => void;
}

export interface PrioritySelectBottomSheetProps {
  onSelectPriority: (value: PriorityItem['priority']) => void;
  priority: PriorityItem['priority'];
}

export interface PrioritySelectBottomSheetRefProps {
  onOpenModal: () => void;
}

export interface DetailFormRefProps {
  onSubmit: () => void;
}
