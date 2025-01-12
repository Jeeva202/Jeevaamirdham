import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const TermsOfServiceModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Effective Date: [Insert Date]
                    <br /><br />
                    Welcome to Jeevaamirdham. By accessing or using our website [https://www.Jeevaamirdham.org] (the "Website") and App (Android/IOS) [Jeevaamirdham] (the “Mobile App”), you agree to comply with and be bound by the following Terms and Conditions ("Terms"). If you do not agree with these Terms, you are not authorized to use the Website.
                    <br /><br />
                    1. Use of the Website
                    <br />
                    1.1 Eligibility
                    <br />
                    To use the Website, you must be at least 13 years old or have the legal capacity to form a binding contract under applicable law. By using the Website, you represent and warrant that you meet this eligibility requirement.
                    <br />
                    1.2 License to Use
                    <br />
                    We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Website for personal, non-commercial use, subject to these Terms.
                    <br />
                    1.3 Prohibited Uses
                    <br />
                    You agree not to use the Website for any illegal or unauthorized purposes. Prohibited actions include, but are not limited to:
                    <br />
                    • Posting or transmitting harmful, defamatory, offensive, or illegal content.
                    <br />
                    • Engaging in activities that may damage, disable, or impair the functionality of the Website.
                    <br />
                    • Using automated systems or software to extract data or content without permission (e.g., scraping).
                    <br /><br />
                    2. Content and Intellectual Property
                    <br />
                    2.1 Ownership of Content
                    <br />
                    All content published on the Website, including articles, images, videos, designs, trademarks, logos, and other materials, is the property of Jeevaamirdham or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                    <br />
                    2.2 User-Generated Content
                    <br />
                    If you submit or contribute content (such as comments, articles, images, or other media) to the Website, you grant Jeevaamirdham a non-exclusive, royalty-free, worldwide license to use, display, modify, and distribute the content in connection with the Website's operations. You represent and warrant that you have the necessary rights to share such content.
                    <br />
                    2.3 No Reproduction Without Permission
                    <br />
                    You may not reproduce, distribute, display, or otherwise use any part of the Website’s content without prior written permission from Jeevaamirdham.
                    <br /><br />
                    3. Subscriptions and Payments
                    <br />
                    3.1 Subscription Plans
                    <br />
                    Access to certain features of the Website may require a paid subscription. You agree to pay all applicable subscription fees as outlined during the sign-up process. Subscription fees are subject to change, and any changes will be communicated to you in advance.
                    <br />
                    3.2 Payment Processing
                    <br />
                    Payments are processed through secure third-party payment providers. By subscribing, you agree to comply with the terms and conditions of these providers.
                    <br />
                    3.3 Cancellation and Refunds
                    <br />
                    Subscriptions may be canceled at any time, but refunds are only available as per the refund policy detailed on the Website. Cancellations will take effect at the end of the current billing period.
                    <br /><br />
                    4. Privacy and Data Collection
                    <br />
                    4.1 Privacy Policy
                    <br />
                    We value your privacy. Please review our Privacy Policy, which outlines how we collect, use, and protect your personal information when you use the Website.
                    <br />
                    4.2 Cookies
                    <br />
                    The Website may use cookies to enhance your user experience. By using the Website, you consent to the use of cookies in accordance with our Cookie Policy.
                    <br /><br />
                    5. Third-Party Links
                    <br />
                    The Website may contain links to third-party websites, services, or advertisements. These links are provided for your convenience, but we do not endorse or control the content of these third-party sites. We are not responsible for any damages or issues that arise from your use of third-party websites.
                    <br /><br />
                    6. Disclaimers and Limitation of Liability
                    <br />
                    6.1 No Warranties
                    <br />
                    The Website and its content are provided "as is" and "as available." We do not guarantee the accuracy, reliability, or availability of the Website, and we disclaim all warranties, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.
                    <br />
                    6.2 Limitation of Liability
                    <br />
                    To the maximum extent permitted by law, Jeevaamirdham shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the Website, including but not limited to loss of data or profits.
                    <br /><br />
                    7. Indemnification
                    <br />
                    You agree to indemnify and hold harmless Jeevaamirdham, its affiliates, employees, agents, and licensors from any claims, losses, damages, liabilities, and expenses (including legal fees) arising out of your use of the Website, violation of these Terms, or infringement of third-party rights.
                    <br /><br />
                    8. Modifications to the Terms
                    <br />
                    We reserve the right to modify, update, or revise these Terms at any time. Any changes will be posted on this page with an updated "Effective Date." It is your responsibility to review these Terms periodically. Your continued use of the Website after any changes constitutes your acceptance of the updated Terms.
                    <br /><br />
                    9. Governing Law
                    <br />
                    These Terms are governed by and construed in accordance with the laws of Tamil Nadu state, without regard to its conflict of laws principles. Any disputes will be resolved in the courts located in Chennai.
                    <br /><br />
                    10. Contact Information
                    <br />
                    If you have any questions or concerns regarding these Terms, please contact us at:
                    <br />
                    Jeevaamirdham
                    <br />
                    Email: thiruwriter4u@gmail.com
                    <br />
                    Phone: +91 9176564723
                    <br />
                    Address: 11/6, Bharathi 4th street, N Usman Rd, T. Nagar, Chennai, Tamil Nadu 600017
                    <br /><br />
                    By using the Website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disableElevation onClick={onClose} variant="contained" sx={{ marginTop: "1rem", color: "#fff", background: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px" }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TermsOfServiceModal;
