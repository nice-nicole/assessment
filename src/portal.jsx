import React from "react";
import { Button, Grid, Segment, Portal } from "semantic-ui-react";

export default function PortalExampleControlled({ open, handleClose, text }) {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Portal onClose={handleClose} open={open}>
          <Segment
            style={{
              left: "40%",
              position: "fixed",
              top: "50%",
              zIndex: 1000,
            }}
          >
            <p>{text}</p>

            <Button content="Close" negative onClick={handleClose} />
          </Segment>
        </Portal>
      </Grid.Column>
    </Grid>
  );
  //   }
}
