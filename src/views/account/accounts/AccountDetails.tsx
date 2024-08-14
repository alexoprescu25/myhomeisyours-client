import { type FC, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import classes from './AccountDetails.module.scss';

import { fetchAccount, updateAccount } from "service/user.service";
import { fetchUserActivities, fetchUserActivitiesByDate } from "service/activity.service";

import ChangePassword from "./ChangePassword";
import { FilterDate } from "components/account";
import { Loader, Acronim, Input, Select, Button, Component, Title } from "components/shared";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { formDataType, initialState, optionsArray } from "./config";

import { formatDate } from "utils";

const AccountDetails: FC = () => {
    const [currentAccount, setCurrentAccount] = useState<any>(null);
    const [activities, setActivities] = useState<any>(null);
    const [dateIsLoading, setDateIsLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { accountId } = useParams();

    const {
        control, 
        handleSubmit,
        setValue, 
        formState: { errors } 
    } = useForm<formDataType>({ defaultValues: initialState });

    const getCurrentAccount = async () => {
        if (!accountId) return;

        try {
            const response = await fetchAccount(accountId);
            const activityResponse = await fetchUserActivities(accountId);

            if (response && response.status === 200) {
                setCurrentAccount(response.data.account);

                setValue('firstName', response.data.account.firstName);
                setValue('lastName', response.data.account.lastName);
                setValue('email', response.data.account.email);
                setValue('role', response.data.account.role);
            }

            if (activityResponse && activityResponse.status === 200) {
                setActivities(activityResponse.data.activities);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleFetchActivities = async () => {
        if (!accountId) return;

        try {
            const activityResponse = await fetchUserActivities(accountId);

            if (activityResponse && activityResponse.status === 200) {
                setActivities(activityResponse.data.activities);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmitBasicForm: SubmitHandler<formDataType> = async (data) => {
        if (!accountId) return;
        setIsLoading(true);

        try {
            const response = await updateAccount(accountId, data);

            if (response && response.status === 200) {
                await handleFetchActivities();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFilterActivity = async (data: { from: string; to: string; }) => {
        if (!accountId) return;
        setDateIsLoading(true);

        try {
            const activityResponse = await fetchUserActivitiesByDate(accountId, data.from, data.to);

            if (activityResponse && activityResponse.status === 200) {
                setActivities(activityResponse.data.activities);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDateIsLoading(false);
        }
    }

    useEffect(() => {
        getCurrentAccount();
    }, [])

    if (!currentAccount || !accountId) {
        return <Loader />
    }
    
    return (
        <Fragment>
            <div className={ classes.details }>
                <div className={ classes.details__header }>
                    <Link to="/dashboard/accounts">Back</Link>
                </div>
                <div className={ classes.details__container }>
                    <div className={ classes.details__info }>
                        <Component className={ classes.account }>
                            <div className={ classes.account__details }>
                                <Title>Basic Information</Title>
                                <div className={ classes.account__header }>
                                    <Acronim name={ currentAccount.fullName } />
                                    <p> { currentAccount.fullName } </p>
                                </div>
                                <div className={ classes.account__form }>
                                    <form onSubmit={ handleSubmit(onSubmitBasicForm) }>
                                        <Controller name="firstName" control={ control } rules={{ required: 'First name is required' }} render={({ field }) => (
                                            <Input label="First Name" {...field} errors={ errors } />
                                        )} />
                                        <Controller name="lastName" control={ control } rules={{ required: 'Last name is required' }} render={({ field }) => (
                                            <Input label="Last Name" {...field} errors={ errors } />
                                        )} />
                                        <Controller name="email" control={ control } rules={{ required: 'Email is required' }} render={({ field }) => (
                                            <Input label="Email" {...field} errors={ errors } />
                                        )} />
                                        <Controller name="role" control={ control } rules={{ required: 'Role is required' }} render={({ field }) => (
                                            <Select {...field} optionsArray={ optionsArray } errors={ errors } defaultValue='Role' />
                                        )} />
                                        <Button type="submit" mode="main" isLoading={ isLoading }>Save</Button>
                                    </form>
                                </div>
                            </div>
                        </Component>
                        <ChangePassword accountId={ accountId } onSave={ handleFetchActivities } />
                    </div>
                    <Component className={ classes.details__activities }>
                        <Title>Activities</Title>
                        <FilterDate onSubmitData={ handleFilterActivity } isLoading={ dateIsLoading } />
                        { (activities && activities.length > 0) && activities.map((item: any) => (
                            <div className={ classes.activity } key={ item._id.toString() }>
                                <div className={ classes.activity__container }>
                                    <p className={ classes.activity__name }> { item.description } </p>
                                    <p className={ classes.activity__date }>Date: <strong> { formatDate(item.timestamp, 'LL') } - { formatDate(item.timestamp, 'LT') } </strong> </p>
                                </div>
                            </div>
                        )) }
                    </Component>
                </div>
            </div>
        </Fragment>
    )
}

export default AccountDetails;