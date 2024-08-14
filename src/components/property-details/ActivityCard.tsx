import { type FC } from "react";
import classes from './Activity.module.scss';

import { ActivityType } from "types/shared";

import { formatDate } from "utils";

type ActivityCardProps = {
    activity: ActivityType;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity }) => {
    return (
        <div className={ classes.activity }>
            <div className={ classes.activity__container }>
                <div className={ classes.activity__header }>
                    <p>Updated by { activity.name } </p>
                    <p className={ classes.activity__date }> { formatDate(activity.createdAt, 'LL') } </p>
                </div>
                <div className={ classes.activity__time }>
                    <p> { formatDate(activity.createdAt, 'LT') } </p>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard;