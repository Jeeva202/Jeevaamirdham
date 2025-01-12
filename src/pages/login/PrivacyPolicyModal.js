import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const PrivacyPolicyModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Effective Date: [Insert Date]
                    <br /><br />
                    Your privacy is important to us. This Privacy Policy explains the types of personal information that is collected and recorded by Jeevaamirdham and how we use it.
                    <br /><br />
                    By using our website [https://www.Jeevaamirdham.org] (the "Site"), you agree to the collection and use of information in accordance with this policy.
                    <br /><br />
                    1. Information We Collect
                    <br />
                    We collect various types of information in order to provide and improve our services to you:
                    <br />
                    a. Personal Information:
                    <br />
                    When you visit our site, sign up for a newsletter, or subscribe to our magazine, we may collect personal details including but not limited to:
                    <br />
                    • Name
                    <br />
                    • Email address
                    <br />
                    • Billing address
                    <br />
                    • Payment information
                    <br /><br />
                    b. Non-Personal Information:
                    <br />
                    We also collect non-personal information automatically when you visit our site:
                    <br />
                    • IP address
                    <br />
                    • Browser type and version
                    <br />
                    • Device type
                    <br />
                    • Pages you visited on the site
                    <br />
                    • Time and date of your visit
                    <br /><br />
                    c. Cookies and Tracking Technologies:
                    <br />
                    Our site uses cookies and other tracking technologies to enhance user experience, analyze trends, and gather demographic data. You can control cookies through your browser settings, but please note that disabling cookies may impact the functionality of the site.
                    <br /><br />
                    2. How We Use Your Information
                    <br />
                    We use the information we collect for various purposes, including:
                    <br />
                    • To provide, operate, and maintain our website and services
                    <br />
                    • To process your subscriptions and send you updates, newsletters, or promotional materials
                    <br />
                    • To improve, personalize, and analyze the user experience
                    <br />
                    • To detect, prevent, and address technical issues
                    <br />
                    • To comply with legal obligations
                    <br /><br />
                    3. How We Share Your Information
                    <br />
                    We may share your personal information with third-party service providers in the following instances:
                    <br />
                    • Payment processing and subscription management
                    <br />
                    • Email marketing and communications
                    <br />
                    • Website analytics and performance monitoring
                    <br />
                    We will not sell, rent, or share your personal information with any third parties for their marketing purposes without your consent.
                    <br /><br />
                    4. Data Security
                    <br />
                    We take reasonable measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                    <br /><br />
                    5. Third-Party Links
                    <br />
                    Our site may contain links to external websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites that you visit.
                    <br /><br />
                    6. Your Rights and Choices
                    <br />
                    Depending on your location, you may have rights regarding the information we hold about you:
                    <br />
                    • Access: You have the right to request access to the personal data we hold about you.
                    <br />
                    • Correction: You may update or correct your personal information.
                    <br />
                    • Deletion: You may request the deletion of your personal data.
                    <br />
                    • Opt-out: You can opt out of receiving marketing communications from us at any time by following the unsubscribe link in emails or contacting us directly.
                    <br />
                    For European Union (EU) residents, your rights may also include the right to object to the processing of your data, the right to withdraw consent, and the right to data portability.
                    <br /><br />
                    7. Children's Privacy
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disableElevation onClick={onClose} variant="contained" sx={{ marginTop: "1rem", color: "#fff",background: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px",  }}>
                Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PrivacyPolicyModal;
