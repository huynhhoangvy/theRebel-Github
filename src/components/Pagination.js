import React from 'react';
import { Row } from 'react-bootstrap';
import styles from './App.module.css';

class Pagination extends React.Component {
  renderPagination = () => {
    let {
      total,
      per_page,
      page,
      totalPage,
    } = this.props;

    let renderPageNumbers;
    // let totalPage = Math.ceil(total / per_page);
    const pageNumbers = [];
    if (total !== null) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
      renderPageNumbers = pageNumbers.map(number => {
        let classes = page === number ? styles.active : '';
        if (number === 1 || number === total || (number >= page - 2 && number <= page + 2)) {
          return (
            <div>
              {this.props.isListRepo && <span key={number} className={classes} onClick={() => this.props.getSearchRepo1(this.props.searchInput, number)}>{number}</span>
              }
              {!this.props.isListRepo && <span key={number} className={classes} onClick={() => this.props.getRepo2(this.props.fullName, number)}>{number}</span>
              }
            </div>
          );
        }
      });
    }

    return (
      <div className={styles.pagination}>
        {this.props.isListRepo &&
          <div className="d-flex w-100">
            {totalPage > 1 &&
              <div className="d-flex w-100 justify-content-center">
                {page > 6 &&
                  <span onClick={() => this.props.getSearchRepo1(this.props.searchInput, page - 5)}> &laquo; </span>}
                {page !== 1 && <span onClick={() => this.props.getRepo2(this.props.searchInput, page - 1)}> &lsaquo; </span>}

                {renderPageNumbers}

                {totalPage !== page &&
                  <span onClick={() => this.props.getSearchRepo1(this.props.searchInput, totalPage)}> Last page: {totalPage} </span>
                }
                {totalPage - page > 1 &&
                  <span onClick={() => this.props.getSearchRepo1(this.props.searchInput, page + 1)}> &rsaquo; </span>
                }
                {totalPage - page > 5 &&
                  <span onClick={() => this.props.getSearchRepo1(this.props.searchInput, page + 5)}> &raquo;
                </span>
                }
              </div>
            }
          </div>
        }
        {!this.props.isListRepo &&
          <div className="d-flex w-100">
            {totalPage > 1 &&
              <div className="d-flex w-100 justify-content-center">
                {page > 6 &&
                  <span onClick={() => this.props.getRepo2(this.props.fullName, page - 5)}> &laquo; </span>}
                {page !== 1 && <span onClick={() => this.props.getRepo2(this.props.fullName, page - 1)}> &lsaquo; </span>}

                {renderPageNumbers}

                {totalPage !== page &&
                  <span onClick={() => this.props.getRepo2(this.props.fullName, totalPage)}> Last page: {totalPage} </span>
                }
                {totalPage - page > 1 &&
                  <span onClick={() => this.props.getRepo2(this.props.fullName, page + 1)}> &rsaquo; </span>
                }
                {totalPage - page > 5 &&
                  <span onClick={() => this.props.getRepo2(this.props.fullName, page + 5)}> &raquo;
                </span>
                }
              </div>
            }
          </div>
        }

      </div>

    )
  }
  render() {
    return (
      <div className="d-flex justify-content-center">{this.renderPagination()}</div>
    )


  }
}


export default Pagination;