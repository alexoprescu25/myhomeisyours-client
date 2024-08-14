import { type FC, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import classes from './Accounts.module.scss';

import { 
    Component,
    Table,
    TableHead, 
    TableBody,
    Loader,
    ReactModal,
    Button,
    Acronim
} from "components/shared";
import CreateAccount from "./CreateAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { fetchUsers, deleteAccount } from "service/user.service";
import { handleAPIError, formatDate, waitFor } from "utils";

import { EnhancedSubject } from "types/shared";

import { normalStyles } from "constant";

const Accounts: FC = () => {
    const [deleteModalIsOpen, setDeleteModalStatus] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<EnhancedSubject[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; } | null>(null);

    const getUsers = async () => {
        try {   
            const response = await fetchUsers();
            
            if (response && response.status === 200) {
                setUsers(response.data.users);
            }
        } catch (error) {
            handleAPIError(error, true);
        }
    }

    const handleCreateAccount = async () => {
        await getUsers();
        setIsOpen(false);
    }

    const handleDeleteDisclaimer = (id: string, name: string) => {
        setSelectedUser({ id, name });
        waitFor(100).then(() => { setDeleteModalStatus(true) });
    }

    const handleClose = () => {
        setSelectedUser(null); 
        setDeleteModalStatus(false);
    }

    const handleDelete = async () => {
        setIsLoading(true);
        if (!selectedUser) return;

        try {
            const response = await deleteAccount(selectedUser.id);

            if (response && response.status === 200) {
                await getUsers();
                await waitFor(100);
                
                handleClose();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        getUsers();
    }, [])

    if (!users) {
        return <Loader />
    }

    return (
        <Fragment>
            <ReactModal 
                isOpen={ isOpen }
                onClose={ () => setIsOpen(false) }
            >
                <CreateAccount onSubmit={ handleCreateAccount } />
            </ReactModal>

            <ReactModal
                style={ normalStyles }
                isOpen={ deleteModalIsOpen }
                onClose={ handleClose }
            >       
                <div className={ classes.delete }>
                    <div className={ classes.delete__container }>
                        <div className={ classes.delete__image }>
                            <img src="/images/exclamation.png" alt="Exclamation" />
                        </div>
                        <div className={ classes.delete__content }>
                            <p className={ classes.delete__heading }>Delete User</p>
                            <p className={ classes.delete__text }>Are you sure you want to delete user { selectedUser && selectedUser.name }? </p>
                        </div>
                        <div className={ classes.delete__actions }>
                            <Button mode="slate-grey" onClick={ handleClose }>Cancel</Button>
                            <Button mode="danger" onClick={ handleDelete } isLoading={ isLoading }>Delete</Button>
                        </div>
                    </div>
                </div>
            </ReactModal>

            <Component className={ classes.accounts }>
                <div className={ classes.accounts__container }>
                    <Table title="Users" onClick={ () => setIsOpen(true) }>
                        <TableHead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Actions</th>
                            </tr>
                        </TableHead>
                        <TableBody>
                            { users.map((user: any) => (
                                <tr key={ user._id.toString() }>
                                    <td> 
                                        <span className={ classes.accounts__name }>
                                            <Acronim name={ user.fullName } width={40} />
                                            <Link className={ classes.accounts__link } to={ `/dashboard/accounts/${user._id.toString()}` }>
                                                { user.fullName }
                                            </Link>
                                        </span>
                                    </td>
                                    <td> { user.role } </td>
                                    <td> 
                                        { 
                                            (user.createdBy && user.createdBy.fullName) ? (
                                                <Link className={ classes.accounts__link } to={ `/dashboard/accounts/${user.createdBy._id.toString()}` }> { user.createdBy.fullName } </Link>  
                                            ) : (
                                                <p>N/A</p>
                                            ) 
                                        }
                                    </td>
                                    <td> { formatDate(user.createdAt, 'LL') } - { formatDate(user.createdAt, 'LT') }  </td>
                                    <td> { formatDate(user.updatedAt, 'LL') } - { formatDate(user.updatedAt, 'LT') }  </td>
                                    <td>
                                        <button className={ classes.accounts__delete } onClick={ () => { handleDeleteDisclaimer(user._id, user.fullName) } }>
                                            <FontAwesomeIcon icon={ faTrash } />
                                        </button>
                                    </td>
                                </tr>
                            )) }
                        </TableBody>
                    </Table>
                </div>
            </Component>
        </Fragment>
    )
}

export default Accounts;