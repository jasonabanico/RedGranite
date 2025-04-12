import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { useAppDispatch } from '../../hooks';
import { UpdateItem } from '../../services/itemService/__generated__/UpdateItem';
import { updateItem } from './editItemPageSlice';
import itemService from '../../services/itemService';
import { setItem } from './editItemPageSlice';

export function EditItemPage() {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { itemId } = useParams();

    const getItem = async (itemId: string | undefined) => {
        var getItem = await itemService
            .getItem(itemId)
            .catch((err) => {
                console.log("Error:", err);
            });
        return getItem?.GetItem;
    }

    useEffect(() => {
        async function fetchItemDetails() {
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
        var itemInput: ItemInput = {
            id: "",
            name,
            shortDescription,
            longDescription    
        };
        const savedItemAction = await dispatch(updateItem(itemInput));
        const savedItem = savedItemAction.payload as UpdateItem;
        itemInput.id = savedItem.UpdateItem ? savedItem.UpdateItem.id : "";
        //dispatch(updateItem(itemInput));
        navigate('/');
    };

    return (
        <Container>
            <h2>Edit Item</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name"
                        onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemShortDescription">
                    <Form.Label htmlFor="shortDescrption">Short Description</Form.Label>
                    <Form.Control type="text" name="shortDescription" placeholder="Enter short description"
                        onChange={e => setShortDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemLongDescription">
                    <Form.Label htmlFor="longDescription">Long Description</Form.Label>
                    <Form.Control type="text" name="longDescription" placeholder="Enter long description"
                        onChange={e => setLongDescription(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}