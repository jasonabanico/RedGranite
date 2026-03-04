import { Alert } from 'react-bootstrap';

interface ErrorAlertProps {
    title?: string;
    message: string;
    onDismiss?: () => void;
}

/**
 * Reusable error alert component.
 */
export function ErrorAlert({ title = 'Error', message, onDismiss }: ErrorAlertProps) {
    return (
        <Alert variant="danger" dismissible={!!onDismiss} onClose={onDismiss}>
            <Alert.Heading>{title}</Alert.Heading>
            <p className="mb-0">{message}</p>
        </Alert>
    );
}
