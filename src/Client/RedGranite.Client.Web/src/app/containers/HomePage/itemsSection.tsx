import { createSelector } from "reselect";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { makeSelectItems } from "./selectors";

const stateSelector = createSelector(makeSelectItems, (items) => ({
    items,
}));

export function ItemsSection() {
    const { items } = useAppSelector(stateSelector);

    return (
        <Container>
            <Link to="/addItem" className='btn btn-success my-3'>Create</Link>
            <Table className='itemsTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Short Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.shortDescription}</td>
                            <td>
                                <Button className='btn bt-sm btn-primary'>Edit</Button>
                                <Button className='btn bt-sm btn-danger ms-2'>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}