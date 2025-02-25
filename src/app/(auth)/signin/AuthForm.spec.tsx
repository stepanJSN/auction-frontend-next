import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import AuthForm from "./AuthForm";
import { signinAction } from "./signin.action";

jest.mock("./signin.action", () => ({
  signinAction: jest.fn(),
}));

describe("AuthForm", () => {
  const mockEmail = "test@example.com";
  const mockPassword = "password123";
  it("renders the form correctly", () => {
    render(<AuthForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty fields", async () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findAllByText("Required")).toHaveLength(2);
  });

  it("calls signinAction with correct data", async () => {
    (signinAction as jest.Mock).mockResolvedValue({});

    render(<AuthForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: mockPassword },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    });

    await waitFor(() =>
      expect(signinAction).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockPassword,
      }),
    );
  });

  it("shows an error message when signinAction returns an error", async () => {
    (signinAction as jest.Mock).mockResolvedValue({ errorCode: 401 });

    render(<AuthForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: mockPassword },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    });

    expect(
      await screen.findByText("Incorrect email or password"),
    ).toBeInTheDocument();
  });
});
