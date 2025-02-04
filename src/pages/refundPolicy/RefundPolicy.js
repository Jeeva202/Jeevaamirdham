import React from "react";
import { Container, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const RefundPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Refund Policy
        </Typography>
        <Typography variant="body1" paragraph>
          At Jeeva Amirdham, we are committed to providing quality products and services. Our refund policy ensures a smooth and fair process for customers seeking refunds under applicable conditions.
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Eligibility for Refunds
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Refunds are applicable only for eligible cancellations as per our cancellation policy." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Refund requests must be made within 1 day of the transaction." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Donations, customized services, or digital products are non-refundable unless explicitly stated." />
          </ListItem>
        </List>

        <Typography variant="h5" gutterBottom>
          2. Refund Process
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Approved refunds will be processed within 4-7 working days to the original payment method." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Customers may be required to provide proof of purchase for verification." />
          </ListItem>
          <ListItem>
            <ListItemText primary="If an order/service is canceled due to an issue from our end, a full refund will be issued." />
          </ListItem>
        </List>

        <Typography variant="h5" gutterBottom>
          3. Non-Refundable Items & Services
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Donations and contributions made to Jeeva Amirdham." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Services or events that have already been availed or attended." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Any products or services explicitly marked as 'non-refundable' at the time of purchase." />
          </ListItem>
        </List>

        <Typography variant="h5" gutterBottom>
          4. Contact for Refunds
        </Typography>
        <Typography variant="body1" paragraph>
          For refund requests or inquiries, please reach out to us at:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Email: <a href="mailto:admin@jeevaamirdham.org">admin@jeevaamirdham.org</a>
          
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Phone: <a href="tel:+9176564723">+91 9176564723</a>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          We reserve the right to modify this policy at any time, and updates will be reflected on our website.
        </Typography>
      </Paper>
    </Container>
  );
};

export default RefundPolicy;