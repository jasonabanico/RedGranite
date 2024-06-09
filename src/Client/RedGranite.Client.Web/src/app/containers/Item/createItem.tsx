import { useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import itemService from '../../services/itemService';
import { useState } from 'react';

export function CreateItem() {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        /*
        await itemService.addItem(
            name,
            shortDescription,
            longDescription).catch((err) => {
            console.log("Error:", err);
        });
        */
    }

    return (
        <Container>
            <h2>Add New Item</h2>
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