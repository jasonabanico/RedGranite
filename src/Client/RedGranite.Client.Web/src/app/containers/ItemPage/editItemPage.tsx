import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { useAppDispatch } from '../../hooks';
import { AddItem } from '../../services/itemService/__generated__/AddItem';
//import { updateItem } from '../HomePage/itemsSectionSlice';
import { saveNewItem } from './saveNewItemSlice';

export function EditItemPage() {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        var itemInput: ItemInput = {
            id: "",
            name,
            shortDescription,
            longDescription    
        };
        const savedItemAction = await dispatch(saveNewItem(itemInput));
        const savedItem = savedItemAction.payload as AddItem;
        itemInput.id = savedItem.AddItem ? savedItem.AddItem.id : "";
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