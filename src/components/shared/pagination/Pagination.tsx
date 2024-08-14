import { type FC } from 'react';
import classes from './Pagination.module.scss';
import classNames from 'classnames';

type PaginationProps = {
    postsPerPage: number;
    totalPosts: number;
    paginate: (param: number) => void;
    currentPage: number;
}

const Pagination: FC<PaginationProps> = ( { postsPerPage, totalPosts, currentPage, paginate } ) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <nav>
                <ul className={ classes.pagination }>
                    {pageNumbers.map(number => (
                        <li key={number} className={ classes.pagination__item }>
                            <button 
                                onClick={ () => paginate(number) } 
                                className={ classNames(classes.pagination__link, {[classes['pagination__link--active']]: number === currentPage}) }
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Pagination;