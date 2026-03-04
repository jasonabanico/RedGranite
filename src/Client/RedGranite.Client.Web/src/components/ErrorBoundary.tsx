import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component for catching and displaying React errors gracefully.
 * Wrap this around components that may throw errors to prevent the entire app from crashing.
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ errorInfo });
        // Log error to an error reporting service
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    handleReload = (): void => {
        window.location.reload();
    };

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Container className="mt-5">
                    <Alert variant="danger">
                        <Alert.Heading>Something went wrong</Alert.Heading>
                        <p>
                            An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
                        </p>
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-3">
                                <summary>Error Details</summary>
                                <pre className="mt-2 p-3 bg-light text-danger">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                        <hr />
                        <div className="d-flex gap-2">
                            <Button variant="outline-danger" onClick={this.handleReset}>
                                Try Again
                            </Button>
                            <Button variant="danger" onClick={this.handleReload}>
                                Reload Page
                            </Button>
                        </div>
                    </Alert>
                </Container>
            );
        }

        return this.props.children;
    }
}
