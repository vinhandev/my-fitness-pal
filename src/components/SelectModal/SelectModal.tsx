import { ReactNode } from 'react';
import { Button, Modal, View } from 'react-native';

type Props = {
  children: ReactNode;
  open: boolean;
  onOpen: (paramOpen: boolean) => void;
  onSubmit: () => void;
};
export default function SelectModal({
  children,
  onOpen,
  onSubmit,
  open,
}: Props) {
  const handleClose = () => {
    onOpen(false);
  };

  return (
    <Modal visible={open} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#00000055',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Button title="Cancel" onPress={handleClose} />
            <Button title="Set" onPress={onSubmit} />
          </View>
          <View
            style={{
              paddingBottom: 50,
            }}
          >
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}
