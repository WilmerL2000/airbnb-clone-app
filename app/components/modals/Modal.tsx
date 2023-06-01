'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  /* It checks if the `disabled` prop is true, and if so, it returns without doing anything. Otherwise, it sets the
`showModal` state to `false`, which will hide the modal. It then uses `setTimeout` to delay calling
the `onClose` function for 300 milliseconds, which gives the modal time to animate out before it is
completely removed from the DOM. The `onClose` function is passed as a dependency to `useCallback`,
which means that if it changes, a new version of `handleClose` will be created. The `disabled` prop
is also a dependency, which means that if it changes, the current version of `handleClose` will be
updated with the new value of `disabled`. */
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  return <div>Modal</div>;
}
