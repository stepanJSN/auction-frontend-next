import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { signupAction } from "./signup.action";
import SignupForm from "./SignupForm";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import userEvent from "@testing-library/user-event";

jest.mock("./signup.action", () => ({
  signupAction: jest.fn(),
}));

describe("AuthForm", () => {
  const mockEmail = "test@example.com";
  const mockPassword = "password123";
  const mockName = "User";
  const mockSurname = "Surname";
  it("renders the form correctly", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Surname")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty fields", async () => {
    render(<SignupForm />);

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(await screen.findAllByText("Required")).toHaveLength(4);
  });

  it("calls signupAction with correct data", async () => {
    (signupAction as jest.Mock).mockResolvedValue({});

    render(<SignupForm />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText("Email"), mockEmail);
      await userEvent.type(screen.getByLabelText("Surname"), mockSurname);
      await userEvent.type(screen.getByLabelText("Name"), mockName);
      await userEvent.type(screen.getByLabelText("Password"), mockPassword);
      fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    });

    await waitFor(() =>
      expect(signupAction).toHaveBeenCalledWith({
        email: mockEmail,
        name: mockName,
        surname: mockSurname,
        password: mockPassword,
      }),
    );
  });

  it("shows an error message when signupAction returns an error", async () => {
    (signupAction as jest.Mock).mockResolvedValue({
      errorCode: ErrorCodesEnum.Conflict,
    });

    render(<SignupForm />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText("Email"), mockEmail);
      await userEvent.type(screen.getByLabelText("Surname"), mockSurname);
      await userEvent.type(screen.getByLabelText("Name"), mockName);
      await userEvent.type(screen.getByLabelText("Password"), mockPassword);
      userEvent.click(screen.getByRole("button", { name: "Sign up" }));
    });

    expect(
      await screen.findByText("User with this email already exists"),
    ).toBeInTheDocument();
  });
});
