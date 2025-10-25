export const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const gridItemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

export const tabContentVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.2 }
}

export const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const modalPanelVariants = {
  initial: { scale: 0.9, opacity: 0, y: 50 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 50 },
  transition: { type: 'spring', stiffness: 300, damping: 30 }
}