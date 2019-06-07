import React from 'react';
import { Row } from 'react-bootstrap';
import styles from './App.module.css';



class Pagination extends React.Component {
    renderPagination = () => {
        let {
            total,
            per_page,
            page,

        } = this.props;

        let renderPageNumbers;
        let totalPage = Math.ceil(total / per_page);
        const pageNumbers = [];

        if (total !== null) {
            for (let i = 1; i <= Math.ceil(total / per_page); i++) {
                pageNumbers.push(i);
            }
            renderPageNumbers = pageNumbers.map(number => {
                let classes = page === number ? styles.active : '';

                if (number === 1 || number === total || (number >= page - 2 && number <= page + 2)) {
                    return (
                        <span key={number} className={classes} onClick={() => this.props.getRepo(this.props.fullName, number)}>{number}</span>
                    );
                }
            });
        }

        return (
            <Row>

                <div className={styles.pagination}>
                    {total > 30 && <div>
                        {page > 5 && <span onClick={() => this.props.getRepo(this.props.fullName, page - 5)}> &laquo; </span>}
                        {page !== 1 && <span onClick={() => this.props.getRepo(this.props.fullName, page - 1)}> &lsaquo; </span>}
                        {renderPageNumbers}
                        <span onClick={() => this.props.getRepo(this.props.fullName, page + 1)}> &rsaquo; </span>
                        <span onClick={() => this.props.getRepo(this.props.fullName, page + 5)}> &raquo; </span>
                    </div>
                    }
                </div>

            </Row>
        )
    }
    render() {
        return (
            <div>{this.renderPagination()}</div>

        )


    }
}


export default Pagination;

