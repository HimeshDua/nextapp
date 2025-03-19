import {
  Html,
  Body,
  Container,
  Text,
  Section,
  Head,
  Img,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  email: string;
  verificationCode: string;
  logoUrl?: string;
}

export const VerificationEmail = ({
  username,
  email,
  verificationCode,
  logoUrl = "https://via.placeholder.com/150",
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head>
        <title>Verify your email</title>
      </Head>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Header */}
          <Section style={headerStyle}>
            <Img src={logoUrl} width="150" height="50" alt="Logo" />
          </Section>

          {/* Content */}
          <Section style={contentStyle}>
            <Text style={headingStyle}>Verify your email address</Text>

            <Text style={textStyle}>Hello {username},</Text>

            <Text style={textStyle}>
              Please use the following verification code to complete your
              registration:
            </Text>

            <Section style={codeContainerStyle}>
              <Text style={codeStyle}>{verificationCode}</Text>
            </Section>

            <Text style={textStyle}>
              This code is valid for 15 minutes. If you didn't request this,
              please ignore this email.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerStyle}>
            {/* Use align prop instead of textAlign in style */}
            <Text style={footerTextStyle}>
              &copy; {new Date().getFullYear()} All rights reserved
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles with textAlign removed from footerTextStyle
const bodyStyle = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const containerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const headerStyle = {
  padding: "20px",
  borderBottom: "1px solid #f0f0f0",
};

const contentStyle = {
  padding: "30px 20px",
};

const headingStyle = {
  fontSize: "24px",
  fontWeight: 600,
  color: "#333",
  marginBottom: "20px",
};

const textStyle = {
  fontSize: "16px",
  color: "#555",
  lineHeight: 1.5,
  marginBottom: "15px",
};

const codeContainerStyle = {
  background: "#f0f0f0",
  borderRadius: "6px",
  padding: "15px",
  // textAlign: "center", // This is okay in Section component
  marginBottom: "20px",
};

const codeStyle = {
  fontSize: "28px",
  fontWeight: 600,
  color: "#333",
  letterSpacing: "2px",
};

const footerStyle = {
  padding: "20px",
  borderTop: "1px solid #f0f0f0",
};

const footerTextStyle = {
  fontSize: "12px",
  color: "#999",
  // textAlign removed from here
};
