import { Alert } from 'antd'
import type{ FieldErrors, FieldValues } from 'react-hook-form'

interface FieldErrorAlertProps {
  errors?: FieldErrors<FieldValues>;
  fieldName: string;
}

function FieldErrorAlert({ errors, fieldName }: FieldErrorAlertProps) {
  const errorMessage = errors?.[fieldName]?.message as string | undefined

  if (!errorMessage) return null

  return (
    <Alert
      message={errorMessage}
      type="error"
      showIcon
      style={{ marginTop: '0.7em', overflow: 'hidden' }}
    />
  )
}

export default FieldErrorAlert
