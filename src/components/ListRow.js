import React from "react";
import { MDBRow, MDBCol} from "mdbreact";
import RowCard from './RowCard';

function ListRow({ announcements } = this.props) {
  return (
    <section className="text-center my-5">
      <MDBRow>
        {
          announcements &&
          announcements.map(announcement =>
            <MDBCol key={announcement.id} md="4" className="mb-lg-0 mb-4">
              <RowCard announcement={announcement} />
            </MDBCol>)
        }
      </MDBRow>
    </section>
  );
}

export default ListRow;