import { useEffect, useRef, useState } from "react";
import { createSelector } from "reselect";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { setItems, resetInitialLoad, deleteItem } from "./listItemsTableSlice";
import itemService from "../../../services/items";
import { makeSelectInitialLoad, makeSelectItems, makeSelectPage } from "./selectors";
import { LoadingSpinner, ErrorAlert } from "../../../components";
import { GetItems_GetItems } from "../../../services/items/__generated__/GetItems";

const itemsSelector = createSelector(makeSelectItems, (items) => ({
    items,
}));

const initialLoadSelector = createSelector(makeSelectInitialLoad, (initialLoad) => ({
    initialLoad,
}));

const pageSelector = createSelector(makeSelectPage, (page) => ({
    page,
}));

export function ListItemsTable() {
    const { items } = useAppSelector(itemsSelector);
    const { initialLoad } = useAppSelector(initialLoadSelector);
    const { page } = useAppSelector(pageSelector);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const updated = location.state?.updated;
    const prevPageRef = useRef<number | undefined>(undefined);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedItems = await itemService.getItems("");
            if (fetchedItems) {
                dispatch(setItems(fetchedItems));
            }
        } catch (err) {
            console.error("Error fetching items:", err);
            setError("Failed to load items. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialLoad && (!items || items.length === 0)) {
            fetchItems();
            dispatch(resetInitialLoad());
        }
        if (updated) {
            fetchItems();
            navigate(location.pathname, { replace: true });
        }
        prevPageRef.current = page;
    }, [initialLoad, items, page, updated, dispatch, navigate, location.pathname]);

    useEffect(() => {
        if (!initialLoad && prevPageRef.current !== page) {
            fetchItems();
        }
        prevPageRef.current = page;
    }, [page, initialLoad]);

    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id);
            const deleteAction = await dispatch(deleteItem(id));
            
            if (deleteItem.fulfilled.match(deleteAction)) {
                dispatch(setItems(items?.filter((item: GetItems_GetItems) => item.id !== id) || []));
            } else {
                setError("Failed to delete item. Please try again.");
            }
        } catch (err) {
            console.error("Error deleting item:", err);
            setError("Failed to delete item. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading && (!items || items.length === 0)) {
        return <LoadingSpinner message="Loading items..." />;
    }

    return (
        <Container>
            {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
            
            <Link to="/addItem" className='btn btn-success my-3'>Add</Link>
            
            {isLoading && <div className="text-muted mb-2">Refreshing...</div>}
            
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
                    {items && items.map((item: GetItems_GetItems) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.shortDescription}</td>
                            <td>
                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                    <Link to={`/editItem/${item.id}`} className='btn bt-sm btn-primary' style={{ whiteSpace: "nowrap" }}>Edit</Link>
                                    <Button 
                                        className='btn bt-sm btn-danger' 
                                        style={{ whiteSpace: "nowrap" }} 
                                        onClick={() => handleDelete(item.id)}
                                        disabled={deletingId === item.id}
                                    >
                                        {deletingId === item.id ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {(!items || items.length === 0) && !isLoading && (
                        <tr>
                            <td colSpan={4} className="text-center text-muted py-4">
                                No items found. Click "Add" to create your first item.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}