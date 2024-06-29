import { useEffect } from "react";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import itemService from "../../services/itemService";
import { makeSelectItems } from "./selectors";
import { setItems } from "./homePageSlice";

const stateSelector = createSelector(makeSelectItems, (items) => ({
    items,
}));

const actionDispatch = (dispatch: Dispatch) => ({
    setItems: (items: any) => dispatch(setItems(items)),
});

export function ItemsSection() {
    const { items } = useAppSelector(stateSelector);
    const { setItems } = actionDispatch(useAppDispatch());

    const fetchItems = async () => {
        const items = await itemService
            .getItems(1)
            .catch((err) => {
                console.log("Error:", err);
            });

        console.log("Fetching.");
        if (items) setItems(items);
    }

    useEffect(() => {
        fetchItems();
    }, []);

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