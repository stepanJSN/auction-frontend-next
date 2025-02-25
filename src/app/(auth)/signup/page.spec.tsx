import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Signin from "./page";
import { ROUTES } from "@/config/routesConfig";
import SignupForm from "./SignupForm";

jest.mock("./SignupForm", () => jest.fn());

describe("Signin", () => {
  it("should render component correctly", () => {
    render(<Signin />);

    expect(screen.getByText("Signup")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      ROUTES.SIGN_IN,
    );
    expect(SignupForm).toHaveBeenCalled();
  });
});
