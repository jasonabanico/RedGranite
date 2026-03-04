import { Spinner, Container } from 'react-bootstrap';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | undefined;
}

/**
 * Reusable loading spinner component.
 */
export function LoadingSpinner({ message = 'Loading...', size }: LoadingSpinnerProps) {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center py-5">
            <Spinner animation="border" role="status" size={size}>
                <span className="visually-hidden">{message}</span>
            </Spinner>
            <p className="mt-3 text-muted">{message}</p>
        </Container>
    );
}
