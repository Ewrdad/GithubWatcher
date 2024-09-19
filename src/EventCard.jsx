import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { marked } from "marked";

/**
 * MARK: EventCard
 * @description A card that display a github event
 */
export const EventCard = ({ event }) => {
  const [open, setOpen] = React.useState(0);
  const strringName = JSON.stringify(event, null, 4);
  return (
    <>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Typography variant="h6" onClick={() => setOpen(1)}>
                  {event.type}
                </Typography>
                <Typography variant="body1">
                  {event.org && event.org.login} ::
                  {event.actor.login}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ alignContent: "right", justifyContent: "right" }}
              >
                {event.actor.avatar_url && (
                  <img
                    onClick={() => setOpen(2)}
                    src={event.actor.avatar_url}
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ alignContent: "right", justifyContent: "right" }}
              >
                {event.org && (
                  <img
                    onClick={() => setOpen(3)}
                    src={event.org.avatar_url}
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <a href={event.repo.url}>
                  <Typography variant="body2">{event.repo.name}</Typography>
                </a>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>
                    {event.payload.action && event.payload.action} ::
                    {event.payload.ref && event.payload.ref} ::
                    {event.payload.title && event.payload.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {event.payload.commits &&
                      event.payload.commits.map((commit) => {
                        return (
                          <div
                            key={commit.sha}
                            style={{
                              border: "1px solid black",
                              padding: "10px",
                              margin: "10px",
                            }}
                          >
                            <Typography>{commit.message}</Typography>
                            <Typography>{commit.sha}</Typography>
                            <Typography>{commit.url}</Typography>
                            <Typography>{commit.author.name}</Typography>
                            <Typography>{commit.author.email}</Typography>
                          </div>
                        );
                      })}
                  </Typography>
                  {event.payload.pull_request && (
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        margin: "10px",
                      }}
                    >
                      <Typography variant="h6">PR Details</Typography>
                      <Typography>
                        {event.payload.pull_request.title}
                      </Typography>
                      {event.payload.pull_request.body && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: marked(event.payload.pull_request.body),
                          }}
                        />
                      )}
                    </div>
                  )}
                  {event.payload.issue && (
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        margin: "10px",
                      }}
                    >
                      <Typography variant="h6">Issue Details</Typography>
                      <Typography>{event.payload.issue.title}</Typography>

                      {event.payload.issue.body && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: marked(event.payload.issue.body),
                          }}
                        />
                      )}
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </CardContent>
        </Card>

        <Dialog aria-labelledby="customized-dialog-title" open={open == 1}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Raw
          </DialogTitle>

          <DialogContent dividers>
            <Typography gutterBottom>{strringName}</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpen(0)} color="primary">
              Leave
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog aria-labelledby="customized-dialog-title" open={open == 2}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {event.actor.display_login}
          </DialogTitle>

          <DialogContent dividers>
            <Typography gutterBottom>Username: {event.actor.login}</Typography>
            <Typography gutterBottom>id: {event.actor.id}</Typography>
            <img
              src={event.actor.avatar_url}
              alt="avatar"
              onClick={() => {
                window.open(event.actor.url);
              }}
              style={{ width: 500, height: 500, borderRadius: "50%" }}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpen(0)} color="primary">
              Leave
            </Button>
          </DialogActions>
        </Dialog>
        {event.org && (
          <Dialog aria-labelledby="customized-dialog-title" open={open == 3}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {event.org.login}
            </DialogTitle>

            <DialogContent dividers>
              <Typography gutterBottom>Username: {event.org.login}</Typography>
              <Typography gutterBottom>id: {event.org.id}</Typography>
              <img
                src={event.org.avatar_url}
                alt="avatar"
                onClick={() => {
                  window.open(event.org.url);
                }}
                style={{ width: 500, height: 500, borderRadius: "50%" }}
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => setOpen(0)} color="primary">
                Leave
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
    </>
  );
};
