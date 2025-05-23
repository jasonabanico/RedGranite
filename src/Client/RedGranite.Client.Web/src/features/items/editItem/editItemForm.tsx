import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { useAppDispatch } from '../../../app/hooks';
import { UpdateItem } from '../../../services/items/__generated__/UpdateItem';
import { updateItem } from './editItemFormSlice';
import itemService from '../../../services/items';
import { setItem } from './editItemFormSlice';

export function EditItemForm() {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { itemId } = useParams<{ itemId: string }>();

    const getItem = async (itemId: string | undefined) => {
        try {
            var getItem = await itemService
                .getItem(itemId)
                .catch((err) => {
                    console.log("Error:", err);
                });
            return getItem?.GetItem;
        } catch (err) {
            console.error("Error fetching item:", err);
            return null;
        }
    };

    useEffect(() => {
        async function fetchItemDetails() {
            if (!itemId) return;
            const itemDetails = await getItem(itemId);
            if (itemDetails != null) {
                setName(itemDetails.name);
                setShortDescription(itemDetails.shortDescription);
                setLongDescription(itemDetails.longDescription);
            }
        }
        fetchItemDetails();
    }, [itemId]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const itemInput: ItemInput = {
            id: itemId || '',
            name,
            shortDescription,
            longDescription    
        };

        const savedItemAction = await dispatch(updateItem(itemInput));
        const savedItem = savedItemAction.payload as UpdateItem;
        itemInput.id = savedItem.UpdateItem ? savedItem.UpdateItem.id : "";
        dispatch(updateItem(itemInput));
        navigate('/', { state: { updated: true } });
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <Container>
            <h2>Edit Item</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name"
                        value={name} 
                        onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemShortDescription">
                    <Form.Label htmlFor="shortDescrption">Short Description</Form.Label>
                    <Form.Control type="text" name="shortDescription" placeholder="Enter short description"
                        value={shortDescription}
                        onChange={e => setShortDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemLongDescription">
                    <Form.Label htmlFor="longDescription">Long Description</Form.Label>
                    <Form.Control type="text" name="longDescription" placeholder="Enter long description"
                        value={longDescription}
                        onChange={e => setLongDescription(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <Button variant="secondary" onClick={handleCancel} className="mx-2">Cancel</Button>
            </Form>
        </Container>
    );
}