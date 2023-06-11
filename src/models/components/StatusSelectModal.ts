import {StatusItem} from '../data';
import {BackdropModalRefProps} from './BackdropModal';

export interface StatusSelectModalRefProps extends BackdropModalRefProps {}

export interface StatusSelectModalProps {
  hasAll: boolean;
  selectedItem: StatusItem['status'] | undefined;
  onItemSelect: (value: StatusItem['status'] | undefined) => void;
  onCloseModal?: () => void;
}

export interface StatusSelectItemProps
  extends Pick<StatusSelectModalProps, 'onItemSelect' | 'selectedItem'> {
  item: string | StatusItem;
}
