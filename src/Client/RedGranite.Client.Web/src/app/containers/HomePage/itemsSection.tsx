import { useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import itemService from "../../services/itemService";
import { makeSelectInitialLoad, makeSelectItems, makeSelectPage } from "./selectors";
import { setItems, resetInitialLoad } from "./itemsSectionSlice";

const itemsSelector = createSelector(makeSelectItems, (items) => ({
    items,
}));

const initialLoadSelector = createSelector(makeSelectInitialLoad, (initialLoad) => ({
    initialLoad,
}));

const pageSelector = createSelector(makeSelectPage, (page) => ({
    page,
}));

const actionDispatch = (dispatch: Dispatch) => ({
    setItems: (items: any) => dispatch(setItems(items)),
    resetInitialLoad: () => dispatch(resetInitialLoad()),
});

export function ItemsSection() {
    const { items } = useAppSelector(itemsSelector);
    const { initialLoad } = useAppSelector(initialLoadSelector);
    const { page } = useAppSelector(pageSelector);
    const { setItems, resetInitialLoad } = actionDispatch(useAppDispatch());
    const prevPageRef = useRef<number | undefined>(undefined);

    const fetchItems = async (page: number) => {
        const items = await itemService
            .getItems(page)
            .catch((err) => {
                console.log("Error:", err);
            });

        if (items) setItems(items);
    }

    useEffect(() => {
        if (initialLoad && (!items || items.length === 0)) {
            fetchItems(page);
            resetInitialLoad();
        }
        prevPageRef.current = page;
    }, [initialLoad, items, page]);

    useEffect(() => {
        if (!initialLoad && prevPageRef.current !== page) {
            fetchItems(page);
        }
        prevPageRef.current = page;
    }, [page, initialLoad]);

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