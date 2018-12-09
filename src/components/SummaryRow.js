import React, {Fragment} from 'react';
const SummaryRow = (props) => {
    const {title, value }= props;
  return (
   <Fragment>
       <td>{title}</td>
       <td>{value}</td>
   </Fragment>
  );
}
export default SummaryRow;