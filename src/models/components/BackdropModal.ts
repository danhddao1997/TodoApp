export interface BackdropModalRefProps {
  setVisible: (value: boolean) => void;
}

export interface BackdropModalProps {
  children: JSX.Element;
  onCloseModal: () => void;
}
