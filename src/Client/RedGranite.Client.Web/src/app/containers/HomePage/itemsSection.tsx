import { createSelector } from "reselect";
import { makeSelectItems } from "./selectors";
import { useAppSelector } from "../../hooks";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const stateSelector = createSelector(makeSelectItems, (items) => ({
    items,
}));

export function ItemsSection() {
    const { items } = useAppSelector(stateSelector);

    const isEmptyItems = !items || items.length == 0;

    if (isEmptyItems)
        return null;
    
    return (
        <Container>
            <Link to="/createItem" className='btn btn-success my-3'>Create</Link>
            <Table className='itemsTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Short Description</th>
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