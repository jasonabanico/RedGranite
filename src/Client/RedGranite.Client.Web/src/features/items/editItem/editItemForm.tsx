import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { z } from 'zod';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { useAppDispatch } from '../../../app/hooks';
import { updateItem } from './editItemFormSlice';
import itemService from '../../../services/items';
import { LoadingSpinner, ErrorAlert } from '../../../components';

// Validation schema
const itemSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200, 'Name must not exceed 200 characters'),
    shortDescription: z.string().min(1, 'Short description is required').max(500, 'Short description must not exceed 500 characters'),
    longDescription: z.string().min(1, 'Long description is required').max(5000, 'Long description must not exceed 5000 characters'),
});

interface ValidationErrors {
    name?: string;
    shortDescription?: string;
    longDescription?: string;
}

export function EditItemForm() {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { itemId } = useParams<{ itemId: string }>();

    useEffect(() => {
        async function fetchItemDetails() {
            if (!itemId) {
                setError('Item ID is required');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const response = await itemService.getItem(itemId);
                const itemDetails = response?.GetItem;
                
                if (itemDetails) {
                    setName(itemDetails.name);
                    setShortDescription(itemDetails.shortDescription);
                    setLongDescription(itemDetails.longDescription);
                } else {
                    setError('Item not found');
                }
            } catch (err) {
                console.error('Error fetching item:', err);
                setError('Failed to load item details. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchItemDetails();
    }, [itemId]);

    const validateForm = (): boolean => {
        const result = itemSchema.safeParse({ name, shortDescription, longDescription });
        
        if (!result.success) {
            const errors: ValidationErrors = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0] as keyof ValidationErrors;
                errors[field] = err.message;
            });
            setValidationErrors(errors);
            return false;
        }
        
        setValidationErrors({});
        return true;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const itemInput: ItemInput = {
            id: itemId || '',
            name,
            shortDescription,
            longDescription    
        };

        try {
            setIsSubmitting(true);
            setError(null);
            
            const resultAction = await dispatch(updateItem(itemInput));
            
            if (updateItem.rejected.match(resultAction)) {
                throw new Error('Failed to update item');
            }
            
            navigate('/', { state: { updated: true } });
        } catch (err) {
            console.error('Error updating item:', err);
            setError('Failed to update item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (isLoading) {
        return <LoadingSpinner message="Loading item details..." />;
    }

    return (
        <Container>
            <h2>Edit Item</h2>
            
            {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="Enter name"
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        isInvalid={!!validationErrors.name}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formItemShortDescription">
                    <Form.Label htmlFor="shortDescrption">Short Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="shortDescription" 
                        placeholder="Enter short description"
                        value={shortDescription}
                        onChange={e => setShortDescription(e.target.value)}
                        isInvalid={!!validationErrors.shortDescription}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.shortDescription}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formItemLongDescription">
                    <Form.Label htmlFor="longDescription">Long Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="longDescription" 
                        placeholder="Enter long description"
                        value={longDescription}
                        onChange={e => setLongDescription(e.target.value)}
                        isInvalid={!!validationErrors.longDescription}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.longDescription}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Submit'}
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="mx-2" disabled={isSubmitting}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}