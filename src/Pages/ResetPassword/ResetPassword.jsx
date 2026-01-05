
import React, { useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../API/apis";
import { handleError } from "../../utilis/errorHandler";

export const ResetPassword = () => {
  // get token from URL
  const { token } = useParams();
  const navigate = useNavigate();

  // refs
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const password = passwordRef.current.value;
    const confirmPassword = confirmRef.current.value;

    // validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // call backend
      const response = await api.post("/api/v1/auth/resetPassword", {
        token,
        newPassword: password,
      });

      toast.success(response.data?.message || "Password reset successfully");

      // redirect to login
      navigate("/login");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <Container>
        <div className="auth-wrapper">
          <Card className="auth-card">
            <Card.Body>
              <h3 className="text-center fw-bold mb-2">
                Reset Password
              </h3>
              <p className="text-center text-muted mb-4">
                Enter your new password
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    ref={confirmRef}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 auth-btn"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

