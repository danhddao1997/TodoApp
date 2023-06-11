import {ITodoItem} from '../data';
import {ModalRefProps} from './Modals';

export interface StatusSelectionModalRefProps extends ModalRefProps {}

export interface StatusSelectionModalProps {
  hasAll: boolean;
  selectedItem: ITodoItem['status'] | undefined;
  onItemSelect: (value: ITodoItem['status'] | undefined) => void;
  onCloseModal?: () => void;
}
