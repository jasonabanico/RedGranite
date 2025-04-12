import { useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setItems, resetInitialLoad } from "./itemsSectionSlice";
import itemService from "../../services/itemService";
import { makeSelectInitialLoad, makeSelectItems, makeSelectPage } from "./selectors";

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
    const location = useLocation();
    const navigate = useNavigate();
    const updated = location.state?.updated;
    const prevPageRef = useRef<number | undefined>(undefined);

    const fetchItems = async (page: number) => {
        const items = await itemService
            .getItems("")
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
        if (updated) {
            fetchItems(page);
            navigate(location.pathname, { replace: true });
        }
        prevPageRef.current = page;
    }, [initialLoad, items, page, updated]);

    useEffect(() => {
        if (!initialLoad && prevPageRef.current !== page) {
            fetchItems(page);
        }
        prevPageRef.current = page;
    }, [page, initialLoad]);

    return (
        <Container>
            <Link to="/addItem" className='btn btn-success my-3'>Add</Link>
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
                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                    <Link to={`/editItem/${item.id}`} className='btn bt-sm btn-primary' style={{ whiteSpace: "nowrap" }}>Edit</Link>
                                    <Button className='btn bt-sm btn-danger' style={{ whiteSpace: "nowrap" }}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}