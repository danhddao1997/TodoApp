import {BackdropModalRefProps} from 'models/components/BackdropModal';
import {PriorityItem} from '../data';

export interface DateSelectBottomSheetProps {
  onUpdateDate: (value: Date) => void;
}

export interface DateSelectBottomSheetRefProps {
  onOpenModal: (value: Date) => void;
}

export interface PrioritySelectModalProps {
  onSelectPriority: (value: PriorityItem['priority']) => void;
  priority: PriorityItem['priority'];
}

export interface PrioritySelectModalRefProps extends BackdropModalRefProps {}

export interface DetailFormRefProps {
  onSubmit: () => void;
}

export interface PrioritySelectItemProps {
  item: PriorityItem;
  onPress: () => void;
  selectedValue: PriorityItem['priority'];
}
